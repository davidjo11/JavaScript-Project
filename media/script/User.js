function User(username, password){
  this.name = username ;
  this.password = password;
}

User.prototype = {
  getName : function (){
    return this.name;
  },

  getPassword : function (){
    return this.password;
  },

  equals : function (user2){
    return typeOf(user2) == "User" && user2.getName() == this.getName() && this.getPassword() === user2.getPassword();
  }
};
