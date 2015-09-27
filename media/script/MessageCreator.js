function MessageManager(user, titre, description, produits){
    this.doc = "La classe MessageCreator permet de créer les messages de créer ou de modifications de liste au format convenant avant de l'envoyer avec la méthode sendMessage de Cobra.\n"
        + "La partie \"content\", de ce message, contiendra un objet contenant ayant pour clés:\n"
        + "- la clé key_user: le nom de la personne qui a posté la liste, il ne contiendra que des caractères alphanumériques\n"
        + "- la clé key_title: le titre, nom de la liste (ne contiendra que des lettres)\n"
        + "- la clé description: contenant une description de la liste (contiendra tous les caractères possibles)\n"
        + "- la clé products: contenant un tableau de produits (tableau de chaines de caractères ne contenant que des lettres).\n\n"
        + "Chaque valeur associée aux différentes clés sera précédée d'un nombre permettant d'obtenir le nombre de carctères qui composent la valeur, si elle était une chaine de caractères, afin de faciliter son extraction.\n" ;
}

MessageManager.prototype = {
    createMessageJoin :

  createMessage : function (user, title, description, products){
    return {
        user
    }
  }
};
