//Lancer les traitements après le chargement de la page de sorte à pouvoir
// récupérer le body (faire onload() sur body).
Tools = {
    include: function (url, callback) {

        /* on crée une balise<script type="text/javascript"></script> */
        var script = document.createElement('script');
        script.type = 'text/javascript';

        /* On fait pointer la balise sur le script qu'on veut charger
        avec en prime un timestamp pour éviter les problèmes de cache
        */

        script.src = url + '?' + (new Date().getTime());

        /* On dit d'exécuter cette fonction une fois que le script est chargé */
        if (callback) {
            script.onreadystatechange = callback;
            script.onload = script.onreadystatechange;
        }

        /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
        document.getElementsByTagName('head')[0].appendChild(script);
    },

    createStyledElement: function (tagName) {
        var element = document.createElement(tagName);
        for (var i = 1; i < arguments.length; i += 2) {
            element.style[arguments[i]] = arguments[i + 1];
        }
        return element;
    },

    assignAttributes: function (balise) {
        for (i = 1; i < arguments.length; i++) {
            balise.setAttribute(arguments[i++], arguments[i]);
        }
    },

    // renvoie la balise body du document
    getBody: function () {
        return document.getElementsByTagName("body")[0];
    },

    // ajouter une balise nomBalise � la balise baliseMere
    ajouterBalise: function (baliseMere, nomBalise) {
        baliseMere.appendChild(nomBalise);
    },

    // il est possible de passer des attributs et leur valeur en param�tres � l'infini
    // ex : ajouterBalise (document.getElementById("i0"),"P","align","center","valign","middle");
    creerBalise: function (nomBalise) {
        var newBalise = document.createElement(nomBalise);
        for (i = 1; i < arguments.length; i++)
            newBalise.setAttribute(arguments[i++], arguments[i]);
        return newBalise;
    },

    // ajoute (et renvoie) une balise textuelle � balise
    // ex : ajouterBalise (document.getElementById("i0"),"bonjour");
    ajouterTexte: function (balise, texte) {
        var text = document.createTextNode(texte);
        balise.appendChild(text);
    },

    getRandomColors: function (nbColors) {
        var colors = "#FFFFFF";
        var letters = '0123456789ABCDEF'.split('');
        for (var i = 0; i < nbColors; i) {
            color = '#';
            for (var j = 0; j < 6; j++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            if (colors.indexOf(color) === -1) {
                colors += ";" + color;
                i++;
            }
        }
        return colors.split(";");
    },

    notifyJoinRoom: function (message) {

    },

    getToday: function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    },

    alphaOnly: function (event) {
        var key = event.keyCode;
        return ((key >= 65 && key <= 90) || (key >= 96 && key <= 105) || key == 8);
    },

    page: undefined,

    users: undefined,

    msgCreator: undefined,

    user: undefined
}

Tools.include('media/script/PageManager.js', function () {
    page = new PageManager();
});
Tools.include('media/script/UserManager.js', function () {
    userMan = new UserManager();
});
Tools.include('media/script/MessageManager.js', function () {
    msgCreator = new MessageManager();
});
Tools.include('media/script/User.js', function () {});

/*
document.addEventListener("click", function (){
  var target = event.getTarget();
  if(target.id == "ValiderConnexion"){
    var inputPseudo = page.divConnection.getElementsByTagName("input")[0];
    var inputPassword = page.divConnection.getElementsByTagName("input")[1];
    if(userMan.addUser(inputPseudo.value, inputPassword.value))
      page.toggleConnection();
      setTimeout(page.toggleLoader(), 3000);
      page.toggleContent();
    }
    else{
      alert("Ce pseudo est indisponible!\nVeuillez entrer un pseudo différent.");
    }
}, false);
*/
