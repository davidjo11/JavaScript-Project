function Message(user, titre, description, produits){
  this.user = user;
  this.content = {
  titre : titre,
  description : description,
  produits : produits
  };
}

Message.prototype = {
  setMessage : function (user, titre, description, produits){
    this.user = user;
    this.content.titre = titre;
    this.content.description = description;
    this.content.produits = produits;
  }
};
