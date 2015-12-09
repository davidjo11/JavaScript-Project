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
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] === "classList") {
                i++;
                var cl = arguments[i].split(" ");
                for (var j = 0; j < cl.length; j++)
                    balise.classList.add(cl[j]);
            } else balise.setAttribute(arguments[i++], arguments[i]);
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
    creerBalise: function (nomBalise) {
        var newBalise = document.createElement(nomBalise);
        for (var i = 1; i < arguments.length; i++)
            newBalise.setAttribute(arguments[i++], arguments[i]);
        return newBalise;
    },

    // ajoute (et renvoie) une balise textuelle � balise
    ajouterTexte: function (balise, texte) {
        var text = document.createTextNode(texte);
        balise.appendChild(text);
    },

    getRandomColors: function (nbColors) {
        var colors = "", color = "";
        var letters = '0123456789ABCDEF'.split('');
        for (var i = 0; i < nbColors; i) {
            color = '#';
            for (var j = 0; j < 6; j++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            if (colors.indexOf(color) === -1 && this.usedColors.indexOf(color)) {
                colors += ";" + color;
                i++;
            }
        }
        return colors.split(";");
    },

    getRandomString: function (l) {
        var letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var s = "";
        var aux = typeof l === "number"  && l > 20 ? l : 20;
        for (var i = 0; i < aux; i++) {
            s += letters[Math.floor(Math.random() * letters.length)];
        }
        return s;
    },

    notify: function (evt, user) {
        Tools.page.createNotif(evt, user, arguments[2]);
    },

    getToday: function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; 
        //January is 0!
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
        var az = (key >= 65 && key <= 90);
        var AZ = (key >= 96 && key <= 105);
        return ( az || AZ || key === 8);
    },

    fkey: function (e) {
        e = e || window.event;

        if (e.keyCode === 116 && e.charCode === 0) {
            var response = prompt("Vous avez pressez la touche f5.\nVous risquez de vous déconnecter, voulez-vous continuer?(o/n)");
            if ((response !== "o" && response !== "O")){
                e.preventDefault();
            }
            else {
                cobra.sendMessage(Tools.msgCreator.leftMsg(), room, false);
            }
        }
    },

    crypted: function (s, size) {
        var letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_-,;^!$£*µ§~#[|`\]()='.split("");
        var scrypted = "";
        var i = 0, j = 0;
        for (i = 0; i < s.length; i++) {
            for (j = 0; j < size; j++) {
                scrypted += letters[Math.floor(Math.random() * letters.length)];

            }
            scrypted += s.charAt(i);
        }
        for (j = 0; j < size; j++) {
            scrypted += letters[Math.floor(Math.random() * letters.length)];
        }
        return scrypted;
    },

    uncrytped: function (s, size) {
        var res = "";
        for (var i = size - 1; i < s.length; i++) {
            res += s.charAt(size);
            i += size;
        }
        return res;
    },

    editList: function (id) {
        if (id !== undefined && id !== "") {
            var fieldset = document.getElementById(id);
            Tools.page.fillEdit(fieldset);
        } else Tools.page.fillEdit();
    },

    /*Compare la date (yyyy-mm-dd) passée en param. à la date d'origine Tools.originTime
    *@return 0 si égalité, 1 si supérieure, -1 si inférieure
    */
    isDateSupToOriginDate: function (stringDate){
        var date = stringDate.split('-');
        var ot = Tools.originTime.split('-');
        var res = [];
        res[0] = (parseInt(date[0]) < parseInt(ot[0]));
        res[1] = (parseInt(date[1]) < parseInt(ot[1]));
        res[2] = (parseInt(date[2]) < parseInt(ot[2]));
        return (!res[0] || !res[1] || !res[2]) === false;
    },

    connect: function (){
        cobra.connect('http://cobra-framework.com:8080');
    },

    controlConnection: function (username){
        var res = { error : ""};
        if(username.length < 6 || username.match(/[A-Za-z0-9_]*/)[0] !== username){
            res.error += "Votre pseudo doit contenir 6 caractères ou plus de cet ensemble: [A-Za-z0-9_].\n";
        }
        else if (!Tools.users.isAvailable(username)){
            res.error += "Le pseudo que vous avez choisi est indisponible.\n";
        }
        else if(arguments[1] !== undefined && password.length < 8){
            res.error += "Votre mot de passe doit contenir au moins 8 caractères.";
        }
        return res;
    },

    originTime: "2015-10-07",

    listEvents: [],

    test: "test",

    listId: "list_",

    page: undefined,

    users: undefined,

    msgCreator: undefined,

    me: undefined,

    usedColors: "#0000FF,#A9A9A9,#000000,#F5F5F5,#FFFFFF"
};

var wasPressed = false;

Tools.include('media/script/List.js', function () {});
Tools.include("media/script/ListManager.js", function () {});
Tools.include('media/script/User.js', function () {});
Tools.include('media/script/PageManager.js', function () {
    Tools.page = new pageManager();
});
Tools.include('media/script/UserManager.js', function () {
    Tools.users = new UserManager();
    Tools.users.initialize(100);
});
Tools.include('media/script/MessageManager.js', function () {
    Tools.msgCreator = new MessageManager();
});
