module("list", {

});

test("test creation de la liste",1,function(){
	var user = new User("imane", 1);
	var list = new List("ListAmis",user);
	ok(list.getName()==="ListAmis","name = ListAmis");

});
test("test add product",2,function(){
	var user = new User("imane",1);
	var list = new List("ListAmis",user);
	equal(list.getProducts().length, 0,"la liste est vide");

	list.addProduct("lait");
	equal(list.getProducts().length, 1,"la liste contient un produit");

});

test("test add user",1,function(){
	var user = new User("imane",1);
	var user2 = new User("david",2);
	var list = new List("ListAmis",user);
	var bool = list.addUser(user2);
	equal(bool, true,"Partage avec un utilisateur");

});

test("test get user",1,function(){
	var user = new User("imane",1);
	var user2 = new User("david",2);
	var user3 = new User("test",3);
	var list = new List("ListAmis",user);
	list.addUser(user2);
	list.addUser(user3);
	equal(list.getUser(user2),0,"la position du l user2");

});
test("test si il est partage avec",2,function(){
var user = new User("imane",1);
	var user2 = new User("david",2);
	var user3 = new User("test",3);
	var list = new List("ListAmis",user);
	list.addUser(user2);
	equal(list.isSharedWith(user2),true, "partage avec user2");
	equal(list.isSharedWith(user3),false, "n'est pas partage avec user3");

});
test("test suprimer user",2,function(){
var user = new User("imane",1);
	var user2 = new User("david",2);
	var list = new List("ListAmis",user);
	var bool = list.addUser(user2);
	equal(bool, true,"Partage avec un utilisateur");
	var sup =list.removeUser(user2);
	equal(sup,true,"user2 supprime");

});

test("test set description",1,function(){
	var user = new User("imane",1);
	var list = new List("ListAmis",user);
	list.setDescription("liste pour la soiree");
	equal(list.getDescription(),"liste pour la soiree","la description de la liste");

});
