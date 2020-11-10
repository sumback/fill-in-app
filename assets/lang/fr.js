export default {
  pageNotFound: 'Page non trouvée',
  menu: {
    navigation: 'Navigation',
    signIn: "S'identifier",
    signUp: "S'inscrire",
    users: 'Utilisateurs'
  },
  pages: {
    sign: {
      error: {
        password: {
          forbidden: 'Le mot de passe est incorrect',
          required: 'Le mot de passe est requis'
        },
        pseudo: {
          alpha: "Le surnom n'accepte que des caractères alphabétiques",
          conflict: 'Un utilisateur existe déjà avec ce surnom',
          notFound: "Aucun utilisateur n'a ce surnom",
          required: 'Le surnom est requis'
        },
        tryAgainLater: "Une erreur s'est produite, veuillez réessayer plus tard"
      },
      password: 'Mot de passe',
      pseudo: 'Surnom',
      sending: {
        signIn: "S'identifier",
        signUp: "S'inscrire"
      },
      title: {
        signIn: 'Bienvenue',
        signUp: 'Nouvel utilisateur'
      }
    }
  }
};
