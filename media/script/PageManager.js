function PageManager() {
    this.body = Tools.getBody();
    this.divConnection = undefined;
    this.divContent = undefined;
    this.divNotif = undefined;
    this.divDisconnect = undefined;
    this.divMainContent = undefined;
    this.divEdit = undefined;
}

/*Cette classe gère l'ensemble des animations et autres à faire sur la page index.html (étant donné que l'on utilise qu'une page HTML).
 */
PageManager.prototype = {

    initializeElements: function () {

        /* Partie connexion*/
        this.divDisconnect = document.getElementsByClassName("disconnect")[0];

        this.divConnection = this.body.getElementsByClassName("connection")[0];
        Tools.ajouterTexte(this.divConnection, "Entrez votre pseudo");

        var inputPseudo = Tools.createStyledElement("input",
            "margin-top", "15px",
            "margin-bottom", "5px",
            "font-size", "22px");
        Tools.assignAttributes(inputPseudo,
            'id', "pseudo",
            "class", "input_pseudo",
            "type", "text",
            "placeholder", "Your pseudo",
            "pattern", "[A-Za-z0-9]{6,}",
            "onkeydown", "Tools.alphaOnly(event);",

            "required", "",
            "autofocus", "",
            'title', "Votre pseudo doit uniquement contenir les caractères suivants: [A-Za-z0-9_].");
        Tools.ajouterBalise(this.divConnection, inputPseudo);

        //        var inputPwd = Tools.createStyledElement("input",
        //            "margin-top", "15px",
        //            "margin-bottom", "5px",
        //            "font-size", "22px");
        //        Tools.assignAttributes(inputPwd,
        //            "id", "pwd",
        //            "type", "password",
        //            "title", "Votre mot de passe doit contenir 8 caractères ou plus.");
        //        Tools.ajouterBalise(this.divConnection, inputPwd);

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

        this.divMainContent = this.body.getElementsByClassName("main__content")[0];

        Tools.ajouterBalise(Tools.getBody(), this.divConnection);

        this.divNotif = this.body.getElementsByClassName("notifs")[0];

        this.divEdit = this.body.getElementsByClassName("modal")[0];
    },

    toggleConnection: function () {
        if (this.divConnection.style.display === "none" || this.divConnection.style.display === "") {
            this.divConnection.style.display = "flex";
            var valider = this.divConnection.getElementsByTagName("button")[0];
            var pseudo = this.divConnection.getElementsByTagName("input")[0];
            var self = this;

            function connexion(){
                var inputPseudo = document.getElementById("pseudo");
                //                var inputPwd = document.getElementById("pwd");
                var error = Tools.controlConnection(inputPseudo.value).error;

                if (error === "") {
                    setTimeout(function () {
                        Tools.me = new User(inputPseudo.value, socketId);
                        Tools.users.addUser(Tools.me);
                        self.toggleConnection();
                        cobra.sendMessage(Tools.msgCreator.joinMsg(), room, false);
                        if (self.divContent.style.display === "none" || self.divContent.style.display === "")
                            self.toggleContent();
                    }, 750);
                } else alert(error);
            }

            valider.addEventListener("click", connexion, false);
            pseudo.addEventListener("keypress", function (event){
                if(event.keyCode == 13)
                    connexion();
            });

        } else {
            var valider = this.divConnection.getElementsByTagName("button")[0];
            valider.removeEventListener('click', function () {}, false);
            this.divConnection.style.display = "none";
        }
    },

    toggleContent: function () {
        if (this.divContent.style.display == "none" || this.divContent.style.display === "") {
            this.divContent.style.display = "block";
            this.divNotif.style.display = "flex";
            var titre = this.divContent.getElementsByClassName('menu__title')[0];
            titre.textContent = "Bienvenue sur List in Shop in, " + Tools.me.getName() + "!";
            document.onkeydown = Tools.fkey;
            document.onkeypress = Tools.fkey;
            document.onkeyup = Tools.fkey;
//            this.toggleDisconnect();
        } else {
            this.divContent.style.display = "none";
            this.divNotif.style.display = "none";
            document.onkeydown = undefined;
            document.onkeypress = undefined;
            document.onkeyup = undefined;
//            this.toggleDisconnect();
        }
    },

    toggleDisconnect: function () {
        if (this.divDisconnect.style.display === "none" || this.divDisconnect.style.display === "")
            this.divDisconnect.style.display = "block";
        else this.divDisconnect.style.display = "none";
    },

    createNotif: function (evt, user) {
        var notif = document.createElement("div");
        Tools.assignAttributes(notif, "class", "notif");
        if (evt === "join") {
            notif.classList.add("notif__join");
            Tools.ajouterTexte(notif, user.getName() + " vient de rejoindre la salle.");
        } else if (evt === "left") {
            notif.classList.add("notif__left");
            Tools.ajouterTexte(notif, user.getName() + " a quitté la salle.");
        } else if ("shared" === evt) {
            //Si il s'agit d'un message de partage alors on attend un 3ème param.: la liste.
            var l = arguments[2];
            notif.classList.add("notif__shared");
            Tools.ajouterTexte(notif, l.getProprietor().getName() + " a partagé sa liste \"" + l.getName() + "\" avec vous.");
        } else if ("unshared" === evt) {
            var l = arguments[2];
            notif.classList.add("notif__unshared");
            Tools.ajouterTexte(notif, l.getProprietor().getName() + " ne souhaite plus partager sa liste \"" + l.getName() + "\" avec vous.");
        } else if("delete" === evt) {
            var l = arguments[2];
            notif.classList.add("notif__delete");
            Tools.ajouterTexte(notif, l.getProprietor().getName() + " a supprimé la liste \""+ l.getName() +"\".");
        } else if ("update" === evt) {
            var l = arguments[2];
            notif.classList.add("notif__update");
            Tools.ajouterTexte(notif, user.getName() + " a modifié la liste \""+ l.getName() +"\".")
        } else return;
        Tools.ajouterBalise(this.divNotif, notif);
        notif.animationName = "fadeNotif";
        //une fois l'animation terminée, on la supprime (elle dure 15s voir Notification.scss)
        var self = this;
        setTimeout(function () {
            self.divNotif.removeChild(notif);
        }, 10000);
    },

    removeUserFromSelect: function (user) {
        var select = document.getElementById("sel__users");
        var opts = select.options;
        for (var i = 0; i < opts.length; i++) {
            var opt = opts[i];
            if (opt.value === user.getSocket()) {
                opt.removeEventListener('mousedown', function () {}, false);
                select.removeChild(opt);
                return;
            }
        }
    },

    addUserToSelect: function (user) {
        var select = document.getElementById("sel__users");
        var opt = Tools.createStyledElement("option");
        Tools.assignAttributes(opt, "value", user.getSocket());
        opt.text = user.getName();
        opt.addEventListener('mousedown', function (e) {
                                this.selected = !this.selected;
                                e.preventDefault();
                            }, false);
        Tools.ajouterBalise(select, opt);
    },

    fillEdit: function () {
        var self = this;
        var input = document.getElementById("edit__title");
        input.value = "";
        input.autofocus = "true";
        var texta = document.getElementById("edit__desc");
        //pour éviter de conserver des valeurs non validées
        texta.value = "";
        //users
        var p__users = this.divEdit.getElementsByClassName("card__users")[0];

        //Pour eviter des problèmes avec les eventListener (voir le code ci-dessous), on recrée les elements select et les boutons.
        //        p__users.innerHTML = "<select id=\"sel__users\" multiple><option value=\"0\" disabled>Choisissez les utilisateurs avec lesquels vous souhaitez partager la liste.<\/option><\/select>"
        var select = document.getElementById("sel__users");
//        select.innerHTML = "<option value=\"0\" disabled>Choisissez les utilisateurs avec lesquels vous souhaitez partager la liste.<\/option>";

        var products = this.divEdit.getElementsByClassName("card__products")[0];
        //pour éviter de conserver des valeurs non validées
        products.innerHTML = "";
        var textProd = [];

        var modal_footer = this.divEdit.getElementsByClassName("modal-footer")[0];
        modal_footer.innerHTML = "<button type=\"button\" for=\"modal-one\" class=\"btn btn-primary btn-delete\"><label class=\"btn\" for=\"modal-one\">Supprimer la liste<\/label><\/button><button type=\"button\" class=\"btn btn-primary btn-validate\" for=\"modal-one\"><label class=\"btn\" for=\"modal-one\">Valider</label><\/button>";
        var btn_validate = this.divEdit.getElementsByClassName("btn-validate")[0];
        var btn_delete = this.divEdit.getElementsByClassName("btn-delete")[0];

        var l = undefined;
        //Cas modification:
        //arguments (voir Tools.editList): liste id, titre, description, produits (tableau d'éléments span)
        if (arguments.length === 1 && arguments[0] !== undefined) {
            var fieldset = arguments[0];
            var lid = fieldset.id;
            var titre = fieldset.getElementsByTagName("legend")[0];
            var tabProducts = fieldset.getElementsByTagName("span");
            var desc = fieldset.getElementsByClassName("card__description")[0];

            l = Tools.me.getList(lid);
            btn_delete.style.display = "inline";
            btn_validate.style.display = "inline";
            input.value = titre.innerText;
            texta.value = desc.innerText;
            for (var i = 0; i < tabProducts.length; i++) {
                var p = tabProducts[i];
                var p_new = Tools.createStyledElement("span", "cursor", "pointer");
                Tools.assignAttributes(p_new, "classList", "prod");
                p_new.innerText = p.innerText;
                p_new.addEventListener('click', function () {
                    var res = prompt("Voulez-vous supprimer ce produit?(o/n)");
                    if (res === "o") {
                        textProd.splice(textProd.indexOf(p_new.innerText), 1);
                        products.removeChild(this);
                    }
                }, false);
                textProd.push(p.innerText);
                Tools.ajouterBalise(products, p_new);
            }

                //On remplit le select
                var ownIt = l.getProprietor().equals(Tools.me);
                for (var i = 1; i < select.options.length; i++) {
                    var opt = select.options[i];
                    var u = Tools.users.getUser(opt.value);
                    if (!u.equals(Tools.me)) { //condition: u est différent de moi (le nom de l'utilisateur ne doit pas figuré dans la liste)
                        if (l.isSharedWith(u))
                            opt.selected = true;
                        else opt.selected = false;
                        if (!ownIt) { //si je ne suis pas le proprio alors, je ne peux pas choisir qui a le droit de partager la liste
//                            opt.addEventListener('mousedown', function () {
//                                alert('Vous devez être propriétaire de la liste pour gérer le partage.');
//                            }, false);
                            opt.disabled = true;
                        } else {

                        }
                    }
                }

                btn_validate.addEventListener('click', function () {
                    l.setDescription(texta.value);
                    if (ownIt) { //... sinon on contrôle.
                        var tu = select.options;
                        for (var i = 1; i < tu.length; i++) {
                            var u = tu[i];
                            if (u.selected) {
                                //Ou Tools.me.removeUserFromList(l.getId(), Tools.users.getUser(u.value))
                                l.addUser(Tools.users.getUser(u.value));
                            }
                            else l.removeUser(Tools.users.getUser(u.value));
                        }
                    }
                    for (var i = 0; i < textProd.length; i++) {
                        l.addProduct(textProd[i]);
                    }
                    setTimeout(function () {
                        self.updateList(l);
                        cobra.sendMessage(Tools.msgCreator.updateListMsg(l), room, false);
                    }, 1000);
                }, false);

                if(ownIt){
                    btn_delete.addEventListener('click', function () {
                        var l = Tools.me.getList(lid);
                        l = Tools.me.deleteList(l)[0];
                        setTimeout(function () {
                            self.removeList(l);
                            cobra.sendMessage(Tools.msgCreator.deleteListMsg(l), room, false);
                        }, 1000);
                    }, false);
                }
        } else if (arguments.length === 0) { //Cas création d'une new liste:
            input.disabled = false;
            btn_delete.style.display = "none";

            //On remplit le select
            for (var i = 1; i < select.options.length; i++) {
                var opt = select.options[i];
                var u = Tools.users.getUser(opt.value);
                if (!u.equals(Tools.me)) {
                    opt.selected = false;
                    opt.disabled = false;

                }
            }

            btn_validate.addEventListener('click', function () {
                var l_new = new List((input.value ? input.value : input.placeholder), Tools.me);
                l_new.setDescription(texta.value);
                //Products
                for (var i = 0; i < textProd.length; i++) {
                    l_new.addProduct(textProd[i]);
                }
                Tools.me.createList(l_new);
                //Users
                var tu = select.options;
                for (var i = 1; i < tu.length; i++) {
                    var u = tu[i];
                    u.removeEventListener('mousedown', function () {}, false);
                    if (u.selected) {
                        l_new.addUser(Tools.users.getUser(u.value));
                    }
                }
                setTimeout(function () {
                    //... on y met la nouvelle.
                    self.createList(l_new);
                    //On partage.
                    cobra.sendMessage(Tools.msgCreator.updateListMsg(l_new), room, false);
                }, 1000);
            }, false);
        }
        var add = Tools.createStyledElement("span");
        add.addEventListener('click', function () {
            var t = prompt("Entrez le nom du nouveau produit (vous pouvez en mettre plusieurs en les séparant par des virgules):");
            if (t !== null && t.indexOf(',') > -1) {
                var tab_p = t.split(",");
                for (var i = 0; i < tab_p.length; i++) {
                    var p = tab_p[i].trim();
                    if (textProd.indexOf(p) === -1 && p !== "" && p.match(/[A-Za-z ]*/g)) {
                        var sp = Tools.createStyledElement("span", "cursor", "pointer");
                        Tools.assignAttributes(sp, "classList", "prod");
                        sp.innerText = p;
                        sp.addEventListener('click', function () {
                            var res = prompt("Voulez-vous supprimer ce produit?(o/n)");
                            if (res === "o") {
                                textProd.splice(textProd.indexOf(sp.innerText), 1);
                                products.removeChild(this);
                            }
                        }, false);
                        products.insertBefore(sp, this);
                        textProd.push(sp.innerText);
                    }
                }
            } else if (t !== "" && t !== null) {
                t = t.trim();
                if (textProd.indexOf(t) === -1 && t !== "" && t.match(/[A-Za-z ]*/g)) {
                    var sp = Tools.createStyledElement("span", "cursor", "pointer");
                    Tools.assignAttributes(sp, "classList", "prod");
                    sp.innerText = t;
                    sp.addEventListener('click', function () {
                        var res = prompt("Voulez-vous supprimer ce produit?(o/n)");
                        if (res === "o") {
                            textProd.splice(textProd.indexOf(sp.innerText), 1);
                            products.removeChild(this);
                        }
                    }, false);
                    products.insertBefore(sp, this);
                    textProd.push(sp.innerText);
                }
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

    //Retourne l'élément HTML Fieldset dans le body, correspondant à l'objet Liste passé en param.
    getList: function (list) {
        return document.getElementById(list.getId());
    },

    removeList: function (list) {
        var l = this.getList(list);
        l.style.animationName = "disappear";
        var self = this;
        setTimeout(function () {
            self.divMainContent.removeChild(l);
        }, 5000);
    },

    updateList: function (list) {
        var l = this.getList(list);
        l.style.animationName = "disappear";
        setTimeout(function () {
            l.innerHTML = list.toHtml("flex").innerHTML;
            l.style.animationName = "appear";
        }, 4000);
    },

    createList: function (list) {
        var l = list.toHtml("flex");
        var fc = this.divMainContent.firstElementChild;
        this.divMainContent.insertBefore(l, fc);
        l.style.animationName = "appear";
    }
};
