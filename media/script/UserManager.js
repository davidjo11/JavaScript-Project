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
