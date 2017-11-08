$(document).ready(function () {
    $("#title").append('<button type="button" class="difficulty" id="easy">easy</button>');
    $("#title").append('<button type="button" class="difficulty" id="medium">medium</button>');
    $("#title").append('<button type="button" class="difficulty" id="hard">hard</button>');

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
    for (let i=0; i<gridX; i++){
        for (let j=0; j<gridY; j++){
            $("#board").append('<button type="button" class="square"></button>');
        }
        $("#board").append("<br>");
    }
}