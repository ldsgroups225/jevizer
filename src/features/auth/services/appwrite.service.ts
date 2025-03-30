import { account, AppwriteException, ID } from '@/lib/appwrite'
import { CustomAppwriteException } from '@/lib/exceptions'

const MAX_RETRIES = 2
const RETRY_DELAY = 1000 // 1 second

export class AppwriteAuthService {
  private static instance: AppwriteAuthService
  private constructor() {}

  static getInstance(): AppwriteAuthService {
    if (!AppwriteAuthService.instance) {
      AppwriteAuthService.instance = new AppwriteAuthService()
    }
    return AppwriteAuthService.instance
  }

  private async retryOperation<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
    try {
      return await operation()
    }
    catch (error) {
      if (error instanceof AppwriteException) {
        // Don't retry for validation or authentication errors
        if (error.type.startsWith('user_') || error.type.startsWith('validation_')) {
          throw new CustomAppwriteException(error)
        }

        // Retry for network or server errors
        if (retries > 0 && (
          error.type === 'general_server_error'
          || error.type === 'general_protocol_error'
          || error.code === 429 // Rate limit
        )) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
          return this.retryOperation(operation, retries - 1)
        }
      }
      throw error instanceof AppwriteException ? new CustomAppwriteException(error) : error
    }
  }

  async login(email: string, password: string) {
    return this.retryOperation(async () => {
      const session = await account.createEmailPasswordSession(email, password)
      const user = await account.get()
      return { session, user }
    })
  }

  async register(email: string, password: string, name: string) {
    return this.retryOperation(async () => {
      const user = await account.create(ID.unique(), email, password, name)
      await this.login(email, password)
      return user
    })
  }

  async logout() {
    return this.retryOperation(async () => {
      await account.deleteSession('current')
    })
  }

  async getCurrentUser() {
    return this.retryOperation(async () => {
      try {
        return await account.get()
      }
      catch (error) {
        if (error instanceof AppwriteException && error.type === 'user_unauthorized') {
          return null
        }
        throw error
      }
    })
  }

  async requestPasswordRecovery(email: string) {
    return this.retryOperation(async () => {
      await account.createRecovery(
        email,
        `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      )
    })
  }

  async verifyPasswordReset(userId: string, secret: string) {
    return this.retryOperation(async () => {
      await account.updateRecovery(userId, secret, '')
    })
  }

  async completePasswordReset(userId: string, secret: string, password: string) {
    return this.retryOperation(async () => {
      await account.updateRecovery(userId, secret, password)
    })
  }

  async updatePassword(password: string, oldPassword?: string) {
    return this.retryOperation(async () => {
      await account.updatePassword(password, oldPassword)
    })
  }

  async sendVerificationEmail() {
    return this.retryOperation(async () => {
      await account.createVerification(
        `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
      )
    })
  }

  async completeEmailVerification(userId: string, secret: string) {
    return this.retryOperation(async () => {
      await account.updateVerification(userId, secret)
    })
  }
}
