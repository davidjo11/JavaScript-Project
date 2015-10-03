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
            if (arguments[i] === "classList") {
                var cl = arguments[i++].split(" ");
                for (var j = 0; j < cl.length; j++)
                    element.classList.add = cl[j];
            } else element.style[arguments[i]] = arguments[i + 1];
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
        var colors = "";
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

    getRandomString: function () {
        var letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        var s = "";
        for (var i = 0; i < 20; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
        return s;
    },

    notify: function (socketId, evt) {
        //var username = users.getUser(message);
        //if(users.exists(socketId))
        //  page.createNotif(username, "l");
        //else page.createNotif(username, "j");
        page.createNotif(socketId, evt);
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

    crypted: function (s, size) {
        var letters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_-,;^!$£*µ§~#[|`\]()='.split("");
        var scrypted = "";
        for (var i = 0; i < s.length; i++) {
            for (var j = 0; j < size; j++) {
                scrypted += letters[Math.floor(Math.random() * letters.length)];

            }
            scryted += s.charAt(i);
        }
        for (var j = 0; j < size; j++) {
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
        }
        else Tools.page.fillEdit();
    },

    test: "test",

    listId: "list_",

    page: undefined,

    users: undefined,

    msgCreator: undefined,

    me: undefined,

    usedColors: "#0000FF,#A9A9A9,#000000,#F5F5F5,#FFFFFF"
}

Tools.include('media/script/List.js', function () {});
Tools.include("media/script/ListManager.js", function () {
    //    Tools.lm = new ListManager();
    //        console.log("ListManager chargé: " + Tools.lm);
});
Tools.include('media/script/User.js', function () {});
Tools.include('media/script/PageManager.js', function () {
    Tools.page = new PageManager();
    //        console.log("PageManager chargé: " + Tools.page);
});
Tools.include('media/script/UserManager.js', function () {
    Tools.users = new UserManager();
    Tools.users.initialize(100);
    //        console.log('UsersManager chargé: ' + Tools.users);
});
Tools.include('media/script/MessageManager.js', function () {
    Tools.msgCreator = new MessageManager();
    //        console.log('MessageManager chargé: ' + Tools.msgCreator)
});
