function PageBundle(){
  this.body = Tools.getBody();
  this.divLoader = undefined;
  this.divConnection = undefined;
  this.divContent = undefined;
}

PageBundle.prototype = {

  initializeElements : function (){

    /* Partie connexion*/
    this.divConnection = Tools.createStyledElement("div",
      "padding", "25px",
      "background-color", "white",
      "color", "black",
      "text-align", 'center',
      "display", "none",
      "flex-direction", "column",
      "justify-content", "space-around",
      "align-items", "center",
      "position", "absolute",
      "left", "50%",
      "top", "50%",
      "font-size", "25px",
      "-webkit-box-shadow", "7px 13px 23px #000000",
      "box-shadow", "7px 13px 23px #000000",
      "-webkit-transform", "translate(-50%, -50%)",
      "transform", "translate(-50%, -50%)");
      // "-webkit-animation", "3s forwards");
      // "animation", "3s forwards",
      // "-webkit-animation-iteration-count", "1",
      // "animation-iteration-count", "1");
    Tools.assignAttributes(this.divConnection,
      "class", "connection");
    Tools.ajouterTexte(this.divConnection, "Entrez votre pseudo:");

    var inputPseudo = Tools.createStyledElement("input",
      "margin-top", "15px",
      "margin-bottom", "5px",
      "font-size", "22px");
    Tools.assignAttributes(inputPseudo,
      "type", "text",
      "placeholder", "Your pseudo",
      "required", "",
      "autofocus", "",
      'title', "Your pseudo");
    Tools.ajouterBalise(this.divConnection, inputPseudo);

  var inputPassword = Tools.createStyledElement("input",
    "margin-top", "15px",
    "margin-bottom", "5px",
    "font-size", "22px");
  Tools.assignAttributes(inputPassword,
    "type", "password",
    "title", "Your password");

    var button = Tools.createStyledElement("button",
      "color", "white",
      "margin", "10px",
      "padding", "10px 25px",
      "border", "0px",
      "background-color", "green",
      "font-size", "16px",
      "box-shadow", "2px 5px 10px gray",
      "-webkit-box-shadow", "2px 5px 10px gray",
      "-moz-box-shadow", "2px 5px 10px gray",
      "-moz-border-radius", "22px 5px 22px 5px",
      "-webkit-border-radius", "22px 5px 22px 5px",
      "border-radius", "22px");
    Tools.assignAttributes(button,
      "id", "ValiderConnexion",
      "type", "button");
    Tools.ajouterTexte(button, "Valider");
    Tools.ajouterBalise(this.divConnection, button);

    this.divContent = this.body.getElementsByClassName("content")[0];

    Tools.ajouterBalise(Tools.getBody(), this.divConnection);

    /*Partie loader*/
    this.divLoader = Tools.createStyledElement("div",
      "width", "250px",
      "height", "50px",
      "line-height", "50px",
      "text-align", "center",
      "position", "absolute",
      "display", "none",
      "top", "50%",
      "left", "50%",
      "transform", "translate(-50%, -50%)",
      "text-transform", "uppercase",
      "font-weight", "900",
      "color", "#ce4233",
      "letter-spacing", "0.2em");
    Tools.assignAttributes(this.divLoader,
      "class", "loader");
  },

  toggleConnection : function (){
    if(this.divConnection.style == "none")
      this.divConnection.style.display = "flex";
    else this.divConnection.style.display = "none";
  },

  toggleContent : function (){
    if(this.divContent.style.display == "none")
      this.divContent.style.display = "block";
    else this.divContent.style.display = "none";
  },

  toggleLoader : function(){
    if(this.divLoader.style.display == "none")
      this.divLoader.style.display = "block";
    this.divLoader.style.display == "none";
  }
};
