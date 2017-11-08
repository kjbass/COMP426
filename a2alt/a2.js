$(document).ready(function () {
    $("#title").append('<button type="button" class="difficulty" id="easy">easy</button>');
    $("#title").append('<button type="button" class="difficulty" id="medium">medium</button>');
    $("#title").append('<button type="button" class="difficulty" id="hard">hard</button>');
    //difficulty is selected and board is built
    $(".difficulty").on("click", difficultySelect);
});

function difficultySelect(clickEvent) {
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
    buildGrid(gridX, gridY);
}
function buildGrid(gridX, gridY) {
    $("#board").empty();
    for (let i=0; i<gridY; i++){
        for (let j=0; j<gridX; j++){
            $("#board").append('<button type="button" class="square"></button>');
        }
        $("#board").append("<br>");
    }
    //attach listener to game buttons
    $(".square").on("click", handleClick);
    addMines();
}
function addMines() {
    var elArray = $(".square");
    var numMines = Math.floor(Math.random()*(elArray.length - 1));
    var minesPlaced = 0;
    for (let i=0; i<elArray.length; i++){
        if (minesPlaced=numMines){
            break;
        }
        
    }
}

function handleClick(event) {
    alert($(this).index(".square"));
}

//At some point the bombs need to be placed, can be done with index
//Should have some sort of board object that encapsulates all of this hootinany
//