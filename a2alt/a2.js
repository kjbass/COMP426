$(document).ready(function () {
    $("#title").append('<button type="button" class="difficulty" id="easy">easy</button>');
    $("#title").append('<button type="button" class="difficulty" id="medium">medium</button>');
    $("#title").append('<button type="button" class="difficulty" id="hard">hard</button>');
    game = new Game();
    game.addMines();
    game.render();
    //difficulty is selected and board is built
    $(".difficulty").on("click", difficultySelect);
});

function difficultySelect(clickEvent) {
    var difficulty = clickEvent.target.id;
    var gridX;
    var gridY;
    if(difficulty=="easy"){
        gridX = 8;
        gridY = 8;
        numMines = 10;
    } else if (difficulty=="medium"){
        gridX = 20;
        gridY = 20;
        numMines = 20;
    } else if(difficulty=="hard"){
        gridX = 40;
        gridY = 30;
        numMines = 34;
    } else {
        gridX = 8;
        gridY = 8;
        numMines = 10;
    }
    game = new Game(gridX, gridY, numMines);
    game.addMines();
    game.render();
}


var Game = function (width, height, numMines){
    this.width = width;
    this.height = height;
    if (null==height){
        this.height=8;
    } else {
        this.height = height;
    }
    if (null==width){
        this.width=8;
    } else {
        this.width = width;
    }
    if (null==numMines){
        this.numMines = 10;
    } else {
        this.numMines = numMines; 
    }

    this.grid = new Array();
    for (let i=0; i<this.width; i++){
        this.grid[i] = new Array();
        for (let j=0; j<this.height; j++){
            this.grid[i][j] = new button(i,j); 
        }
    }
}

Game.prototype.addMines = function() {
    var numSet = new Set();
    while(numSet.size<this.numMines){
        numSet.add(Math.floor(Math.random()*(this.height+1)*(this.width-1)));
    }
    numSet.forEach(function (index){
        this.grid[button.getXFromIndex(index)][button.getYFromIndex(index)].addClass("mine");
    }, this);
}
var button = function(x,y){
    this.classList = ["square"];
    this.x = x;
    this.y = y;
}

button.getXFromIndex = function(index){
    return index%game.width;
}

button.getYFromIndex = function(index){
    return Math.floor(index/game.width);
}

button.prototype.toHtml = function(){
    htmlString = '<button type = "button" class="';
    //adds mine class if mine
    this.classList.forEach(function(element) {
        htmlString += element;
        htmlString += " "
    });
    htmlString+='"></button>';
    return htmlString;
}

button.prototype.addClass = function(cssClass){
    if (this.hasClass(cssClass)){
        return;
    }
    this.classList.push(cssClass);
}
button.prototype.removeClass = function(cssClass){
    var index = this.classList.indexOf("cssClass");
    this.classList.splice(index, 1);
}
button.prototype.hasClass = function(cssClass){
    if (this.classList.indexOf(cssClass)===-1){return false;}
    else {return true;}
}

function handleClick(event) {
    classToAdd="";
    var index = $(this).index(".square");

    if($(this).hasClass("unclickable")){
        return;
    }

    if($(this).hasClass("mine")){
        if(!event.shiftKey){
            endGame();
            return;
        }
    } 

    if(event.shiftKey){
        if($(this).hasClass("flagged")){
            game.grid[button.getXFromIndex(index)][button.getYFromIndex(index)].removeClass("flagged");
        } else {
            classToAdd = "flagged";
        }
    } else {
        if($(this).hasClass("flagged")){
            return;
        }
        classToAdd = "clicked";
    }
    var x = button.getXFromIndex(index);
    var y = button.getYFromIndex(index);
    game.grid[x][y].addClass(classToAdd);


    //examine adjacency
    game.grid[x-1][y]
    game.grid[x-1][y]
    game.grid[x-1][y]
    game.grid[x-1][y]
    game.grid[x-1][y]
    game.grid[x-1][y]
    game.grid[x-1][y]
    game.grid[x-1][y]

    game.render();
}
function endGame(){
    $("#extraText").append("<p>please select difficulty to start again</p>");
    $(".mine").addClass("clicked");
    $("button").addClass("unclickable");
}
Game.prototype.render = function() {
    $("#extraText").empty();
    $("#board").empty();
    for (let i=0; i<this.grid[0].length; i++){
        for (let j=0; j<this.grid.length; j++){
            $("#board").append(this.grid[j][i].toHtml());
        }
        $("#board").append("<br>");
    }
    $(".square").on("click", handleClick);
}

//adjacency
//custom mine amount and such