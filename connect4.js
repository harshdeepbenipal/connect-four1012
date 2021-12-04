var player1Turn = true; //VARIABLE FOR CHECKING PLAYERTURN
var img = 0; 
var choice;
var winner;
var currentPlayerChip; // USED TO USER IMAGE FOR IMAGE SELECT
var twoPlayer;//boolean for game mode
var nextPlayer;//Image select if two players
var userImageSrc;
var img1 = false;
var img2 = false;
var won = false;
var firstPlayer;
var imgIndex = 0;
var playAgain = false;
var url = "http://localhost:3000/post";
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {//Supposed to reload variables if the page is refreshed
 resetV();
}
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
  alert("INSTRUCTIONS\n- Start off by choosing a game mode of multiplayer or against the computer, which directs you to design your chip(s).\n- Next buttons have been disabled till the chip color/picture has been selected. If the player vs player game mode is selected both players are to design their respective chips with the color the former chose disabled. \n- The objective is to click on the columns of the board and connect 4 chips either vertically, horizontally, or diagonally. \n- After a win, the player is opted to choose to either play again or are redirected to the home page.\n- If the play again the option is selected the game mode remains the same along with the selected image/color.");}
function mode(b){//Sets diplay of gamemodes with the parameter, either none or block depending on when the function is called
  $("#gameMode1").css({'display' : b});
  $("#gameMode2").css({'display': b});
}
function gameMode(a){//Chosen game mode dictates what the page will display
  mode('none');
  var element = document.getElementById("title1");//sets element the text of title
  $('#go').attr("disabled",true);//disables the next button till the chips are designed
  if (a){//player 1 vs player 2
    amount++;
    twoPlayer = true;
    element.innerHTML = "DESIGN YOUR CHIPS PLAYER 1";
  }else{//player vs computer
    twoPlayer = false;
    element.innerHTML = "DESIGN YOUR CHIPS";
  }
  designChip(); //CALLS THE DESIGNCHIP FUNCTION
}
function designChip(){ //DESIGN CHIP FUNCTIONALLIY
  $("#imgselect1").css({'display' : 'block'});
  $("#go").css({'display' : 'block'});
  $("#radioButtons").css({'display' : 'block'});
}
function gameScreen(){ 
  $("#imgselect1").css({'display' : 'none'});//WHEN LETS GO BUTTON IS CLICKED STARTS UP THE GAMESCREEN
  var element = document.getElementById("title1");
  if (amount==2){//if player1 vs player2 till amount is 2
    $('input[name="colour"]').prop('checked', false);//unchecks the radiobuttons
    $('#go').attr("disabled",true);//button is diasabled again
    img++;
    $('#'+choice).attr("disabled",true);//disables specific color if former player selects it
    $("#imgselect2").css({'display' : 'block'});
    element.innerHTML = "DESIGN YOUR CHIPS PLAYER 2";
    amount++;
  }else{//if player vs computer, or after both players design chip
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
  if(twoPlayer){//if player 1 vs player 2, selects image for player 2
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
  $('#go').attr("disabled",false);//button to continue no longer disabled, and continues to next page
  }
}
function submit(k){//Called on when radio button is clicked, the parameter the colour name
  choice = k;//to disable the colour for next player
  if (img==0){
    img1 = true;
    firstPlayer = "./images/"+k+".png";//sets chip of first player as the colour in parameter
    $('#go').attr("disabled",false);
  }
  if (twoPlayer && img==1){
    img2 = true;
    nextPlayer = "./images/"+k+".png";//sets chip of second player as the colour in parameter
    $('#go').attr("disabled",false);
  }
}
function addChip(column) {//Adds a chip in the selected column given in the parameter
  imgIndex = 0;
  if (player1Turn) {
    playerTurn = 1;
  } else{
    playerTurn = 2;
  }
  if (!twoPlayer && playerTurn == 2) {
    playerTurn = 3;
  } else {
    numPlayers = 1;
  }
  $.post(
    url+'?data='+JSON.stringify({
      'column': column,
      'action': 'addChip',
      'playerTurn' : playerTurn,
      'document': document,
      'twoplayers' : numPlayers
    }),
    response);
  }
function checkWin() {//checks for win from server side
  $.post(
    url+'?data='+JSON.stringify({
      'action': 'checkWin',
    }),
    response);
}
function resetBoard() {//Clears board and resets variables (Excluding chip choice and game mode) - PLAY AGAIN
  $.post(
    url+'?data='+JSON.stringify({
      'action': 'resetGame',
    }),
    response);
    for (let k = 1; k<=42;k++){//Clears board visually replacing all chips with the default colour white
        document.getElementById("chipimg"+k).setAttribute('src',"./images/white.jpg"); 
    } 
    resetV();//Calls the function to reset variables
}
function resetGame(){//Clears board and resets variables (Including chip choice and game mode) - GAME OVER AND HOME
    document.location.reload();//reloads the document clearing the board visually
    resetBoard();
}
function iconChange(indexOfImg) {//sets the chip as the option chosen when designing
  if(twoPlayer){
    if(img1 && img2){//Both radio buttons
      if (player1Turn){
        currentPlayerChip = firstPlayer;
      } else{
        currentPlayerChip = nextPlayer;
      }
    }else if(img1 && !img2){//First radio button, second insert image
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
function turnSwitch() {//Switches between turns and chips
  if(!twoPlayer){//if gamemode is player vs computer
    if (player1Turn) {
      currentPlayerChip = "./images/dinov2.png";
      player1Turn = false;
    }else if (!player1Turn && !img1){//
      currentPlayerChip = document.querySelector('img').src;
      player1Turn = true;
    }else{
      currentPlayerChip = firstPlayer;
      player1Turn = true;
    }
  }else{//player 1 vs player 2
    if(img1 && img2){//both chips are chosen from radiobuttons
      if (player1Turn){
        currentPlayerChip = firstPlayer;
        player1Turn = false;
      } else{
        currentPlayerChip = nextPlayer;
        player1Turn = true;
      }
    }else if ((!img1&&!img2)||(!img1 && img2)){//either both chips are chosen from radiobuttons or only player 2 while player 1 inserted image
      if (player1Turn) {
        currentPlayerChip = document.querySelector('img').src;
        player1Turn = false;
      }else {
        currentPlayerChip = nextPlayer;
        player1Turn = true;
      }
    } else if(img1 && !img2){//player 1 radiobutton and player 2 inserts image
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
  console.log(response['action']);
    if (response['action'] == 'addChip'){
      imgIndex = parseInt(response['imgIndex']);
      won = false;
      iconChange(imgIndex);
      turnSwitch();
      checkWin();
      setTimeout(function(){
        if (!twoPlayer && playerTurn == 1 && winner == 0 && !won) {
          console.log("computer");
          addChip();
      }
   },75);
    }
    if (response['action'] == 'checkWin'){
      winner = parseInt(response['winner']);
      console.log(winner);
      if (winner != 0 && !playAgain) {
        setTimeout(function(){
        won = true;
        resetBoard();
        if (winner == 1) {//checks value of winner and creates a confirm for each end
          if (twoPlayer){//if winner is 1 and the game mode was player1 vs player2
            var confirmButton = confirm("P1 is the Winner, would you like to play one more time?")
        }else{//game mode computer vs player
            confirmButton = confirm("You are the Winner, would you like to play one more time?")
        }
        } else if (winner == 2) {
            if (twoPlayer){//if winner is 2 and the game mode was player1 vs player2
                confirmButton = confirm("P2 is the Winner, would you like to play one more time?")
            }else{//game mode computer vs player
                confirmButton = confirm("Computer is the Winner, would you like to play one more time?")
            }
        }else if (winner == 3){//winner was 3, as in the board was full so a draw
          confirmButton = confirm("It's a DRAW, would you like to play one more time?")
        }
        if (confirmButton) {//confirm button is true, so play again
            console.log("confirmed");
            resetBoard();
            playAgain = true;
          }else if (!confirmButton) {//false, resets he game and redirects to the home page
            resetGame();
          }
        },150);
      }else{//if game was played again once already
        if (winner == 1) {//alerts winner given the winner variable and game mode, which then redirects you to the home page resetting the whole game
          if (twoPlayer){
            setTimeout(function(){
            alert("P1 is the Winner, let's head to the home page!");
            resetGame();
          },150);
        }else{
          setTimeout(function(){
          alert("You are the Winner, let's head to the home page!");
          resetGame();
        },150);
        }
        } else if (winner == 2) {
            if (twoPlayer){
              setTimeout(function(){
              alert("P2 is the Winner, let's head to the home page!");
              resetGame();
            },150);
            }else{
              setTimeout(function(){
              alert("Computer is the Winner, let's head to the home page!");
              resetGame();
            },150);
            }
        }else if (winner == 3){
          setTimeout(function(){
          alert("It's a DRAW, let's head to the home page!")
          resetGame();
        },150);
        }
      }
    }
    playerTurn = 1;
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