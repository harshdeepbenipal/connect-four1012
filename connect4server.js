var gameboardArray = []; //2D ARRAY FOR COLUMNS AND ROW CHECK
    for(let i = 0; i < 7; i++) {
        gameboardArray[i] = new Array(6);
        for(let j = 0; j < 6; j++) {
          gameboardArray[i][j] = 0;
      }
    }     
    
var player1Turn = true; //VARIABLE FOR CHECKING PLAYERTURN
var img = 0; 
var choice;
var currentPlayerChip; // USED TO USER IMAGE FOR IMAGE SELECT
var twoPlayer;//boolean for game mode
var nextPlayer;//Image select if two players
var userImageSrc;
var img1 = false;
var img2 = false;
var firstPlayer;
var document;
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2
playernum  = 1;
amount = 1;
var express = require('express');
var app = express();
var jsdom = require('jsdom');
var dom = new JSDOM(html);
var idCounter = 0;

app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client");
    console.log("Received: ");
    console.log(JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);

    // check if the request action is generateCode
    console.log(z['action']);
    if (z['action'] == "addChip") {
        var jsontext = JSON.stringify({
            'action': 'addChip',
            'msg': 'New code generated!!!'
        });
        console.log(jsontext);
        var column = z['column'];
        tempDocument = z['document'];
        const { window } = new JSDOM(tempDocument);
        const { document } = (new JSDOM('')).window;
        console.log(document);
        addChip(column);
        console.log("addChip");
        // send the response while including the JSON text		
        /*TODO 2 ... send the response including the JSON text*/

        res.send(jsontext);
    } else if (z['action'] == "evaluate") {
        //evaluate the attempt_code for this user
        var [num_match, num_containing, num_not_in]
            = evaluate(codes[z['name']], z['attempt_code']);

        var answer = [];
        if ((num_match == code_length) || (num_attempts == z["current_attempt_id"]))
            answer = codes[z['name']];

        var win = false;
        if (num_match == code_length) win = true;

        /* the response will have 6 parts: request action, whether won or not, number of exact matches,
        number of colors that are correct, number of wrong colors, and the answer if the game ended */
        var jsontext = JSON.stringify({
            /*TODO 3 ... type of action */
            'action' : 'evaluate',
            /*TODO 4 ... won or not */
            'win' : win,
            /*TODO 5 ... number of match*/
            'num_match' : num_match,
            /*TODO 6 ... number of correct colors*/
            'num_containing' : num_containing,
            /*TODO 7 ... number of wrong colors*/
            'num_not_in' : num_not_in,
            /*TODO 8 ... the answer code when the game ends*/
            'code' : answer,
        });
        console.log(jsontext);
        res.send(jsontext);
    } else {
        res.send(JSON.stringify({ 'msg': 'error!!!' }));
    }
}).listen(3000);
console.log("Server is running!");
function submit(k){
  choice = k;
  if (img==0){
    img1 = true;
    firstPlayer = "./images/"+k+".png";
  }
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