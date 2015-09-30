function ListManager() {
    'use strict';
    this.lists = [];
}

ListManager.prototype = {
    addList: function (list) {
        'use strict';
        var i = 0;
        while(this.getList(list, i) === -1 && i < this.lists.length) {
            i++;
        }
        list.notAlone = i;
        this.lists.push(list);
    },

    getList: function (list) {
        'use strict';
        var aux = arguments[1] !== undefined ? arguments[1] : 0;

        for (var i = aux; this.lists.length; i++) {
            var l = this.lists[i];
            if (l.getName() === l.getName() && l.notAlone === list.notAlone && l.getProprietor().equals(list.getProprietor()))
                return i;
        }
        return -1;
    },

    removeList: function (list) {
        var i = this.getList(list);
        if(i > -1){
            this.lists.splice(i, 1);
            return true;
        }
        return false;
    }
};
