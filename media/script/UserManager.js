function UserManager() {
    this.doc = "Association socketId (key) - name (value) for all clients in the room.\n";
    this.keyName = "";
}

UserManager.prototype = {

    addUser: function (socketId, userName) {
        if (this.keyName.search(socketId) === -1) {
            return false
        } else {
            this.keyName += socketId + "-" + userName + ",";
            return true;
        }

    },

    removeUser: function (socketId) {
        var t = this.keyName.split(',');
        if (this.keyName.indexOf(socketId) !== -1){
            for (var i = 0; i < t.length; i++) {
                var s = t[i].indexOf(socketId) > -1 ? t[i].substring(t[i].indexOf(socketId), t[i].length) : "";
                if(s !== "")
                    i = t.length;
            }
            this.keyName.replace(s+',',"");
        }
        return this.keyName.search(socketid) === -1;
    },

    exists: function (socketId) {

    }
}
