$(document).ready(function () {
    $("#title").append('<button type="button" class="difficulty" id="easy">easy</button>');
    $("#title").append('<button type="button" class="difficulty" id="medium">medium</button>');
    $("#title").append('<button type="button" class="difficulty" id="hard">hard</button>');
    $("#title").append('<button type="button" class="difficulty" id="custom">custom</button>');
    $("#title").append('<button type="button" class="difficulty" id="new">new</button>');
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
    } else if(difficulty==="custom"){
        gridX = prompt("width", "8");
        gridY = prompt("height", "8");
        numMines = prompt("number of mines", "10");
        gridX = parseInt(gridX);
        gridY = parseInt(gridY);
        numMines = parseInt(numMines);
        var errorFlag = false;
        if (isNaN(gridX)||gridX>40||gridX<8){
            alert("40 is max width and 8 is min width, please try again.");
            errorFlag = true;
        }
        if (isNaN(gridY)||gridY>30||gridY<8){
            alert("30 is max height and 8 is min, please try again.");
            errorFlag = true;
        }
        if((isNaN(numMines)||numMines>((gridX*gridY)-1))||numMines<1){
            alert("wrong mine number, needs > 1 or <(width*height)-1 , please try again.");
            errorFlag = true;
        }
        if(errorFlag){
            return;
        }
        
    } else if(difficulty==="new"){
        gridX = game.width;
        gridY = game.height;
        numMines = game.numMines;
    }
    else {
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
    this.numFlagged = 0;
    this.numCleared = 0;
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
    this.adjNum=0;
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
        htmlString += " ";
    });
    htmlString+='">' 
    if(this.adjNum!=0){
        htmlString += this.adjNum;
    }
    htmlString+='</button>';
    
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
    var numclickedInit = game.numCleared;
    classToAdd="";
    var index = $(this).index(".square");
    var x = button.getXFromIndex(index);
    var y = button.getYFromIndex(index);

    if($(this).hasClass("unclickable")){
        return;
    }
    if($(this).hasClass("clicked")) {
        if(game.grid[x][y].adjNum!==0){
            examineFlagAdjacency(x,y);
        }
        game.render();
        return;
    }

    if($(this).hasClass("mine")){
        if(!event.shiftKey&&!$(this).hasClass("flagged")){
            endGame();
            return;
        }
    } 

    if(event.shiftKey){
        if($(this).hasClass("flagged")){
            game.grid[button.getXFromIndex(index)][button.getYFromIndex(index)].removeClass("flagged");
            game.numFlagged--;
        } else if((game.numMines-game.numFlagged)===0){
            return;
        }else {
            classToAdd = "flagged";
            game.numFlagged++;
        }
    } else {
        if($(this).hasClass("flagged")){
            return;
        }
        classToAdd = "clicked";
        game.numCleared++;
    }
    game.grid[x][y].addClass(classToAdd);

    if(!event.shiftKey){
        var numAdjacentMines = examineAdjacency(x,y);
        game.grid[x][y].adjNum = numAdjacentMines;
    }
    game.render();
}
function examineAdjacency(x,y){
    var numAdjacentMines = 0;
    //I am confident there is a better way to do this
    //but i am brain dead so im just using try catch blocks
    //to ensure i dont get out of bounds errors


    try{if(game.grid[x-1][y].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    try{if(game.grid[x-1][y-1].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    try{if(game.grid[x-1][y+1].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    try{if(game.grid[x+1][y].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    try{if(game.grid[x+1][y-1].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    try{if(game.grid[x+1][y+1].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    try{if(game.grid[x][y-1].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    try{if(game.grid[x][y+1].hasClass("mine")){numAdjacentMines++;}} catch(err){}
    if (numAdjacentMines===0){
        try{
            if(!game.grid[x+1][y].hasClass("flagged")){
                if(!game.grid[x+1][y].hasClass("clicked")){
                    game.grid[x+1][y].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}
        try{
            if(!game.grid[x+1][y+1].hasClass("flagged")){
                if(!game.grid[x+1][y+1].hasClass("clicked")){
                    game.grid[x+1][y+1].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}
        try{
            if(!game.grid[x+1][y-1].hasClass("flagged")){
                if(!game.grid[x+1][y-1].hasClass("clicked")){
                    game.grid[x+1][y-1].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}//TODO: something wrong here with this lol 
        try{
            if(!game.grid[x-1][y].hasClass("flagged")){
                if(!game.grid[x-1][y].hasClass("clicked")){
                    game.grid[x-1][y].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}
        try{
            if(!game.grid[x-1][y+1].hasClass("flagged")){
                if(!game.grid[x-1][y+1].hasClass("clicked")){
                    game.grid[x-1][y+1].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}
        try{
            if(!game.grid[x-1][y-1].hasClass("flagged")){
                if(!game.grid[x-1][y-1].hasClass("clicked")){
                    game.grid[x-1][y-1].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}
        try{
            if(!game.grid[x][y+1].hasClass("flagged")){
                if(!game.grid[x][y+1].hasClass("clicked")){
                    game.grid[x][y+1].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}
        try{
            if(!game.grid[x][y-1].hasClass("flagged")){
                if(!game.grid[x][y-1].hasClass("clicked")){
                    game.grid[x][y-1].addClass("clicked");
                    game.numCleared++;
                }
            }
        } catch(err){}

    }
    return numAdjacentMines;
}

function examineFlagAdjacency(x,y) {
    numAdjacentFlags = 0;

    try{if(game.grid[x-1][y].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    try{if(game.grid[x-1][y-1].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    try{if(game.grid[x-1][y+1].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    try{if(game.grid[x+1][y].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    try{if(game.grid[x+1][y-1].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    try{if(game.grid[x+1][y+1].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    try{if(game.grid[x][y-1].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    try{if(game.grid[x][y+1].hasClass("flagged")){numAdjacentFlags++;}} catch(err){}
    if(game.grid[x][y].adjNum!=numAdjacentFlags){return;}
    console.log("did not return");
    try{
        if(game.grid[x+1][y].hasClass("mine")&&!game.grid[x+1][y].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x+1][y].hasClass("clicked")&&!game.grid[x+1][y].hasClass("flagged")){
                game.grid[x+1][y].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

    try{
        if(game.grid[x+1][y+1].hasClass("mine")&&!game.grid[x+1][y+1].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x+1][y+1].hasClass("clicked")&&!game.grid[x+1][y+1].hasClass("flagged")){
                game.grid[x+1][y+1].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

    try{
        if(game.grid[x+1][y-1].hasClass("mine")&&!game.grid[x+1][y-1].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x+1][y-1].hasClass("clicked")&&!game.grid[x+1][y-1].hasClass("flagged")){
                game.grid[x+1][y-1].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

    try{
        if(game.grid[x-1][y].hasClass("mine")&&!game.grid[x-1][y].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x-1][y].hasClass("clicked")&&!game.grid[x-1][y].hasClass("flagged")){
                game.grid[x-1][y].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

    try{
        if(game.grid[x-1][y+1].hasClass("mine")&&!game.grid[x-1][y+1].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x-1][y+1].hasClass("clicked")&&!game.grid[x-1][y+1].hasClass("flagged")){
                game.grid[x-1][y+1].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

    try{
        if(game.grid[x-1][y-1].hasClass("mine")&&!game.grid[x-1][y-1].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x-1][y-1].hasClass("clicked")&&!game.grid[x-1][y-1].hasClass("flagged")){
                game.grid[x-1][y-1].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

    try{
        if(game.grid[x][y+1].hasClass("mine")&&!game.grid[x][y+1].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x][y+1].hasClass("clicked")&&!game.grid[x][y+1].hasClass("flagged")){
                game.grid[x][y+1].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

    try{
        if(game.grid[x][y-1].hasClass("mine")&&!game.grid[x][y-1].hasClass("flagged")){
            endGame();
        } else {
            if(!game.grid[x][y-1].hasClass("clicked")&&!game.grid[x][y-1].hasClass("flagged")){
                game.grid[x][y-1].addClass("clicked");
                game.numCleared++;
            }
        }
    } catch(err){}

}

function endGame(){
    $("#extraText").append("<p>please select difficulty to start again</p>");
    $(".mine").addClass("clicked");
    $("button").addClass("unclickable");
}

function win(){
    $("#extraText").append("<p>you win, please select difficulty to start again</p>");
}

Game.prototype.render = function() {
    console.log("total cleared" + game.numCleared +"total squares-mines" +((game.width*game.height)-game.numMines));

    $("#extraText").empty();
    $("#score").empty();
    $("#score").append("Mines Left: " + (game.numMines - game.numFlagged));
    $("#board").empty();
    for (let i=0; i<this.grid[0].length; i++){
        for (let j=0; j<this.grid.length; j++){
            $("#board").append(this.grid[j][i].toHtml());
        }
        $("#board").append("<br>");
    }
    $(".square").on("click", handleClick);
    if (game.numCleared===((game.width*game.height)-game.numMines)){
        win();
        return;
    }
}

//adjacency
//custom mine amount and such