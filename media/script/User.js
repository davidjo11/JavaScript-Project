function User(username, socket, password) {
    this.socketId = socket;
    this.name = username;
    this.password = Tools.crypted(password,this.username.length);
    this.color = undefined;
    this.lm = new ListManager();
    this.id = Tools.getRandomString(25);
}

User.prototype = {
    getName: function () {
        return this.name;
    },

    getPassword: function () {
        return this.password;
    },

    getSocket: function () {
        return this.socketId;
    },

    setColor: function (color) {
        this.color = color;
    },

    getColor: function () {
        return this.color;
    },

    /**Compare deux User en comparant les sockets.
    *
    */
    equals: function (user) {
        return this.getSocket() === user.getSocket();
    },

    /*Utilise la fonction de la classe ListManager.
    */
    getList: function (list) {
        return this.lm.getList(list);
    },

    /*Utilise la fonction updateList de ListManager.
    */
    updateList: function (list) {
        return this.lm.updateList(list);
    },

    /*Utilise la fonction createList de ListManager.
    */
    createList: function (list) {
        return this.lm.createList(list);
    },

    /*Utilise la fonction deleteList de ListManager.
    */
    deleteList: function (list) {
        return this.lm.deleteList(list);
    },

    /*Permet à l'utilisateur de partager sa liste d'identifiant id avec l'utilisateur user.
    *@param id : identifiant de la liste à partager
    *@param user: l'utilisateur avec lequel il souhaite partager la liste
    *@return true si user a bien été ajouté, false sinon.
    */
    shareWith: function (id, user) {
        var l = this.lm.getList(id);
        if (l.getProprietor().equals(this))
            return l.addUser(user);
        return false;
    },

    /*Retire l'utilisateur user de la liste de partage de la liste list.
    *@param list: la liste à ne plus partager
    *@param user: l'utilisateur à supprimer de la liste de partage de la liste list
    *@return true si ça a fonctionné false sinon
    */
    removeUserFromList: function (list, user) {
        if (this.getList(list) !== undefined && list.getProprietor().equals(this) && list.isSharedWith(user)) {
            list.removeUser(user);
            return true;
        }
        return false;
    },

    /*Retourne un objet destiné à transiter entre les utilisateurs (on envoie les data essentielles).
    */
    forJSON: function (){
        var res = {};

        res.id = this.id;
        res.name = this.name;
        res.socketId = this.socketId;
        res.color = this.color;

        return res;
    }
};
