function List(title, prop) {
    this.isBeingEdited = false;
    this.name = title;
    this.proprietor = prop;
    this.products = [];
    this.description = "";
    this.sharedWith = [];
    this.notAlone = 0;
}

List.prototype = {
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

    addProducts: function (product) {
        if (this.products.indexOf(products[i])) {
            alert("Ce produit fait déjà partie de la liste.");
            return false;
        } else {
            this.products.push();
            return true;
        }
    },

    addUser: function (user) {
        var aux = this.isSharedWith(user);
        if (aux === undefined) {
            this.sharedWith.push(user);
            return true;
        }
        return false;
    },

    isSharedWith: function (user) {
        for (var i = 0; i < this.sharedWith.length; i++) {
            var u = this.sharedWith[i];
            if (u.equals(user.getSocket())) {
                return i;
            }
        }
        return -1;
    },

    removeUser(user) {
        var aux = this.sharedWith.indexOf(user);
        if (aux > -1) {
            this.sharedWith.splice(aux, 1);
            return true;
        }
        return false;
    },

    setDescription: function (desc) {
        this.description = desc;
    },

    toHtml: function () {
        'use strict';
        var l = Tools.createStyledElement("fieldset",
                                        "border-top-color", this.prop.getColor()
                                        );
        Tools.assignAttributes(l,
                                "id", Tools.listId+""+this.name,
                                "class","list");

        var legend = Tools.createStyledElement("legend",
                                         "background-color", ""+this.prop.getColor());
        var title = this.notAlone === 0 ? this.name : this.name+" ("+this.notAlone+")";
        Tools.ajouterTexte(legend, title);
        Tools.ajouterBalise(l, legend);

        var desc = Tools.createStyledElement("div");
        Tools.ajouterBalise(desc, this.description);
        Tools.ajouterTexte(desc, this.description);
        Tools.ajouterBalise(l, desc);

        var products = Tools.createStyledElement("div");
        for(var i=0;i<this.products.length;i++){
            var p = Tools.createStyledElement("span");
            Tools.ajouterTexte(p, ""+this.products[i]);
            Tools.ajouterBalise(products, p);
        }
        Tools.ajouterBalise(l, products);

        return l;
    }
}
