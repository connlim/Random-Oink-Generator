//arrays of possible words and punctuations
var words = ["oink", "piggy", "oinka", "oinky", "pig", "piggu", "poggy", "noink", "yoink"];
var Cwords = ["Oink", "Piggy", "Oinka", "Oinky", "Pig", "Piggu", "Poggy", "Noink", "Yoink"];
var punctuation = [",", ".", "!", "?"];

//generate random int min(inclusive) max(exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//calls generateText with input given
function getInput(){
    var temp = document.getElementById('numinput').value;
    //check for validity; invalid will use 100 words
    if(isNaN(temp) || temp<2 || temp>10000){
        generateText(100);
    }else{
        generateText(Math.floor(temp)); //ensures number is integer
    }
}
/*
Utilizes getRandomInt() to generate random text. The random numbers are used to select elements in the array.
For the spacing out of punctuation, a counter is used, which will decrement until it reaches zero, upon which 
a random punctuation is inserted. A new random counter is generated again. All the added text is stored in a 
string, which will be placed in the html when all the text is added.
*/
function generateText(numOfWords) {
    //counter for punctuation. 
    var count = getRandomInt(2,9);
    //string to store text; intialized with random capitalized words
    var displayed = Cwords[getRandomInt(0,9)];
    //boolean to check if the word needs to be capital
    var isCapital = false;

    //loops n-2 times, to make way for initialized and ending words
    for (var i = 1; i < numOfWords-1; i++) {
        displayed += " ";//add a space

        if(!isCapital) {
            displayed += words[getRandomInt(0,9)];
        } else {
            displayed += Cwords[getRandomInt(0,9)];
            isCapital = false;
        }

        //when count reaches zero, it is time to insert a punctuation
        if (count === 0) {
            var puncSelector = getRandomInt(0,4);
            displayed += punctuation[puncSelector];
            if(puncSelector>0) { //is not a comma, thus end of sentence
              isCapital = true;
            }
            count = getRandomInt(2,9);//reset count
        }
        count--; 
    }

    //word at the end needs an ending punctuation
    displayed += " " + words[getRandomInt(0,9)] + punctuation[getRandomInt(1,4)];
    //displays the text
    document.getElementById('oink').innerHTML = displayed;

}

//function i stole from here to select text
//https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
function selectText() {
    var doc = document;
    var text = doc.getElementById('oink');
    var range;
    var selection;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}