function userManager() {
    this.doc = "Association socketId (key) - name (value) for all clients in the room.\n";
    //Tableau d'objets de type User
    this.users = [];
    //tableau des couleurs utilisées en hexa
    this.colors = [];
    //tableau des pseudos indisponibles
    this.unavailablePseudo = [];
}

/*Cette classe permet de répertorier l'ensemble des utilisateurs présents dans la room.
*Dès qu'un message est reçu, si l'envoyeur n'est pas dans l'objet l'UserManager alors on l'ajoute.
*/
userManager.prototype = {

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
        this.unavailablePseudo.push(user.getName());
        return true;
    },

    /*Retourne la position de l'utilisateur dans le UserManager
    *@param user: soit un objet User soit une chaine de caractère réprésentant le socket d'un utilisateur
    *@return la position de l'utilisateur user dans le UserManager, -1 si user n'y est pas.
    */
    exists: function (user) {
        var  i = 0;
        var u = undefined;
        var length = this.users.length;
        if (typeof user === "object") {
            for (i = 0; i < length; i++) {
                u = this.users[i];
                if (u.equals(user))
                    return i;
            }
            return -1;
        } else if (typeof user === "string") { 
        //socketid
            for (i = 0; i < length; i++) {
                u = this.users[i];
                if (u.getSocket() === user)
                    return i;
            }
            return -1;
        }
    },

    /*Retourne l'objet de type User correspondant à la socket de l'utilisateur ou à sa position dans this.users.
    *@param id: le socket ou l'identifiant de l'utilisateur.
    */
    getUser: function (id) {
        var  i = 0;
        var u = undefined;
        if (typeof id === "string") { 
        //param.: socketId
            for (i = 0; i < this.users.length; i++) {
                u = this.users[i];
                if (u.getSocket() === id)
                    return u;
            }
            return undefined;
        } else if (typeof id === "number") { 
        //Param.: indice dans le tableau this.users
            return this.users[id];
        }
    },

    /*Permet de retirer l'utilisateur user du UserManager
    *@param user: le nom ou la position dans la tableau de l'utilisateur à retirer
    */
    removeUser: function (user) {
        var i = this.getUser(user);
        if (i > -1) {
            var u = this.users.splice(i, 1);
            this.unavailablePseudo.splice(this.unavailablePseudo.indexOf(u.getName()), 1);
            return true;
        } else false;
    },

    isAvailable: function (pseudo){
        return this.unavailablePseudo.indexOf(pseudo) === -1;
    }
}
