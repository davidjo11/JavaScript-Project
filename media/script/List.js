function List(title, prop) {
    this.isBeingEdited = false;
    this.name = title;
    this.proprietor = prop;
    this.products = [];
    this.description = "";
    this.sharedWith = [];
    this.notAlone = 0;
    this.id = Tools.getRandomString();
}

List.prototype = {

    getId: function () {
        return this.id;
    },

    getName: function () {
        return this.name;
    },

    getProprietor: function () {
        return this.proprietor;
    },

    getSharedWith: function () {
        return this.sharedWith;
    },

    getDescription: function () {
        return this.description;
    },

    getProducts: function () {
        return this.products;
    },

    addProduct: function (product) {
        if (this.products.indexOf(product)) {
            return false;
        } else {
            this.products.push(product);
            return true;
        }
    },

    addUser: function (user) {
        if (!this.isSharedWith(user)) {
            this.sharedWith.push(user);
            return true;
        }
        return false;
    },

    getUser: function (user) {
        for (var i = 0; i < this.sharedWith.length; i++) {
            var u = this.sharedWith[i];
            if (u.equals(user)) {
                return i;
            }
        }
        return -1;
    },

    isSharedWith: function (user) {
        var i = this.getUser(user);
        if (i > -1)
            return true;
        return this.proprietor.equals(user);
    },

    removeUser: function (user) {
        if (this.isSharedWith(user)) {
            this.sharedWith.splice(aux, 1);
            return true;
        }
        return false;
    },

    setDescription: function (desc) {
        this.description = desc;
    },

    toHtml: function (display) {
        'use strict';
        //Fieldset
        var l = Tools.createStyledElement("fieldset",
            "border-top-color", this.prop.getColor(),
            "display", display
        );
        Tools.assignAttributes(l,
            "id", this.id,
            "classList", "card");
        //Legend
        var legend = Tools.createStyledElement("legend",
            "background-color", "" + this.prop.getColor());
        var title = this.notAlone === 0 ? this.name : this.name + " (" + this.notAlone + ")";
        Tools.ajouterTexte(legend, title);
        Tools.ajouterBalise(l, legend);
        //button edit
        var btn__edit = Tools.createStyledElement("button");
        Tools.assignAttributes(btn__edit, "classList", "mdl-button mdl-js-button mdl-button--fab", "name", this.id);
        btn__edit.onclick = Tools.editList(btn__edit.name);
        Tools.ajouterTexte(btn__edit, "EDIT");
        //card__edit
        var card__edit = Tools.createStyledElement("div");
        Tools.assignAttributes(card__edit, "classList", "card__edit");
        Tools.ajouterBalise(card__edit, btn__edit);
        Tools.ajouterBalise(l, card__edit);
        //card__body
        var card__body = Tools.createStyledElement("div");
        Tools.assignAttributes(card__body, "classList", "card__body");
        Tools.ajouterBalise(l, card__body);
        //Subtitle description
        var subtitleDesc = Tools.createStyledElement("div");
        Tools.assignAttributes(subtitleDesc, "classList", "card__subtitle");
        Tools.ajouterBalise(l, subtitleDesc);
        //DEscription
        var desc = Tools.createStyledElement("div");
        Tools.ajouterBalise(desc, this.description);
        Tools.ajouterTexte(desc, this.description);
        Tools.ajouterBalise(card__body, desc);
        //Liste des produits (p)
        var card__products = Tools.createStyledElement("p");
        Tools.assignAttributes(card__products, "classList", "card__products")
        Tools.ajouterBalise(l, card__products);
        //les produits (span)
        var products = Tools.createStyledElement("div");
        for (var i = 0; i < this.products.length; i++) {
            var p = Tools.createStyledElement("span");
            Tools.assignAttributes(p, "classList", "prod");
            Tools.ajouterTexte(p, "" + this.products[i]);
            Tools.ajouterBalise(card__products, p);
        }

        return l;
    },

    equals: function (list) {
        return this.id === list.getId() && this.getProprietor().equals(list.getProprietor()) && this.name === list.name;
    }
}
