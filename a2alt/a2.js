$(document).ready(function () {
    $("#title").append('<button type="button" class="difficulty" id="easy">easy</button>');
    $("#title").append('<button type="button" class="difficulty" id="medium">medium</button>');
    $("#title").append('<button type="button" class="difficulty" id="hard">hard</button>');
    game = new Game();
    game.render();
    //difficulty is selected and board is built
    $(".difficulty").on("click", startGame);
});

function startGame(clickEvent) {
    var difficulty = clickEvent.target.id;
    var gridX;
    var gridY;
    if(difficulty=="easy"){
        gridX=8;
        gridY=8;
    } else if (difficulty=="medium"){
        gridX=20;
        gridY=20;
    } else if(difficulty=="hard"){
        gridX=40;
        gridY=30;
    } else {
        gridX=8;
        gridY=8;
    }
    game = new Game(gridX, gridY);
}

// function addMines() {
//     var elArray = $(".square");
//     var numMines = Math.floor(Math.random()*(elArray.length - 1));
//     var minesPlaced = 0;
//     for (let i=0; i<elArray.length; i++){
//         if (minesPlaced=numMines){
//             break;
//         }
        
//     }
// }

var Game = function (width, height){
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
    this.grid = new Array();
    for (let i=0; i<this.height; i++){
        this.grid[i] = new Array();
        for (let j=0; j<this.width; j++){
            this.grid[i][j] = new button(i,j); 
        }
    }
    this.render();
    //attach listener to game buttons
    //addMines();
}

var button = function(x,y){
    this.classList = ["square"];
    this.x = x;
    this.y = y;
}
// var button.getXFromIndex=
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

function handleClick(event) {
    alert($(this).index(".square"));
    game.render();
}

Game.prototype.render = function() {
    c=0;
    $("#board").empty();
    for (let i=0; i<this.height; i++){
        for (let j=0; j<this.width; j++){
            $("#board").append(this.grid[i][j].toHtml());
            c++;
        }
        $("#board").append("<br>");
    }
    $(".square").on("click", handleClick);
}
//At some point the bombs need to be placed, can be done with index
//Should have some sort of board object that encapsulates all of this hootinany
//