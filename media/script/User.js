function User(username, socket) {
    this.socketId = socket;
    this.name = username;
    //  this.password = password;
    this.color = undefined;
    this.lists = [];
}

User.prototype = {
    getName: function () {
        return this.name;
    },

    //  getPassword : function (){
    //    return this.password;
    //  },

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
        for (var i = 0; i < this.lists.length; i++) {
            if (this.lists[i].equals(list))
                return this.lists[i];
        }
        return undefined;
    },

    shareWith: function (list, user) {
        var l = this.lists[this.indexOf(list)];
        if(!l.addUser(user))
            alert("Vous partagez déjà cette liste avec " + user.getName() + ".");
    },

    removeUserFromList: function (list, user){
        if(this.getList(list) !== undefined && list.getProprietor().equals(this) && list.isSharedWith(user)){
            list.removeUser(user);
            return true;
        }
        return false;
    }
};
