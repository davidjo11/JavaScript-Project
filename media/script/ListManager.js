function ListManager() {
    'use strict';
    this.lists = [];
}

ListManager.prototype = {
    createList: function (list) {
        'use strict';
        var i = 0;
        while(this.getListName(list, i) === -1 && i < this.lists.length) {
            i++;
        }
        //Si il existe d�j� une liste avec le m�me nom, on ajoute un num�ro indiquant le nombre de listes avec le m�me nom d�j� pr�sentes
        list.notAlone = i;
        var lg = this.lists.length;
        return this.lists.push(list) === (lg + 1);
    },

    getListName: function (list){
        //Chercher � partir d'un indice aux dans la liste des listes
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
        //Chercher � partir d'un indice aux dans la liste des listes
        var aux = arguments[1] !== undefined ? arguments[1] : 0;

        for (var i = aux; this.lists.length; i++) {
            var l = this.lists[i];
            if (l.equals(list))
                return i;
        }
        return -1;
    },

    deleteList: function (list) {
        var i = this.getList(list);
        if(i > -1){
            this.lists.splice(i, 1);
            return true;
        }
        return false;
    },

    updateList: function (list) {
        var i = this.getList(list);
        if(i > -1){
            this.lists.splice(i, 1, list);
            return true;
        }
        return false;
    }
};
