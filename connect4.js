
var gameboardArray = []; //2D ARRAY FOR COLUMNS AND ROW CHECK
    for(let i = 0; i < 7; i++) {
        gameboardArray[i] = new Array(6);
        for(let j = 0; j < 6; j++) {
          gameboardArray[i][j] = 0;
      }
    }     
    
var player1Turn = true; //VARIABLE FOR CHECKING PLAYERTURN

var currentPlayerChip; // USED TO USER IMAGE FOR IMAGE SELECT
var userImageSrc;
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2
playernum  = 1;
function playButton() { //TAKES THE USER TO THE SELECT GAMEMODE SCREEN
  $("#startButton").css({'display' : 'none'});
  var element = document.getElementById("title1");
  element.innerHTML = "CHOOSE A GAME MODE";
  mode('block');
}
function help(){//INSTRUCTION ARE DISPLAYED INSIDE AN ALERT WHEN CLICKED
  alert("Instructions...");
}
function mode(b){ //YO ADD COMMENTS FOR THESE TWO
  $("#gameMode1").css({'display' : b});
  $("#gameMode2").css({'display': b});
}
function gameMode(a){
  mode('none');
  if (a==true){
    //alert("Player1 vs Player2");
  }else{
    //alert("Player vs Computer");
  }
  var element = document.getElementById("title1"); //CALLS THE DESIGNCHIP FUNCTION
  element.innerHTML = "DESIGN YOUR CHIPS";
  designChip();
}
function designChip(){ //DESIGN CHIP FUNCTIONALLIYU
  $("#imgselect").css({'display' : 'block'});
  $("#go").css({'display' : 'block'});
}

function gameScreen(){ 
  $("#imgselect").css({'display' : 'none'});//WHEN LETS GO BUTTON IS CLICKED STARTS UP THE GAMESCREEN
  $("#go").css({'display' : 'none'});
  $("#board1").css({'display' : 'block'});
  $("#selection").css({'visibility' : 'visible'});
  var element = document.getElementById("title1");
  element.innerHTML = "CONNECT 4";
  document.getElementById("title1").style.fontSize = "45px";
  document.getElementById("title1").style.textAlign = "left";


  for (var i = 1; i <= 42; i++){ //MAKES IMAGE FOR EVERY HOLE ON THE GAMEBOARD
    var newImg = document.createElement("img");
    $(newImg).attr("id", "chipimg" + i);
    $(newImg).attr("class", "chipimgclass")
    //add a dummy image
    $(newImg).attr("src", "./images/white.jpg");
    $("#board1").append(newImg);
}
for (var i = 0; i <= 6; i++){ //MAKES THE TRANSPARENT BUTTONS ON THE GAMEBOARD TO PLACE CHIPS ON THE EMPTY HOLES IN THE BOARD
  var newButton = document.createElement("button");
  $(newButton).attr("id", "column" + i);
  $(newButton).attr("class", "columnclass")
  //add a dummy image
  $(newButton).html(i + 1+ " column");
  var string = "addChip(i);";
  $(newButton).attr("onClick", "addChip("+i+");");
  console.log(i);
  $("#board1").append(newButton);

}
}
function previewFile() { //PREVIEW IMAGE AND IMAGE SELECTOR AND STORE IMAGE FOR THE PLAYER
  const preview = document.querySelector('img');
  const file = document.querySelector('input[type=file]').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convert image file to base64 string
    preview.src = reader.result;

  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
  currentPlayerChip = document.querySelector('img').src;

}


function addChip(column) {



  if (firstFreeRow(column) < 6) {
    var imgIndex = (5 - firstFreeRow(column))* 7 + 1 + parseInt(column);
    if (player1Turn == true) {
      gameboardArray[column][firstFreeRow(column)] = 1; 
    } else {
      gameboardArray[column][firstFreeRow(column)] = 2; 

    }
  }
  if (player1Turn == true) {
    currentPlayerChip = document.querySelector('img').src;
  }
  document.getElementById("chipimg" + imgIndex).setAttribute('src', currentPlayerChip);
  console.log(gameboardArray);
  if(checkHorizontal() || checkVertical())
  {
    $(".columnclass").css({'visibility' : 'hidden'});
  }
  var i = 0;
  var j = 0;
  var flag = false
  while(i < 6 && flag == false)
  {   
    for (let j = 0; j < 7; j++) { 
      if(checkDiagonalWin(i, j)[0]){
        alert(checkDiagonalWin(i, j)[1]+"Player is the winner");
        $("#selection").css({'visibility' : 'hidden'});
        flag = true;
      }
    }
    i++;
  }
  turnSwitch();

}

