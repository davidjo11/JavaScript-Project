function pageManager() {
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
pageManager.prototype = {

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

      conn : function () {
        var inputPseudo = document.getElementById("pseudo");
        var error = Tools.controlConnection(inputPseudo.value).error;
        var self = this;
        if (error === "") {
          setTimeout(function () {
            Tools.me = new user(inputPseudo.value, socketId);
            Tools.users.addUser(Tools.me);
            self.toggleConnection();
            cobra.sendMessage(Tools.msgCreator.joinMsg(), room, false);
            if (self.divContent.style.display === "none" || self.divContent.style.display === "")
            self.toggleContent();
          }, 750);
        } else alert(error);
      },

      toggleConnection: function () {
        var valider = null;
        if (this.divConnection.style.display === "none" || this.divConnection.style.display === "") {
          this.divConnection.style.display = "flex";
          valider = this.divConnection.getElementsByTagName("button")[0];
          var pseudo = this.divConnection.getElementsByTagName("input")[0];
          var self = this;
          valider.addEventListener("click", conn, false);
          pseudo.addEventListener("keypress", function (event){
            if(event.keyCode === 13)
            self.conn();
          });

        } else {
          valider = this.divConnection.getElementsByTagName("button")[0];
          valider.removeEventListener('click', function () {}, false);
          this.divConnection.style.display = "none";
        }
      },

      toggleContent: function () {
        if (this.divContent.style.display === "none" || this.divContent.style.display === "") {
          this.divContent.style.display = "block";
          this.divNotif.style.display = "flex";
          var titre = this.divContent.getElementsByClassName('menu__title')[0];
          titre.textContent = "Bienvenue sur List in Shop in, " + Tools.me.getName() + "!";
          document.onkeydown = Tools.fkey;
          document.onkeypress = Tools.fkey;
          document.onkeyup = Tools.fkey;
        } else {
          this.divContent.style.display = "none";
          this.divNotif.style.display = "none";
          document.onkeydown = undefined;
          document.onkeypress = undefined;
          document.onkeyup = undefined;
        }
      },

      toggleDisconnect: function () {
        if (this.divDisconnect.style.display === "none" || this.divDisconnect.style.display === "")
        this.divDisconnect.style.display = "block";
        else this.divDisconnect.style.display = "none";
      },

      createNotif: function (evt, user) {
        var notif = document.createElement("div");
        var l = null ;
        var evtType = "";
        var evtText = "";
        Tools.assignAttributes(notif, "class", "notif");

        if(arguments.length >= 3)
        l = arguments[2];

        if (evt === "join") {
          evtType = "notif__join";
          evtText = user.getName() + " vient de rejoindre la salle.";
        } else if (evt === "left") {
          evtType = "notif__left";
          evtText = user.getName() + " a quitté la salle.";
        } else if ("shared" === evt) {
          //Si il s'agit d'un message de partage alors on attend un 3ème param.: la liste.
          evtType = "notif__shared";
          evtText = l.getProprietor().getName() + " a partagé sa liste \"" + l.getName() + "\" avec vous.";
        } else if ("unshared" === evt) {
          evtType = "notif__unshared";
          evtText = l.getProprietor().getName() + " ne souhaite plus partager sa liste \"" + l.getName() + "\" avec vous.";
        } else if("delete" === evt) {
          evtType = "notif__delete";
          evtText = l.getProprietor().getName() + " a supprimé la liste \""+ l.getName() +"\".";
        } else if ("update" === evt) {
          evtType = "notif__update";
          evtText = user.getName() + " a modifié la liste \""+ l.getName() +"\".";
        } else return;

        Tools.ajouterTexte(notif, evtText);
        notif.classList.add(evtType);
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
        var removeEvt = function (element) {
          element.removeEventListener('mousedown', function () {}, false);
        };
        for (var i = 0; i < opts.length; i++) {
          var opt = opts[i];
          if (opt.value === user.getSocket()) {
            removeEvt(opt);
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

      addEvtPrompt : function (element, text, prods){
        element.addEventListener('click', function () {
          var res = prompt("Voulez-vous supprimer ce produit?(o/n)");
          if (res === "o") {
            text.splice(text.indexOf(element.innerText), 1);
            prods.removeChild(this);
          }
        }, false);
      },

      spanAddEvt: function (element, tab, products){
        element.addEventListener('click', function () {
          var res = prompt("Voulez-vous supprimer ce produit?(o/n)");
          if (res === "o") {
            tab.splice(tab.indexOf(element.innerHTML), 1);
            products.removeChild(this);
          }
        }, false);
      },

      btnAddStyle : function (element){
        element.innerText = "+";
        element.title = "Cliquer pour ajouter un produit.";
        element.style.paddingRight = "15px";
        element.style.paddingLeft = "15px";
        element.style.color = "whitesmoke";
        element.style.cursor = "pointer";
        element.style.backgroundColor = "green";
      },

      btnAddProduct : function (textProd, products){
        var add = Tools.createStyledElement("span");
        var self = this;
        add.addEventListener('click', function () {
          var t = prompt("Entrez le nom du nouveau produit (vous pouvez en mettre plusieurs en les séparant par des virgules):");
          var sp = undefined;
          if (t !== null && t !== "") {
            var tab_p = t.indexOf(',') > -1 ? t.split(",") : [t.trim()];
            for (var i = 0; i < tab_p.length; i++) {
              var p = tab_p[i].trim();
              if (textProd.indexOf(p) === -1 && p !== "" && p.match(/[A-Za-z ]*/g)) {
                sp = Tools.createStyledElement("span", "cursor", "pointer");
                Tools.assignAttributes(sp, "classList", "prod");
                sp.innerHTML = p;
                self.spanAddEvt(sp, textProd, products);
                products.insertBefore(sp, this);
                textProd.push(sp.innerHTML);
              }
            }
          }
        }, false);
        add.innerHTML = "+";
        add.title = "Cliquer pour ajouter un produit.";
        add.style.paddingRight = "15px";
        add.style.paddingLeft = "15px";
        add.style.fontSize = "18px";
        add.style.color = "whitesmoke";
        add.style.cursor = "pointer";
        add.style.backgroundColor = "green";
        return add;
      },

      animateList : function (type, list) {
        var self = this;
        setTimeout( function (){
          var send = undefined;
          switch (type) {
            case "create":
            self.createList(list);
            send = Tools.msgCreator.updateListMsg(list);
            break;
            case "update":
            self.updateList(list);
            send = Tools.msgCreator.updateListMsg(list);
            break;
            case "delete":
            self.removeList(list);
            Tools.msgCreator.deleteListMsg(list);
            break;
            default:
            return;
          }
            cobra.sendMessage(send, room, false);
        }, 1000);
      },

      fillEdit: function () {
        var self = this;
        var input = document.getElementById("edit__title"), texta = document.getElementById("edit__desc");
        input.value = "";
        input.autofocus = "true";
        //pour éviter de conserver des valeurs non validées
        texta.value = "";

        //Pour eviter des problèmes avec les eventListener (voir le code ci-dessous), on recrée les elements select et les boutons.
        var select = document.getElementById("sel__users"), products = this.divEdit.getElementsByClassName("card__products")[0];
        //pour éviter de conserver des valeurs non validées
        products.innerHTML = "";
        var textProd = [];

        var modal_footer = this.divEdit.getElementsByClassName("modal-footer")[0];
        modal_footer.innerHTML = "<button type=\"button\" for=\"modal-one\" class=\"btn btn-primary btn-delete\"><label class=\"btn\" for=\"modal-one\">Supprimer la liste<\/label><\/button><button type=\"button\" class=\"btn btn-primary btn-validate\" for=\"modal-one\"><label class=\"btn\" for=\"modal-one\">Valider</label><\/button>";
        var btn_validate = this.divEdit.getElementsByClassName("btn-validate")[0], btn_delete = this.divEdit.getElementsByClassName("btn-delete")[0];

        var l = undefined, u = undefined, i = 0, length = 0;
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
          input.value = titre.innerHTML;
          texta.value = desc.innerHTML;
          length = tabProducts.length;

          for (i = 0; i < length; i++) {
            var p = tabProducts[i];
            var p_new = Tools.createStyledElement("span", "cursor", "pointer");
            Tools.assignAttributes(p_new, "classList", "prod");
            p_new.innerHTML = p.innerHTML;
            this.addEvtPrompt(p_new, textProd, products);
            textProd.push(p.innerHTML);
            Tools.ajouterBalise(products, p_new);
          }

          //On remplit le select
          var ownIt = l.getProprietor().equals(Tools.me);
          length = select.options.length;
          for (i = 1; i < length; i++) {
            var opt = select.options[i];
            u = Tools.users.getUser(opt.value);
            if (!u.equals(Tools.me)) {
              //condition: u est différent de moi (le nom de l'utilisateur ne doit pas figuré dans la liste)
              opt.selected = l.isSharedWith(u);
              //si je ne suis pas le proprio alors, je ne peux pas choisir qui a le droit de partager la liste
              opt.disabled = ownIt === false;
            }
          }

          btn_validate.addEventListener('click', function () {
            l.setDescription(texta.value);
            var j = 0;
            var isSelectedEvt = function (op, list){
              if (op.selected)
              //Ou Tools.me.removeUserFromList(l.getId(), Tools.users.getUser(u.value))
                list.addUser(Tools.users.getUser(op.value));
              else list.removeUser(Tools.users.getUser(op.value));
            };
            if (ownIt) {
              //... sinon on contrôle.
              length = select.options.length;
              for (j = 1; j < length; j++) {
                u = select.options[j];
                isSelectedEvt(u, l);
              }
            }
            length = textProd.length;
            for (j = 0; j < length; j++)
            l.addProduct(textProd[j]);
            self.animateList("update", l);
          }, false);

          if(ownIt){
            btn_delete.addEventListener('click', function () {
              l = Tools.me.getList(lid);
              l = Tools.me.deleteList(l)[0];
              self.animateList("delete", l);
            }, false);
          }
        } else if (arguments.length === 0) {
          //Cas création d'une new liste:
          input.disabled = false;
          btn_delete.style.display = "none";

          //On remplit le select
          length = select.options.length;
          for (i = 1; i < length; i++) {
            var op = select.options[i];
            u = Tools.users.getUser(op.value);
            if (!u.equals(Tools.me)) {
              op.selected = false;
              op.disabled = false;
            }
          }

          btn_validate.addEventListener('click', function () {
            var l_new = new list((input.value ? input.value : input.placeholder), Tools.me);
            l_new.setDescription(texta.value);
            //Products
            for (i = 0; i < textProd.length; i++)
            l_new.addProduct(textProd[i]);
            Tools.me.createList(l_new);
            //Users
            var tu = select.options;
            var remvEvt = function (element){
              element.removeEventListener('mousedown', function () {}, false);
            };
            for (i = 1; i < tu.length; i++) {
              u = tu[i];
              remvEvt(u);
              if (u.selected)
              l_new.addUser(Tools.users.getUser(u.value));
            }
            self.animateList("create", l_new);
          }, false);
        }

        var add = this.btnAddProduct(textProd, products);
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
