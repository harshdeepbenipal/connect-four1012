
var gameboardArray = []; //2D ARRAY FOR COLUMNS AND ROW CHECK
    for(let i = 0; i < 7; i++) {
        gameboardArray[i] = new Array(6);
        for(let j = 0; j < 6; j++) {
          gameboardArray[i][j] = 0;
      }
    }     
    
var player1Turn = true; //VARIABLE FOR CHECKING PLAYERTURN
var img = 0; 
var currentPlayerChip; // USED TO USER IMAGE FOR IMAGE SELECT
var twoPlayer;//boolean for game mode
var nextPlayer;//Image select if two players
var userImageSrc;
var img1 = false;
var img2 = false;
var firstPlayer;
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2
playernum  = 1;
amount = 1;
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
  var element = document.getElementById("title1");
  if (a){
    amount++;
    twoPlayer = true;
    element.innerHTML = "DESIGN YOUR CHIPS PLAYER 1";
  }else{
    twoPlayer = false;
    element.innerHTML = "DESIGN YOUR CHIPS";
  }
  designChip(); //CALLS THE DESIGNCHIP FUNCTION
}
function designChip(){ //DESIGN CHIP FUNCTIONALLIYU
  $("#imgselect1").css({'display' : 'block'});
  $("#go").css({'display' : 'block'});
  $("#radioButtons1").css({'display' : 'block'});
}

function gameScreen(){ 
  $("#imgselect1").css({'display' : 'none'});//WHEN LETS GO BUTTON IS CLICKED STARTS UP THE GAMESCREEN
  var element = document.getElementById("title1");
  $("#radioButtons1").css({'display' : 'none'});
  if (amount==2){
    $("#imgselect2").css({'display' : 'block'});
    $("#radioButtons2").css({'display' : 'block'});
    element.innerHTML = "DESIGN YOUR CHIPS PLAYER 2";
    amount++;
  }else{
    $("#radioButtons2").css({'display' : 'none'});
    $("#imgselect2").css({'display' : 'none'});
    $("#go").css({'display' : 'none'});
    $("#board1").css({'display' : 'block'});
    $("#selection").css({'visibility' : 'visible'});
    element.innerHTML = "CONNECT 4";
    document.getElementById("title1").style.fontSize = "33px";
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
}
function previewFile() { //PREVIEW IMAGE AND IMAGE SELECTOR AND STORE IMAGE FOR THE PLAYER
  const preview1 = document.querySelector('img');
  const file1 = document.querySelector('input.pFile1[type=file]').files[0];
  const reader1 = new FileReader();
  reader1.addEventListener("load", function () {
    // convert image file to base64 string
    preview1.src = reader1.result;

  }, false);
  if (file1) {
    reader1.readAsDataURL(file1);
  }
  currentPlayerChip = document.querySelector('img').src;
  if(twoPlayer){
    const preview2 = document.querySelector('img'); //The preview doesn't work
    const file2 = document.querySelector('input.pFile2[type=file]').files[0];
    const reader2 = new FileReader();
    reader2.addEventListener("load", function () {
    // convert image file to base64 string
    preview2.src = reader2.result;

  }, false);
  if (file2) {
    reader2.readAsDataURL(file2);
  }
  nextPlayer = document.querySelector('img').src;//This works
  }
}
function submit(k){
  if (img==0){
    img1 = true;
    firstPlayer = "./images/"+k+".png";
  }
  img++;
  if (twoPlayer && img==1){
    img2 = true;
    nextPlayer = "./images/"+k+".png";
  }
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
  if(twoPlayer){
    if(img1 && img2){//Doesn't work, both radio buttons
      if (player1Turn){
        currentPlayerChip = firstPlayer;
      } else{
        currentPlayerChip = nextPlayer;
      }
    }else if(img1 && !img2){//Doesn't work, first radio button second insert image
      if (player1Turn){
        currentPlayerChip = firstPlayer;
      } else{
        currentPlayerChip = document.querySelector('img').src;
      }
    } else if (!img1 && !img2){//works both inserted
      if(!player1Turn){
        currentPlayerChip = document.querySelector('img').src;
      }
      else{
        currentPlayerChip = nextPlayer;
      }
    } else if (!img1 && img2){//Doesn't work, first insert image and second radio button
      if(player1Turn){
        currentPlayerChip = document.querySelector('img').src;
      }
      else{
        currentPlayerChip = nextPlayer;
      }
    }
  }else{
    if (player1Turn && !img1) {//works, computer and insert
      currentPlayerChip = document.querySelector('img').src;
    } else if (player1Turn && img1){//works, computer and radio buttons
      currentPlayerChip = firstPlayer;
    }
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
      if(checkDiagonal(i, j)[0]){
        alert(checkDiagonal(i, j)[1]+"Player is the winner");
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

function checkDiagonal(row, column) {
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
  if(!twoPlayer){
    if (player1Turn) {
      currentPlayerChip = "./images/dinov2.png";
      player1Turn = false;
    }else if (!player1Turn && !img1){
      currentPlayerChip = document.querySelector('img').src;
      player1Turn = true;
    }else{
      currentPlayerChip = firstPlayer;
      player1Turn = true;
    }
  }else{
    if(img1 && img2){
      if (player1Turn){
        currentPlayerChip = firstPlayer;
        player1Turn = false;
      } else{
        currentPlayerChip = nextPlayer;
        player1Turn = true;
      }
    }else if ((!img1&&!img2)||(!img1 && img2)){
      if (player1Turn) {
        currentPlayerChip = document.querySelector('img').src;
        player1Turn = false;
      }else {
        currentPlayerChip = nextPlayer;
        player1Turn = true;
      }
    } else if(img1 && !img2){
      if (player1Turn){
        currentPlayerChip = firstPlayer;
        player1Turn = false;
      } else{
        currentPlayerChip = document.querySelector('img').src;
        player1Turn = true;
      }
    }
  }
}