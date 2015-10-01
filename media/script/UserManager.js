function UserManager() {
    this.doc = "Association socketId (key) - name (value) for all clients in the room.\n";
    //Tableau d'objets de type User
    this.users = new Array();
    //tableau des couleurs utilisées en hexa
    this.colors = new Array();
}

UserManager.prototype = {

    initialize: function (i) {
        this.colors = Tools.getRandomColors(i);
    },

    addUser: function (user) {
        var color = this.colors.splice(Math.random() * this.colors.length, 1)[0];
        user.setColor(color);
        this.users.push(user);
        return true;
    },

    exists: function (user) {
        for (var i in this.users) {
            var u = this.users[i];
            if (u.equals(user))
                return i;
        }
        return -1;
    },

    removeUser: function (user) {
        if (this.exists(user.getSocket()) > -1) {
            var user = this.users.splice(i, 1);
            this.colors.push(user.getColor());
            return true;
        } else false;
    }
}
