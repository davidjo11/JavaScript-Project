//
//javascript:{var baliseScript = document.createElement('script');baliseScript.src = "http://localhost:63342/TP2/script.js";document.getElementsByTagName('body')[0].appendChild(baliseScript);}
var oldButton = document.getElementById('__fond');
if(oldButton)
    oldButton.parentNode.removeChild(oldButton);


// FUNCTIONS
function ce(type){
    var element = document.createElement(type);

    for(var i = 1, il = arguments.length; i < il ; i+=2){
        element.style[arguments[i]] = arguments[i+1];
    }

    return element;
}



// OBJECT
function Drawer(title){
    this.textTitle = title;
}

Drawer.prototype = {
    creationFond : function(){
        var fond = document.createElement("div");
        fond.style.backgroundColor = "rgba(0,0,0,0.5)";
        fond.style.position = "fixed";
        fond.style.top = "0";
        fond.style.left = "0";
        fond.style.width = "100%";
        fond.style.height = "100%";
        fond.style.zIndex = "300";
        fond.id = "__fond";

        fond.addEventListener('click', function() {
            document.body.removeChild(fond);
        });
        this.fond = fond;
    },
    creationFondBlanc : function(){
        var white = document.createElement("div");
        white.style.position = "relative";
        white.style.marginTop = "100px";
        white.style.marginLeft = "auto";
        white.style.marginRight = "auto";
        white.style.width = "500px";
        white.style.height = "300px";
        white.style.backgroundColor = "white";
        white.style.background = "#fff";
        white.style.borderRadius = "4px";
        white.style.boxShadow = "#000 2px 2px 5px";

        white.onclick = function(event){event.stopPropagation()};
        this.white = white;
    },
    creationTitle : function(){
        var title = document.createElement('h1');
        title.innerText = this.textTitle;
        title.style.fontSize = "24px";
        title.style.color = "#444";
        title.style.borderBottom = "1px solid gray";
        title.style.padding = "30px";
        this.title = title;
    },
    creationButton : function(){
        var button = ce(
            "button",
            "position", "absolute",
            "bottom", "20px",
            "right", "20px",
            "width", "100px",
            "height", "50px",
            "borderRadius", "500px",
            "backgroundColor", "lightGray",
            "border", "1px solid gray"
        );
        button.innerText = "Ok";
        this.button = button;
    },

    show : function(){
        this.creationFond();
        this.creationFondBlanc();
        this.creationTitle();
        this.creationButton();

        this.white.appendChild(this.title);
        this.white.appendChild(this.button);
        this.fond.appendChild(this.white);
        document.getElementsByTagName('body')[0].appendChild(this.fond);
    }
};

var a = new Drawer("mon titre");
a.show();


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