function MessageManager() {
    this.doc = "La classe MessageCreator permet de créer les messages de créer ou de modifications de liste au format convenant avant de l'envoyer avec la méthode sendMessage de Cobra.\n" + "La partie \"content\", de ce message, contiendra un objet contenant ayant pour clés:\n" + "- la clé key_user: le nom de la personne qui a posté la liste, il ne contiendra que des caractères alphanumériques\n" + "- la clé key_title: le titre, nom de la liste (ne contiendra que des lettres)\n" + "- la clé description: contenant une description de la liste (contiendra tous les caractères possibles)\n" + "- la clé products: contenant un tableau de produits (tableau de chaines de caractères ne contenant que des lettres).\n\n" + "Chaque valeur associée aux différentes clés sera précédée d'un nombre permettant d'obtenir le nombre de carctères qui composent la valeur, si elle était une chaine de caractères, afin de faciliter son extraction.\n";
}

/**Cette classe permet de créer les messages qui sont envoyés lorsqu'une action est effectuée sur une liste.
*Elle permet également de traiter, analyser et transformer les messages reçus par un utilisateur.
*Ex: Un objet de la classe User qui est envoyé par la méthode sendMessage sera reçu sous la forme d'un objet de la classe Object.
*C'est pareil pour toutes les classes transitant via sendMessage (du coup on perd les fonctions des objets).
*D'où les fonctions forJSON pour envoyer ce qui est utile.
*/
MessageManager.prototype = {

    joinMsg: function () {
        return {
            join: Tools.me.forJSON()
        }
    },

    newListMsg: function (list) {
        return {
            create: list.forJSON(),
            user: Tools.me.forJSON()
        }
    },

    updateListMsg: function (list) {
        return {
            update: list.forJSON(),
            user: Tools.me.forJSON()
        }
    },

    deleteListMsg: function (list) {
        return {
            delete: list.forJSON(),
            user: Tools.me.forJSON()
        }
    },

    editListMsg: function (list) {
        return {
            edit: list.forJSON(),
            user: Tools.me.forJSON()
        }
    },

    /**Fonction permettant de vérifier le contenu du message.
    *
    */
    validateMessage: function (msg) {
        if (((typeof msg.edit === "object" || typeof msg.update === "object" || typeof msg.delete=== "object" || typeof msg.create=== "object") && typeof msg.user === "object") || typeof msg.join === "object") {
            return true;
        }
        return false;
    },

    /*transformCUD (Create, Update, Delete)
    *Analyse le message reçu et retourne les objets User et List correspondants.
    */
    transformCUD: function (messageObject) {
        var res = { list: undefined, user : undefined};
        //Traitement de la liste
        var list = undefined,
            list_b = undefined;
        var user = undefined,
            user_b = undefined;

        if (messageObject.create) {
            list_b = messageObject.create;
        } else if (messageObject.update) {
            list_b = messageObject.update;
        } else if (messageObjectcase.delete) {
            list_b = messageObject.delete;
        } else if (messageObject.edit) {
            list_b = messageObject.edit;
        }

        user_b = messageObject.user;
        user = new User(user_b.name, user_b.socketId);
        user.setColor(user_b.color);
        Tools.users.addUser(user);
        
        var proprietor = new User(list_b.proprietor.name, list_b.proprietor.socketId);
        proprietor.setColor(list_b.proprietor.color);
        list = new List(list_b.name, proprietor);
        
        list.isBeingEdited = list_b.isBeingEdited;
        //SharedWith
        for (var i = 0; i < list_b.sharedWith.length; i++) {
            var u = new User(list_b.sharedWith[i].name, list_b.sharedWith[i].socketId);
            u.setColor(list_b.sharedWith[i].color);
            list.addUser(u);
            Tools.users.addUser(u);
        }
        //Produits
        for (var i = 0; i < list_b.products.length; i++) {
            var u = list_b.products[i];
            list.addProduct(u);
        }

        list.description = list_b.description;
        list.notAlone = list_b.notAlone;
        list.id = list_b.id;

        res.list = list;
        res.user = user;

        return res;
    },

    /*Analyse l'objet Object reçu en param. et retourne l'objet User correspondant.
    *
    */
    getUser: function (userObject) {
        var u = new User(userObject.name, userObject.socketId);
        u.setColor(userObject.color);
        return u;
    },

    //La fonction de MICKAEL
    /*A mon avis(david): Cette fonction devrait retirer les produits du site et retourner l'ensemble des produits sous la forme d'un tableau de String.
    *
    */
    getProfuctsFromURL: function (URL) {

    }
};
