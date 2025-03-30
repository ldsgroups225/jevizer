import { Account, AppwriteException, Client, ID } from 'appwrite'

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')

const account = new Account(client)

export { account, AppwriteException, ID }
