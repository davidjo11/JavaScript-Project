<<<<<<< HEAD
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
=======
function UserManager(){
  this.usersList = new Array();
}

UserManager.prototype = {
  userExists : function(user){
    return this.usersList.indexOf(user) > -1;
  },

  addUser : function (user){
    if(!this.userExists(user) || user !== ""){
      this.usersList.push(user);
      return true;
    }
    else return false;
  },

  removeUser : function (user){
    if(userExists(user)){
      this.usersList.splice(indexOf(user),1);
      return true;
    }
    return false;
  }
}
>>>>>>> 517402cd954da68d0b20c490a7d8a9a3bf99fd14
