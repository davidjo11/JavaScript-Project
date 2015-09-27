function PageManager() {
    this.body = Tools.getBody();
    this.divLoader = undefined;
    this.divConnection = undefined;
    this.divContent = undefined;
    this.divNotif = undefined;
}

PageManager.prototype = {

    initializeElements: function () {

        /* Partie connexion*/
        this.divConnection = this.body.getElementsByClassName("connection")[0];
        //            this.divConnection = Tools.createStyledElement("div",
        //                "padding", "25px",
        //                "background-color", "white",
        //                "color", "black",
        //                "text-align", 'center',
        //                "display", "none",
        //                "flex-direction", "column",
        //                "justify-content", "space-around",
        //                "align-items", "center",
        //                "position", "absolute",
        //                "left", "50%",
        //                "top", "50%",
        //                "font-size", "25px",
        //                "-webkit-box-shadow", "7px 13px 23px #000000",
        //                "box-shadow", "7px 13px 23px #000000",
        //                "-webkit-transform", "translate(-50%, -50%)",
        //                "transform", "translate(-50%, -50%)");
        //            Tools.assignAttributes(this.divConnection,
        //                "class", "connection");
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

        this.divNotif = this.body.getElementsByClassName("notif__join")[0];
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
                    Tools.user = inputPseudo.value;
                    //                    Tools.date = this.date.split('-');
                    cobra.connect('http://cobra-framework.com:8080');
                    setTimeout(function () {
                        self.toggleConnection();
                        var titre = self.divContent.getElementsByClassName('menu__title')[0];
                        titre.textContent = "Bienvenue sur List in Shop in, " + inputPseudo.value + "!";
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

    toggleLoader: function () {
        if (this.divLoader.style.display == "none")
            this.divLoader.style.display = "block";
        this.divLoader.style.display == "none";
    },

    createNotif: function (userName) {
        var notif = document.createElement(div);
        notif.createTextNode(userName + " a rejoint la salle.");
        Tools.ajouterBalise(this.divNotif, notif);
        notif.animationName = "fadeNotif";
        //une fois l'animation terminée, on la supprime (elle dure 15s voir joinRoomNotif.scss)
        var self = this;
        setTimeout(function () {
            self.divNotif.removeChild(notif);
        }, 20000);
    }
};
