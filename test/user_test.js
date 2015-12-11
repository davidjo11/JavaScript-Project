/**
 * Created by josias on 10/12/15.
 */
module("user", {

});

test("test creation user",2,function(){
    var user = new User("imane", 1);
    deepEqual("imane", user.getName(), "Le nom de user est imane");
    deepEqual(1, user.getSocket(), "La socket du user est égale à 1");
});
