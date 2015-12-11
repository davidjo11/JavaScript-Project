function ListManager() {
    this.lists = [];
}

ListManager.prototype = {
    /*Ajoute la nouvelle liste list en détectant les listes ayant le même nom.
     *Ex: S'il y a déjà une liste qui porte le même nom alors celle-ci apparaitra avec "(2)" à côté de son nom, "(3)" s'il y en a 2 etc...
     */
    createList: function (list) {
        var i = this.getListName(list, 0),
            j = 0,
            length = this.lists.length;
        while (i !== -1 && i < length) {
            i++;
            i = this.getListName(list, i);
            j++;
        }
        //Si il existe déjà une liste avec le même nom, on ajoute un numéro indiquant le nombre de listes avec le même nom déjà présentes
        list.notAlone = j;
        this.lists.push(list);
        return true;
    },

    /*PErmet de rechercher une liste pourtant le même nom.
     *Il est possible de rechercher cette liste à partir d'un indice à passer en 2ème param. .
     */
    getListName: function (list) {
        //Chercher à partir d'un indice aux dans le tableau de List
        var aux = arguments[1] !== undefined ? arguments[1] : 0;
        var length = this.lists.length;
        for (var i = aux; i < length; i++) {
            var l = this.lists[i];
            if (l.getName() === list.getName() && l.getId() !== list.getId())
                return i;
        }
        return -1;
    },

    /*Retourne la position de la liste list dans le tableau this.lists.
     *Le param. peut être un objet List ou un identifiant.
     *@return la position de la liste, -1 si la liste n'est pas répertoriée.
     */
    getListPosition: function (list) {
        var i = 0;
        var l = undefined;
        var length = this.lists.length;
        var aux = arguments[1] !== undefined ? arguments[1] : 0;
        for (i = aux; i < length; i++) {
            l = this.lists[i];
            if ((typeof list === "object" && l.equals(list)) || (typeof list === "string" && l.getId() === list))
                return i;
        }
        return -1;
    },

    /*Retourne l'objet List dans le tableau de liste.
     *@param list: un objet List ou un identifiant.
     */
    getList: function (list) {
        var i = 0;
        var l = undefined;
        var length = this.lists.length;
        for (i = 0; i < length; i++) {
            l = this.lists[i];
            if ((typeof list === "object" && l.equals(list)) || (typeof list === "string" && l.getId() === list))
                return l;
        }
        return undefined;
    },

    /*Supprime la liste passée en param. (objet ou identifiant).
     *@param list: un objet List ou un identifiant.
     *@return la liste supprimée ou undefined si la liste n'est répertoriée.
     */
    deleteList: function (list) {
        var i = this.getListPosition(list);
        if (i > -1) {
            return this.lists.splice(i, 1);
        }
        return undefined;
    },

    /*Remplace la liste ayant le même identifiant dans this.lists par celle passée en param. .
     *@param list: un objet List ou un identifiant.
     *@return la nouvelle liste, undefined si la liste n'est pas répertoriée.
     */
    updateList: function (list) {
        var i = this.getListPosition(list);
        if (i > -1) {
            this.lists.splice(i, 1, list);
            return list;
        }
        return undefined;
    },

    /*Retourne true si la liste list est partagée avec l'utilisateur user.
     *
     */
    isSharedWith: function (list, user) {
        var i = this.getListPosition(list);
        if (i > -1) {
            return this.lists[i].isSharedWith(user);
        }
        return false;
    }
};
