function PageManager() {
    this.body = Tools.getBody();
    this.divConnection = undefined;
    this.divContent = undefined;
    this.divNotif = undefined;
    this.divEdit = undefined;
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

        this.divNotif = this.body.getElementsByClassName("notifs")[0];

        this.divEdit = this.body.getElementsByClassName("modal")[0];
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

    createNotif: function (evt, user) {
        var notif = document.createElement("div");
        Tools.assignAttributes(notif, "class", "notif");
        if (evt === "join") {
            notif.classList.add = "notif__join";
            Tools.ajouterTexte(notif, user.getName() + " vient de rejoindre la salle.");
        } else if (evt === "left") {
            notif.classList.add = "notif__left";
            Tools.ajouterTexte(notif, user.getName() + " a quitté la salle.");
        } else if ("shared" === evt) {
            //Si il s'agit d'un message de partage alors on attend un 3ème param.: la liste.
            var l = arguments[2];
            notif.classList.add = "notif__shared";
            Tools.ajouterTexte(notif, l.getProprietor().getName() + " a partagé sa liste avec vous.");
        } else if ("unshared" === evt) {
            var l = this.getList(arguments[2]);
            this.removeList(l);
            notif.classList.add = "notif__unshared";
            Tools.ajouterTexte(notif, l.getProprietor().getName() + " ne souhaite plus partager cette liste avec vous.");
        } else if ("update" == evt) {
            var l = arguments[2].toHtml("none");
            this.divContent.getElementsByClassName("main__content")[0].insertBefore(l, this.getList(list));
            this.removeList(l);
            this.l.style.animationName = "appear"
            notif.classList.add = "notif__update";
        } else return;
        Tools.ajouterBalise(this.divNotif, notif);
        notif.animationName = "fadeNotif";
        //une fois l'animation terminée, on la supprime (elle dure 15s voir Notification.scss)
        var self = this;
        setTimeout(function () {
            self.divNotif.removeChild(notif);
        }, 10000);
    },

    fillEdit: function (fieldset) {
        var lid = fieldset.id;
        var titre = fieldset.getElementsByTagName("legend")[0];
        var desc = fieldset.getElementsByClassName("card__description")[0];
        var spansProducts = fieldset.getElementsByTagName("span");

        var input = document.getElementById("edit__title");
        var texta = document.getElementById("edit__desc");
        //pour éviter de conserver des valeurs non validées
        texta.innerText = "";
        //users
        var select = document.getElementById("sel__users");
        select.innerHTML = "";
        var products = this.divEdit.getElementsByClassName("card__products")[0];
        //pour éviter de conserver des valeurs non validées
        products.innerHTML = "";
        var textProd = [];

        var btn_validate = this.divContent.getElementsByClassName("btn-validate")[0];
        var btn_delete = this.divContent.getElementsByClassName("btn-delete")[0];

        var l = undefined;
        //Cas modification:
        //arguments (voir Tools.editList): liste id, titre, description, produits (tableau d'éléments span)
        if (arguments.length === 1 && arguments[0] !== undefined) {
            l = Tools.me.getList(lid);
            btn_delete.style.display = "block";
            input.placeholder = titre.innerText;
            texta.value = desc.innerText;
            for (var i = 0; i < tabProducts.length; i++) {
                var p = tabProducts[i];
                var p_new = Tools.createStyledElement("span", "cursor", "pointer");
                p_new.classList.add = "prod";
                p_new.innerText = p.innerText;
                p_new.addEventListener('click', function () {
                    var res = prompt("Voulez-vous supprimer ce produit?(o/n)", "");
                    if (res === "o") {
                        textProd.splice(textProd.indexOf(p_new.innerText), 1);
                        products.removeChild(this);
                    }
                }, false);
                textProd.push(p.innerText);
                Tools.ajouterBalise(products, p_new);

                //On remplit le select
                for (var i = 0; i < Tools.users.length; i++) {
                    var u = Tools.users[i];
                    if (u.getSocket() !== Tools.me.getSocket()) {
                        var opt = Tools.createStyledElement("option");
                        Tools.assignAttributes(opt, "value", u.getSocket());
                        //opt.innerText = u.getName()
                        Tools.ajouterTexte(opt, u.getName());
                        if (l.isSharedWith(u))
                            opt.selected = "true";
                        else opt.selected = "false";
                    }
                }

                btn_validate.addEventListener('click', function () {
                    var l_new = new List(titre, l.getProprietor());
                    l_new.id = l.getId();
                    l_new.setDescription(texta.value);
                    var tu = select.getElementsByTagName("option");
                    for (var i = 0; i < tu.length; i++) {
                        var u = tu[i];
                        if (u.selected) {
                            l_new.addUser(Tools.users.getUser(u.value));
                        }
                    }
                    l_new.notAlone = l.notAlone;
                    for (var i = 0; i < textProd.length; i++) {
                        l_new.addProduct(textProd[i]);
                    }
                    this.removeList(l);
                    this.createList(l_new);
                    Tools.me.updateList(l_new);
                    setTimeout(function () {
                        cobra.sendMessage(Tools.msgCreator.updateListMsg(l_new), room, false);
                    }, 2000);
                }, false);

                btn_delete.addEventListener('click', function () {
                    var l = Tools.me.getList(lid);
                    this.removeList(l);
                    l = Tools.me.deleteList(l);
                    setTimeout(function () {
                        cobra.sendMessage(Tools.msgCreator.deleteListMsg(l), room, false);
                    }, 2000);
                }, false);
            }
        } else if (arguments.length === 0) {
            //Cas new List
            input.disabled = false;

            //On remplit le select
                for (var i = 0; i < Tools.users.length; i++) {
                    var u = Tools.users[i];
                    if (u.getSocket() !== Tools.me.getSocket()) {
                        var opt = Tools.createStyledElement("option");
                        Tools.assignAttributes(opt, "value", u.getSocket());
                        //opt.innerText = u.getName()
                        Tools.ajouterTexte(opt, u.getName());
                        opt.selected = "false";
                    }
                }

            btn_delete.style.display = "none";
            btn_validate.addEventListener('click', function () {
                var l = Tools.me.getList(lid);
                var l_new = new List(titre, Tools.me);
                l_new.id = l.getId();
                l_new.setDescription(texta.value);
                l_new.sharedWith = l.getSharedWith();
                l_new.notAlone = l.notAlone;
                //Products
                for (var i = 0; i < textProd.length; i++) {
                    l_new.addProduct(textProd[i]);
                }
                //Users
                var tu = select.getElementsByTagName("option");
                    for (var i = 0; i < tu.length; i++) {
                        var u = tu[i];
                        if (u.selected) {
                            l_new.addUser(Tools.users.getUser(u.value));
                        }
                    }
                this.removeList(l);
                this.createList(l_new);
                Tools.me.updateList(l_new);
                cobra.sendMessage(Tools.msgCreator.updateListMsg(l_new), room, false);
            }, false);
        }
        var add = Tools.createStyledElement("span");
        add.addEventListener('click', function () {
            var t = prompt("Entrez le nom du nouveau produit", "");
            if (t !== "" && textProd.indexOf(t) === -1) {
                var sp = Tools.createStyledElement("span", "cursor", "pointer");
                sp.innerText = t;
                sp.addEventListener('click', function () {
                    var res = prompt("Voulez-vous supprimer ce produit?(o/n)", "");
                    if (res === "o") {
                        textProd.splice(textProd.indexOf(sp.innerText), 1);
                        products.removeChild(this);
                    }
                }, false);
                products.insertBefore(sp, this);
                textProd.push(sp.innerText);
            }
        }, false);
        add.innerText = "+";
        add.title = "Cliquer pour ajouter un produit.";
        add.style.paddingRight = "15px";
        add.style.paddingLeft = "15px";
        add.style.color = "whitesmoke";
        add.style.cursor = "pointer";
        add.style.backgroundColor = "green";
        Tools.ajouterBalise(products, add);
    },

    getList: function (list) {
        return document.getElementById(list.getId());
    },

    removeList: function (list) {
        this.getList(list).style.animationName = "disappear";
        setTimeout(function () {
            var main = this.divContent.getElementsByClassName("main__content")[0];
            main.removeChild(document.getElementById(list.getId()));
        }, 5000);
    },

    createList: function (list) {
        var l = list.toHtml("flex");
        var main = this.divContent.getElementsByClassName("main__content")[0];
        var fc = main.firstElementChild;
        main.insertBefore(l, fc);
    }
};
