function List(title, prop) {
    //inutile pour l'instant
    this.isBeingEdited = false;
    this.name = title;
    this.proprietor = prop;
    this.products = [];
    this.description = "";
    //La liste de partage
    this.sharedWith = [];
    //Au cas où l'utilisateur possèderait une liste avec le même nom, on met un compteur pour les différencier.
    //Si tu le supprime, supprime-le aussi dans MessageManager et PageManager.
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

    /*Permet d'ajouter le produit product à la liste de produits.
    *@param product: le produit à ajouter
    *@return true si le produit a été ajouté, false sinon.
    */
    addProduct: function (product) {
        if (this.products.indexOf(product) > -1) {
            return false;
        } else {
            this.products.push(product);
            return true;
        }
    },

    /*Permet d'ajouter l'utilisateur user à la liste de partage (sharedWith)
    *@return true si user a été ajouté, false sinon.
    */
    addUser: function (user) {
        if (!this.isSharedWith(user)) {
            this.sharedWith.push(user);
            return true;
        }
        return false;
    },

    /*Retourne l'indice de l'utilisateur user si celui-ci est présent dans la liste de partage (sharedWith).
    *@param user: l'utilisateur
    *@return la position de user dans la liste de partage, -1 si il n'en fait pas partie.
    */
    getUser: function (user) {
        for (var i = 0; i < this.sharedWith.length; i++) {
            var u = this.sharedWith[i];
            if (u.equals(user)) {
                return i;
            }
        }
        return -1;
    },

    /*Permet de savoir si user fait partie de la liste de partage (sharedWith).
    *@param user : l'utilisateur dont on veut contrôler l'accès à la liste
    *@return true si user est proprietaire ou membre de la liste sharedWit, false sinon.
    */
    isSharedWith: function (user) {
        var i = this.getUser(user);
        if (i > -1)
            return true;
        return this.proprietor.equals(user);
    },

    /*Permet de supprimer l'utilisateur de la liste de partage (sharedWith).
    *@param user : l'objet User à retirer
    *@return true si user à été retiré, false sinon
    */
    removeUser: function (user) {
        if (this.isSharedWith(user)) {
            var aux = this.getUser(user);
            this.sharedWith.splice(aux, 1);
            return true;
        }
        return false;
    },

    setDescription: function (desc) {
        this.description = desc;
    },

    /*Retourne un élément HTML permettant de l'afficher la liste dans la page.
    *@param list - l'objet liste à transformer
    */
    toHtml: function (display) {
        //Fieldset
        var l = Tools.createStyledElement("fieldset",
            "border-top-color", this.proprietor.getColor(),
            "display", display
        );

        var legend = this.notAlone === 0 ? this.name : this.name + " (" + this.notAlone + ")";

        Tools.assignAttributes(l,
            "id", this.id,
            "classList", "card",
            "title", legend);

        var spans = "";
        for (var i = 0; i < this.products.length; i++) {
            spans += "" + "<span class=\"prod\">" + this.products[i] + "<\/span>";
        }

        l.innerHTML = "<legend title=\"" + legend + "\" style=\"background-color: " + this.proprietor.getColor() + ";\">" + legend + "<\/legend>" + "<div class=\"card__edit\">" + "<label class=\"btn\" for=\"modal-one\" onclick=\"Tools.editList('" + this.id.trim() + "');\">EDIT<\/label>" + "<\/div>" + "<div class=\"card__body\">" + "<div class=\"card__subtitle\">Description<\/div>" + "<p class=\"card__description\">" + this.description + "<\/p>" + "<div class=\"card__subtitle\">Produits<\/div>" + "<p class=\"card__products\">" + spans + "<\/p>" + "<\/div>"
        
        return l;
    },

    /**Compare 2 listes en comparant leurs IDs, leurs proprietaire et leurs nom.
    *
    */
    equals: function (list) {
        return this.id === list.getId() && this.getProprietor().equals(list.getProprietor()) && this.name === list.name;
    },

    forJSON: function(){
        var res = {};

        res.id = this.id;
        res.name = this.name;
        res.description = this.description;
        res.products = this.products;
        res.proprietor = this.proprietor.forJSON();
        res.sharedWith = [];
        for(var i=0;i<this.sharedWith.length;i++)
            res.sharedWith.push(this.sharedWith[i].forJSON());
        res.notAlone = this.notAlone;

        return res;
    }
}
