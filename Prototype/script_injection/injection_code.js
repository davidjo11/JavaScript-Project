function Parser(){}

Parser.prototype = {
    getRecipeContent : function(){
        var recipeElement = document.getElementsByClassName('m_content_recette_ingredients m_avec_substitution')[0];
        return recipeElement.innerHTML;
    },

    /**
     * this function extract ingredient from an html string
     * @param text => expect dom elements as string which contains ingredients
     * @returns {XML|string|*}
     */
    getIngredients : function(text){
        // remove open link tag and its attributes
        text = text.replace(/(<a[^<]*>)/g, '');
        // remove close link tag
        text = text.replace(/(<\/a>)/g, '');
        // remove open link tag and its attributes
        text = text.replace(/<span>(.*)<\/span>/g, '');

        var text_table = text.split('<br>');


        var ingredient_table = [];

        // add each ingredient inside a table, it exclude title and delete white spaces
        for(var i = 0, il = text_table.length ; i < il ; i++){
            if(text_table[i].indexOf('-') !== -1){
                ingredient_table.push(text_table[i].replace('-', '').trim());
            }
        }

        return ingredient_table;
    },

    parse : function(){
        var recipeElement = this.getRecipeContent();
        return this.getIngredients(recipeElement);
    }
};

var parser = new Parser();
var recipeElements = parser.parse();