function firstFreeRow(column) {

  for (let i = 0; i < 6; i++) {
    if (gameboardArray[parseInt(column)][i] == 0) {
      return i;
    }
  }
}

function checkVertical() {
  var firstChip;
  var numInRow = 1;
  var lastChip;
  for (let i = 0; i < 6; i++) {     //going through each row 
    for (let j = 0; j < 7; j++) { 

      if (lastChip == gameboardArray[i][j] && gameboardArray[i][j] != 0) {
        numInRow += 1;
      } else {
        numInRow = 1;
      }
      lastChip = gameboardArray[i][j];

      if (numInRow == 4) {
        if (lastChip == 1) {
          alert("Player 1 has won");
          return true;
          
        } 
        if (lastChip == 2) {
          alert("Player 2 has won");
          return true;

        }
      }
    }
  }
  return false;
}

function checkHorizontal() {
  var firstChip;
  var numInRow = 1;
  var lastChip;
  for (let j = 0; j < 7; j++) {     //going through each column 
    for (let i = 0; i < 6; i++) { 
      if (lastChip == gameboardArray[i][j] && gameboardArray[i][j] != 0) {
        numInRow += 1;
      } else {
        numInRow = 1;
      }
      lastChip = gameboardArray[i][j];

      if (numInRow == 4) {
        if (lastChip == 1) {
          alert("Player 1 has won");
          return true;
        }
        if (lastChip == 2) {
          alert("Player 2 has won");
          return true;
        }
      }
    }
  }
  return false;

}

function checkDiagonalWin(row, column) {
  var result = false;
  var player;
  var numRows = 6;
  var numColumns = 7;
  if(gameboardArray[row][column] != 0) {
      // there are four possible directions of a win
      // if the top right contains a possible win
      if(row - 3 > -1 && column + 3 < numColumns) {
          result = gameboardArray[row][column] == gameboardArray[row - 1][column + 1] &&
          gameboardArray[row][column] == gameboardArray[row - 2][column + 2] &&
          gameboardArray[row][column] == gameboardArray[row - 3][column + 3]; 
          if(result){
            player = gameboardArray[row][column];
          }
        }
      
      // if the bottom right contains possible win
      if(row + 3 < numRows  && column + 3 < numColumns) {
          result = gameboardArray[row][column] == gameboardArray[row + 1][column + 1] &&
          gameboardArray[row][column] == gameboardArray[row + 2][column + 2] &&
          gameboardArray[row][column] == gameboardArray[row + 3][column + 3];
          if(result){
            player = gameboardArray[row][column];
          }
        }
      
      // if the bottom left contains possible win
      if(row + 3 < numRows && column - 3 > -1) {
          result = gameboardArray[row][column] == gameboardArray[row + 1][column - 1] &&
          gameboardArray[row][column] == gameboardArray[row + 2][column - 2] &&
          gameboardArray[row][column] == gameboardArray[row + 3][column - 3]; 
          if(result){
            player = gameboardArray[row][column];
          }
        }
      
      // if the top left contains a possible win
      if(row - 3 > -1 && column - 3 > -1) {
          result = gameboardArray[row][column] == gameboardArray[row - 1][column - 1] &&
          gameboardArray[row][column] == gameboardArray[row - 2][column - 2] &&
          gameboardArray[row][column] == gameboardArray[row - 3][column - 3]; 
          if(result){
            player = gameboardArray[row][column];
          }
        }
      
      }

  return [result,player];
}

function turnSwitch() {

  if (player1Turn == true) {
    currentPlayerChip = "./images/dinov2.png";
    player1Turn = false;
  } else {
    currentPlayerChip = document.querySelector('img').src;
    player1Turn = true;
  }



}