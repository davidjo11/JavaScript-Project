function UserManager() {
    this.doc = "Association socketId (key) - name (value) for all clients in the room.\n";
    this.keyName = {};
    this.nameKey = {};
}

UserManager.prototype = {

    addUser: function (socketId, userName) {
        if (this.key.name.socketId !== undefined || this.nameKey.name !== undefined) {
            return false
        } else {
            this.keyName.socketId = userName;
            this.nameKey.name = socketId;
            return true;
        }

    },

    removeUser: function (user) {
        var key = this.nameKey.user;
        delete this.keyName.(this.nameKey.user);
        return this.keyName.key === undefined;
    }
}
