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
    
    getNbUser: function (){
        return this.users.length;
    },
    
    addUser: function (user) {
        if (user.getColor() === undefined) {
            var color = this.colors.splice(Math.random() * this.colors.length, 1)[0];
            user.setColor(color);
        }
        this.users.push(user);
        return true;
    },

    exists: function (user) {
        if (typeof user === "object") {
            for (var i = 0; i < this.users.length; i++) {
                var u = this.users[i];
                if (u.equals(user))
                    return i;
            }
            return -1;
        } else if (typeof user === "string") { //socketid
            for (var i = 0; i < this.users.length; i++) {
                var u = this.users[i];
                if (u.getSocket() === user)
                    return i;
            }
            return -1;
        }
    },

    getUser: function (id) {
        if (typeof id === "string") { //param.: socketId
            for (var i = 0; i < this.users.length; i++) {
                var u = this.users[i];
                if (u.getSocket() === id)
                    return u;
            }
            return undefined;

        } else if (typeof id === "number") { //Param.: indice dans le tableau this.users
            return this.users[id];
        }
    },

    removeUser: function (user) {
        var i = this.exists(user);
        if (i > -1) {
            console.log(this.users.splice(i, 1));
            //            this.colors.push(user.getColor());
            return true;
        } else false;
    }
}