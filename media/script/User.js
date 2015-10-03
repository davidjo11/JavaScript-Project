function User(username, socket) {
    this.socketId = socket;
    this.name = username;
    this.password = undefined;
    this.color = undefined;
    this.lm = new ListManager();
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

    equals: function (user) {
        return this.getSocket() === user.getSocket();
    },

    getList: function (list) {
        return this.lm.getList(list);
    },

    updateList: function (list){
        return this.lm.updateList(list);
    },

    createList: function (list){
        return this.lm.createList(list);
    },

    deleteList: function (list) {
        return this.lm.deleteList(list);
    },

    shareWith: function (id, user) {
        var l = this.lm.getList(id);
        if(l.getProprietor().equals(this))
            return l.addUser(user);
        return false;
    },

    removeUserFromList: function (list, user) {
        if (this.getList(list) !== undefined && list.getProprietor().equals(this) && list.isSharedWith(user)) {
            list.removeUser(user);
            return true;
        }
        return false;
    }
};
