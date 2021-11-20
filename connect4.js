//var gameboardArray = new Array[7][6];
//var imageArray = new Array[7][6];
var gameboardArray = [];
    for(let i = 0; i < 7; i++) {
        gameboardArray[i] = new Array(6);
        for(let j = 0; j < 6; j++) {
          gameboardArray[i][j] = 0;
      }
    }     
    
var player1Turn = true;
var currentPlayerChip;
var userImageSrc;
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2
playernum  = 1;
function playButton() {
  $("#startButton").css({'visibility' : 'hidden'});
  //$("#box").css({'visibility' : 'hidden'});
  var element = document.getElementById("title1");
  element.innerHTML = "CHOOSE A GAME MODE";
  mode(1,'hidden');
}
function help(){
  alert("Instructions...");
}
function mode(a,b){
  if(a==1){
    $("#gameMode1").removeAttr(b);
    $("#gameMode2").removeAttr(b);
  }
  else if(a==2){
    $("#gameMode1").attr(b,true);
    $("#gameMode2").attr(b,true);
  }
}
function gameMode(a){
  mode(2,'hidden');
  if (a==true){
    //alert("Player1 vs Player2");
  }else{
    //alert("Player vs Computer");
  }
  var element = document.getElementById("title1");
  element.innerHTML = "DESIGN YOUR CHIP";
  designChip();
}
function designChip(){
  $("#imgselect").removeAttr('hidden');
  //var e = document.getElementById("file");
  //e.type='visible';
}

function gameScreen(){
  $("#imageselector").hide();
  $("#img").hide();
  $("#go").hide();
  $("#board1").css({'visibility' : 'visible'});
  $("#selection").css({'visibility' : 'visible'});


  for (var i = 1; i <= 42; i++){
    var newImg = document.createElement("img");
    $(newImg).attr("id", "chipimg" + i);
    $(newImg).attr("class", "chipimgclass")
    //add a dummy image
    $(newImg).attr("src", "./images/white.jpg");
    $("#board1").append(newImg);
}

}
function previewFile() {
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
  console.log(checkHorizontal());
  console.log(checkVertical());

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
          return lastChip + "1 won";

        } 
        if (lastChip == 2) {
          return lastChip + "2 won";

        }
      }
    }
  }
  return "no win h";
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
          return lastChip + "1 won";

        }
        if (lastChip == 2) {
          return lastChip + "2 won";

        }
      }
    }
  }
  return "no win v";

}

function checkDiagonalDownRight() {
  var firstChip;
  var numInRow = 1;
  var lastChip;


  var j = 0;
  for (let i = 4; i > 0; i--) {     //going through each row 
      
    while ( j < 7) {
    j = j+1

      if (lastChip == gameboardArray[i][j] && gameboardArray[i][j] != 0) {
        numInRow += 1;
      } else {
        numInRow = 1;
      }
      lastChip = gameboardArray[i][j];

      if (numInRow == 4) {
        return lastChip;
      }
    }
  }
  
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