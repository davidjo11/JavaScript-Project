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

    equals: function (socketId) {
        return this.getSocket() === socketId;
    },

    getList: function (listname) {
        for (var i = 0; i < this.lists.length; i++) {
            if (this.lists[i].getName() === listname)
                return this.lists[i];
        }
        return undefined;
    },

    shareWith(listName, user) {
        var l = this.this.indexOf(listName);
        if(!l.addUser(user))
            alert("Vous partagez déjà cette liste avec " + user.getName() + ".");
    }
};
