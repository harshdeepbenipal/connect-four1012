var player1Turn = true; //VARIABLE FOR CHECKING PLAYERTURN
var img = 0; 
var choice;
var winner = 0;
var currentPlayerChip; // USED TO USER IMAGE FOR IMAGE SELECT
var twoPlayer;//boolean for game mode
var nextPlayer;//Image select if two players
var userImageSrc;
var img1 = false;
var img2 = false;
var firstPlayer;
var imgIndex = 0;
var url = "http://localhost:3000/post";
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2
var playernum  = 1;
var amount = 1;
function playButton() { //TAKES THE USER TO THE SELECT GAMEMODE SCREEN
  $("#startButton").css({'display' : 'none'});
  var element = document.getElementById("title1");
  element.innerHTML = "CHOOSE A GAME MODE";
  mode('block');
}
function help(){//INSTRUCTION ARE DISPLAYED INSIDE AN ALERT WHEN CLICKED
    alert("INSTRUCTIONS\n\nStart off by choosing a game mode of multiplayer or against the computer, which directs you to design your chip(s).In order to design your chips choose one of the options provided or input an image to set as a chip. The objective is to click on the columns of the board and connect 4 chips either vertically, horizontally or diagonally.");
}
function mode(b){ //YO ADD COMMENTS FOR THESE TWO
  $("#gameMode1").css({'display' : b});
  $("#gameMode2").css({'display': b});
}
function gameMode(a){
  mode('none');
  var element = document.getElementById("title1");
  $('#go').attr("disabled",true);
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
  $("#radioButtons").css({'display' : 'block'});
}
function gameScreen(){ 
  $("#imgselect1").css({'display' : 'none'});//WHEN LETS GO BUTTON IS CLICKED STARTS UP THE GAMESCREEN
  var element = document.getElementById("title1");
  if (amount==2){
    $('input[name="colour"]').prop('checked', false);
    $('#go').attr("disabled",true);
    img++;
    $('#'+choice).attr("disabled",true);
    $("#imgselect2").css({'display' : 'block'});
    element.innerHTML = "DESIGN YOUR CHIPS PLAYER 2";
    amount++;
  }else{
    $("#radioButtons").css({'display' : 'none'});
    $("#imgselect2").css({'display' : 'none'});
    $("#go").css({'display' : 'none'});
    $("#board1").css({'display' : 'block'});
    $("#selection").css({'visibility' : 'visible'});
    element.innerHTML = "CONNECT 4";
    document.getElementById("title1").style.fontSize = "33px";
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
  $('#go').attr("disabled",false);
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
  $('#go').attr("disabled",false);
  }
}
function submit(k){
  choice = k;
  if (img==0){
    img1 = true;
    firstPlayer = "./images/"+k+".png";
    $('#go').attr("disabled",false);
  }
  if (twoPlayer && img==1){
    img2 = true;
    nextPlayer = "./images/"+k+".png";
    $('#go').attr("disabled",false);
  }
}
function addChip(column) {
  imgIndex = 0;
  if (player1Turn) {
    playerTurn = 1;
  } else{
    playerTurn = 2;
  }
  if (!twoPlayer && playerTurn == 2) {
    playerTurn = 3;
  }
  $.post(
    url+'?data='+JSON.stringify({
      'column': column,
      'action': 'addChip',
      'playerTurn' : playerTurn,
      'document': document,
      
    }),
    response);
  }
function checkWin() {
  $.post(
    url+'?data='+JSON.stringify({
      'action': 'checkWin',
    }),
    response);
}
function resetBoard() {
  $.post(
    url+'?data='+JSON.stringify({
      'action': 'resetGame',
    }),
    response);
    for (let k = 1; k<=42;k++){
        document.getElementById("chipimg"+k).setAttribute('src',"./images/white.jpg"); 
    } 
    resetV();
}
function resetGame(){
    document.location.reload();
    resetV();
    resetBoard();
}
function iconChange(indexOfImg) {
  if(twoPlayer){
    if(img1 && img2){//Both radio buttons
      if (player1Turn){
        currentPlayerChip = firstPlayer;
      } else{
        currentPlayerChip = nextPlayer;
      }
    }else if(img1 && !img2){//First radio button second insert image
      if (player1Turn){
        currentPlayerChip = firstPlayer;
      } else{
        currentPlayerChip = document.querySelector('img').src;
      }
    } else if (!img1 && !img2){//Both inserted
      if(!player1Turn){
        currentPlayerChip = document.querySelector('img').src;
      }
      else{
        currentPlayerChip = nextPlayer;
      }
    } else if (!img1 && img2){//First insert image and second radio button

      if(player1Turn){
        currentPlayerChip = document.querySelector('img').src;
      }
      else{
        currentPlayerChip = nextPlayer;
      }
    }
  }else{
    if (player1Turn && !img1) {//Computer and insert
      currentPlayerChip = document.querySelector('img').src;
    } else if (player1Turn && img1){//Computer and radio buttons
      currentPlayerChip = firstPlayer;
    }
  }
  document.getElementById("chipimg" + indexOfImg).setAttribute('src', currentPlayerChip);
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
function response(data,status){
  var response = JSON.parse(data);
    if (response['action'] == 'addChip' || response['action'] == 'computerTurn'){
      imgIndex = parseInt(response['imgIndex']);
      var won = false;
      iconChange(imgIndex);
      turnSwitch();
      checkWin();
      console.log(twoPlayer);
      console.log(playerTurn);
      if (response['action'] == "addChip") {
        $.post(
          url+'?data='+JSON.stringify({
            'action': 'computerTurn',
          }),
          response);
        }
      
    }
    if (response['action'] == 'checkWin'){
      winner = parseInt(response['winner']);
      console.log(winner);
      if (winner != 0) {
        console.log("flag");
        won = true;
        resetBoard();
        if (winner == 1) {
            var confirmButton = confirm("P1 is the Winner, would you like to play again?")
            //$(".columnclass").css({'visibility' : 'hidden'});
        } else if (winner == 2) {
            if (twoPlayer){
                confirmButton = confirm("P2 is the Winner, would you like to play again?")
            }else{
                confirmButton = confirm("Computer is the Winner, would you like to play again?")
            }
         //$(".columnclass").css({'visibility' : 'hidden'});
        }
      if(!confirmButton){
        resetGame();
      }
      playerTurn = 1;
      }
    }
}
function resetV(){//resets the variables needed to reset Game and Board
    $(".columnclass").css({'visibility' : 'visible'});
    player1Turn = true; 
    $.post(
        url+'?data='+JSON.stringify({
          'action': 'resetWinner',
        }),
        response);
    imgIndex = 0;
}