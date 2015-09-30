function List(title, prop) {
    this.name = title;
    this.proprietor = prop;
    this.products = [];
    this.description = "";
    this.sharedWith = [];
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
        var aux = this.sharedWith.indexOf((user);
        if (aux === -1) {
            this.sharedWith.push(user);
            return true;
        }
        return false;
    },

    indexOf: function (user) {
        for (var i = 0; i < this.sharedWith.length; i++) {
            var u = this.sharedWith.[i];
            if (u.equals(user)) {
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
    }


}
