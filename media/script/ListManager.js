function ListManager() {
    'use strict';
    this.lists = [];
}

ListManager.prototype = {
    createList: function (list) {
        'use strict';
        var i = 0;
        while (this.getListName(list, i) === -1 && i < this.lists.length) {
            i++;
        }
        //Si il existe déjà une liste avec le même nom, on ajoute un numéro indiquant le nombre de listes avec le même nom déjà présentes
        list.notAlone = i;
        var lg = this.lists.length;
//        return this.lists.push(list) === (lg + 1);
        return list;
    },

    getListName: function (list) {
        //Chercher à partir d'un indice aux dans le tableau de List
        var aux = arguments[1] !== undefined ? arguments[1] : 0;

        for (var i = aux; this.lists.length; i++) {
            var l = this.lists[i];
            if (l.getName() === list.getName() && l.getId() !== list.getId())
                return i;
        }
        return -1;
    },

    getList: function (list) {
        'use strict';

        if (typeof list === "object") {
            //Chercher à partir d'un indice aux dans la liste des listes
            var aux = arguments[1] !== undefined ? arguments[1] : 0;

            for (var i = aux; this.lists.length; i++) {
                var l = this.lists[i];
                if (l.equals(list))
                    return i;
            }
            return -1;

        } else if (typeof list === "string") {
            for (var i = 0; this.lists.length; i++) {
                var l = this.lists[i];
                if (l.getId(id))
                    return l;
            }
            return undefined;
        }
    },

    deleteList: function (list) {
        var i = this.getList(list);
        if (i > -1) {
            return this.lists.splice(i, 1);
        }
        return undefined;
    },

    updateList: function (list) {
        var i = this.getList(list);
        if (i > -1) {
            this.lists.splice(i, 1, list);
            return list;
        }
        return undefined;
    },

    isSharedWith: function (list, user) {
        var i = this.getList(list);
        if (i > -1) {
            return this.lists[i].isSharedWith(user);
        }
        return false;
    }
};
