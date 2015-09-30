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

    equals: function (user2) {
        return typeOf(user2) === "User" && user2.getName() === this.getName() && this.getSocket() === user2.getSocket();
    }
};
