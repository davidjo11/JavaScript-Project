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
        var links = this.getIngredients(recipeElement);
        console.log(links);
    }
};

var parser = new Parser();
var recipeElements = parser.parse();

/***

 VERSION OBJECT

 function PopUp(title, callbackFunction) {
   if (arguments.length==0)
       return;
   this.title = title;
   this.callbackFunction = callbackFunction;
   this.body = document.getElementsByTagName("body")[0];

}
 PopUp.prototype = {
   show: function () {
       this.createBackground();
       this.createPopup();
       this.createTitle();
       this.createButton();
   },
   createStyledElement: function (tagName) {
       var element = document.createElement(tagName);
       for (var i = 1; i < arguments.length; i += 2) {
           element.style[arguments[i]] = arguments[i + 1];
       }
       return element;
   },

   createBackground: function () {
       this.background = this.createStyledElement("div",
           "backgroundColor", "rgba(0,0,0,0.5)",
           "position", "absolute",
           "left", "0px",
           "top", "0px",
           "width", "100%",
           "height", "100%",
           "zIndex", 299
       );
       this.body.appendChild(this.background);
       var object=this;
       this.background.addEventListener("click", function () {
           object.body.removeChild(object.background);
       });

   },
   createPopup: function () {
       this.popup = this.createStyledElement("div",
           "backgroundColor", "#FFFFFF",
           "position", "absolute",
           "overflow", "auto",
           "margin", "auto",
           "left", "0px",
           "right", "0px",
           "top", "0px",
           "bottom", "0px",
           "width", "300px",
           "height", "150px",
           "borderColor", "#777777",
           "borderStyle", "solid",
           "borderWidth", "1px",
           "borderRadius", "3px"
       );

       this.background.appendChild(this.popup);
       this.popup.addEventListener("click", function (event) {
           event.stopPropagation();
       });
   },
   createTitle: function () {
       var title = document.createTextNode(this.title);
       var titleParagraph = this.createStyledElement("P", "text-align", "center", "margin", "10px");
       this.popup.appendChild(titleParagraph);
       titleParagraph.appendChild(title);
   },

   createButton: function () {
       var button = this.createStyledElement("button", "backgroundColor", "#3333FF");

       button.type = "BUTTON";
       button.appendChild(document.createTextNode("OK"));
       var buttonParagraph = this.createStyledElement("P", "text-align", "right", "margin", "20px", "padding", "10px", "borderRadius", "3px");
       this.popup.appendChild(buttonParagraph);
       buttonParagraph.appendChild(button);
       var object=this;
       button.addEventListener("click", function () {
           object.body.removeChild(object.background);
           object.callbackFunction.call();
           event.stopPropagation();
       });
   }
}

 popup = new PopUp("Titre qui se place ici", function () {
   alert("ok")
});
 popup.show();


 ===================

 Créer une classe Dialog qui hérite de Popup et qui rajoute un champ de saisie textuelle

 function Dialog (title, callBackFunction) {
   PopUp.call(this,title,callBackFunction);
}
 Dialog.prototype=new PopUp();
 Dialog.prototype.show = function () {
   this.createBackground();
   this.createPopup();
   this.createTitle();
   this.createInputText();
   this.createButton();
};
 Dialog.prototype.createInputText = function () {
   var inputText = this.createStyledElement("INPUT", "width", "100%");
   inputText.type="TEXT";
   var inputTextParagraph = this.createStyledElement("P", "text-align", "center", "margin", "10px");
   this.popup.appendChild(inputTextParagraph);
   inputTextParagraph.appendChild(inputText);

   var object=this;
   this.__defineGetter__("data",function() {return inputText.value;});
   this.__defineSetter__("data",function(value) {inputText.value=value;});
};

 dialog = new Dialog("Titre qui se place ici", function () {
   alert("ok")
});
 dialog.show();

 **/