function Message(user, titre, description, produits){
    this.doc = "La classe MessageCreator permet de créer les messages de créer ou de modifications de liste au format convenant."
        + "" ;
}

Message.prototype = {
  createMessage : function (user, title, description, products){
    return {
        user : user,
        titre : title,
        description: description,
        products : products
    }
  }
};
