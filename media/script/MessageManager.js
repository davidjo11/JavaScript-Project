function MessageManager(user, titre, description, produits) {
    this.doc = "La classe MessageCreator permet de créer les messages de créer ou de modifications de liste au format convenant avant de l'envoyer avec la méthode sendMessage de Cobra.\n" + "La partie \"content\", de ce message, contiendra un objet contenant ayant pour clés:\n" + "- la clé key_user: le nom de la personne qui a posté la liste, il ne contiendra que des caractères alphanumériques\n" + "- la clé key_title: le titre, nom de la liste (ne contiendra que des lettres)\n" + "- la clé description: contenant une description de la liste (contiendra tous les caractères possibles)\n" + "- la clé products: contenant un tableau de produits (tableau de chaines de caractères ne contenant que des lettres).\n\n" + "Chaque valeur associée aux différentes clés sera précédée d'un nombre permettant d'obtenir le nombre de carctères qui composent la valeur, si elle était une chaine de caractères, afin de faciliter son extraction.\n";
}

MessageManager.prototype = {
    createMsgJoin: function (user) {
        return {
            type: 'join',
            user: Tools.me
        }
    },

    createNewListMsg: function (list) {
        return {
            type: 'create',
            user: Tools.me,
            list: list
                //        sharedWith: users
        }
    },

    updateList: function (list) {
        return {
            type: 'update',
            user: Tools.me,
            list: list
        }
    },

    deleteList: function (list) {
        return {
            type: 'delete',
            user: Tools.me,
            list: list
        }
    },

    validateMessage: function (msg) {
        switch(msg.type){
            case "create":
                if(msg.list && msg.user){
                    return true;
                }
                return false;
                break;
            case "update":
                if(msg.list && msg.user){
                    return true;
                }
                return false;
                break;
            case "join":
                if(msg.join && msg.user){
                    return true;
                }
                return false;
                break;
            case 'delete':
                if(msg.list && msg.user){
                    return true;
                }
                return false;
                break;
            default:
                return false;
        }
    },

    //La fonction de MICKAEL
    getProfuctsFromURL: function (URL) {
    }

};
