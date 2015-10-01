function PageManager() {
    this.body = Tools.getBody();
    //    this.divLoader = undefined;
    this.divConnection = undefined;
    this.divContent = undefined;
    this.divNotif = undefined;
}

PageManager.prototype = {

    initializeElements: function () {

        /* Partie connexion*/
        this.divConnection = this.body.getElementsByClassName("connection")[0];
        Tools.ajouterTexte(this.divConnection, "Entrez votre pseudo");

        var inputPseudo = Tools.createStyledElement("input",
            "margin-top", "15px",
            "margin-bottom", "5px",
            "font-size", "22px");
        Tools.assignAttributes(inputPseudo,
            "class", "input_pseudo",
            "type", "text",
            "placeholder", "Your pseudo",
            "pattern", "[A-Za-z0-9]{6,}",
            "onkeydown", "Tools.alphaOnly(event);",
            "required", "",
            "autofocus", "",
            'title', "Votre pseudo doit uniquement contenir les caractères suivants: [A-Za-z0-9_].");
        Tools.ajouterBalise(this.divConnection, inputPseudo);

        var inputDate = Tools.createStyledElement("input",
            "margin-top", "15px",
            "margin-bottom", "5px",
            "font-size", "22px");
        Tools.assignAttributes(inputDate,
            "id", "date",
            "type", "date",
            "placeholder", Tools.getToday(),
            "min", "2015-09-01",
            "max", Tools.getToday(),
            "title", "Une date antérieure à aujourd'hui.");
        Tools.ajouterBalise(this.divConnection, inputDate);

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

        this.divContent = this.body.getElementsByClassName("main")[0];

        Tools.ajouterBalise(Tools.getBody(), this.divConnection);

        /*Partie loader*/
        //        this.divLoader = Tools.createStyledElement("div",
        //            "width", "250px",
        //            "height", "50px",
        //            "line-height", "50px",
        //            "text-align", "center",
        //            "position", "absolute",
        //            "display", "none",
        //            "top", "50%",
        //            "left", "50%",
        //            "transform", "translate(-50%, -50%)",
        //            "text-transform", "uppercase",
        //            "font-weight", "900",
        //            "color", "#ce4233",
        //            "letter-spacing", "0.2em");
        //        Tools.assignAttributes(this.divLoader,
        //            "class", "loader");

        this.divNotif = this.body.getElementsByClassName("notifs")[0];
    },

    toggleConnection: function () {
        if (this.divConnection.style.display === "none" || this.divConnection.style.display === "") {
            this.divConnection.style.display = "flex";
            var valider = this.divConnection.getElementsByTagName("button")[0];
            var self = this;
            valider.addEventListener("click", function () {
                var inputPseudo = self.divConnection.getElementsByTagName("input")[0];
                //                var inputDate = this.divConnection.getElementById("date");
                if (inputPseudo.value.length >= 6 && inputPseudo.value.match(/\w/)) {
                    //                    this.date = inputDate.value;
                    //Tant que le client ne connait pas l'id de sa socket, on attend...
                    //                    Tools.date = this.date.split('-');
                    cobra.connect('http://cobra-framework.com:8080');
                    setTimeout(function () {
                        Tools.me = new User(inputPseudo.value, socketId);
                        Tools.users.addUser(Tools.me);
                        self.toggleConnection();
                        var titre = self.divContent.getElementsByClassName('menu__title')[0];
                        titre.textContent = "Bienvenue sur List in Shop in, " + Tools.me.getName() + "!";
                        if (self.divContent.style.display == "none" || self.divContent.style.display === "")
                            self.toggleContent();
                    }, 500);
                } else alert('Votre pseudo doit contenir au moins 6 caractères et ne peut être composé que des caractères suivants:\n A-Z-a-z0-9_.');
            }, false);
        } else {
            var valider = this.divConnection.getElementsByTagName("button")[0];
            valider.removeEventListener('click', function () {}, false);
            this.divConnection.style.display = "none";
        };
    },

    toggleContent: function () {
        if (this.divContent.style.display == "none" || this.divContent.style.display === "")
            this.divContent.style.display = "block";
        else this.divContent.style.display = "none";
    },
    //
    //    toggleLoader: function () {
    //        if (this.divLoader.style.display == "none")
    //            this.divLoader.style.display = "block";
    //        this.divLoader.style.display == "none";
    //    },

    createNotif: function (evt, user) {
        var notif = document.createElement("div");
        Tools.assignAttributes(notif, "class", "notif");
        if (evt === "join") {
            notif.classList.add = "notif__join";
            Tools.ajouterTexte(notif, user.getName() + " vient de rejoindre la salle.");
        } else if (evt === "left") {
            notif.classList.add = "notif__left";
            Tools.ajouterTexte(notif, user.getName() + " a quitté la salle.");
        } else if("shared" === evt){
            //Si il s'agit d'un message de partage alors on attend un 3ème param.: la liste.
            var l = arguments[2];
            notif.classList.add = "notif__shared";
            Tools.ajouterTexte(notif, l.getProprietor().getName() + " a partagé sa liste avec vous.");
        } else if("notshared" === evt){
            notif.classList.add = "notif__shared";
            Tools.ajouterTexte(notif, l.getProprietor().getName() + " ne souhaite plus partager cette liste avec vous.");
        }

            else return;
        Tools.ajouterBalise(this.divNotif, notif);
        notif.animationName = "fadeNotif";
        //une fois l'animation terminée, on la supprime (elle dure 15s voir Notification.scss)
        var self = this;
        setTimeout(function () {
            self.divNotif.removeChild(notif);
        }, 10000);
    },

    showList: function (list) {
        Tools.ajouterBalise(this.divContent, list.toHtml());
        var l = this.divContent.getElementById(list.getId());
        l.style.display = "flex";
    },

    removeList: function (list) {
        this.divContent.removeChild(this.divContent.getElementById(list.getId()));
    }
};
