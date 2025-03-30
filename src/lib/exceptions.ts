import type { AppwriteException } from 'appwrite'

export class CustomAppwriteException extends Error {
  public code: number
  public type: string
  public originalError: AppwriteException

  constructor(error: AppwriteException) {
    super()
    this.name = 'CustomAppwriteException'
    this.message = getFrenchMessage(error.type)
    this.code = error.code
    this.type = error.type
    this.originalError = error
  }
}

function getFrenchMessage(type: string): string {
  switch (type) {
    // Authentication errors
    case 'user_invalid_credentials':
      return 'Email ou mot de passe incorrect'
    case 'user_already_exists':
      return 'L\'utilisateur existe déjà'
    case 'user_email_already_exists':
      return 'Un compte avec cet email existe déjà'
    case 'user_not_found':
      return 'Utilisateur non trouvé'
    case 'user_blocked':
      return 'Votre compte a été temporairement suspendu'
    case 'user_password_reset_required':
      return 'Réinitialisation du mot de passe requise'
    case 'user_password_mismatch':
      return 'Le mot de passe est incorrect'
    case 'user_status_disabled':
      return 'Ce compte est désactivé'
    case 'user_session_expired':
      return 'Votre session a expiré, veuillez vous reconnecter'
    case 'user_unauthorized':
      return 'Accès non autorisé'

    // Rate limiting and general errors
    case 'general_rate_limit_exceeded':
      return 'Trop de tentatives, veuillez réessayer dans quelques minutes'
    case 'general_argument_invalid':
      return 'Informations invalides, veuillez vérifier vos données'
    case 'general_unknown':
      return 'Une erreur inattendue est survenue'
    case 'general_server_error':
      return 'Le service est temporairement indisponible, veuillez réessayer plus tard'
    case 'general_protocol_error':
      return 'Problème de connexion, veuillez vérifier votre connexion internet'

    // Validation errors
    case 'validation_required':
      return 'Veuillez remplir tous les champs obligatoires'
    case 'validation_email_invalid':
      return 'L\'adresse email n\'est pas valide'
    case 'validation_password_weak':
      return 'Le mot de passe est trop faible. Il doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial'

    default:
      return 'Une erreur est survenue'
  }
}
