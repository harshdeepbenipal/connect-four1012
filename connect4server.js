/*============GLOBAL VARIABLES=====================*/
var gameboardArray;    
var imgIndex;
var winner;  
var document;
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2
board(); //calls on the board function to create a array to start the game
var express = require('express');
var app = express();

/*GETS CALLED BY THE CLIENT SIDE AND CALLS TEH FUCNTIONS ADDCHIP AND WHEN PLAYERTURN  == 3*/
app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client      Received: " + JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);
    // check if the request action is generateCode
    if (z['action'] == "addChip") {
        var column = z['column'];
        var playerTurn = z['playerTurn'];
        document = z['document'];
        if(playerTurn == 3){
          column = Math.floor(Math.random()*6);
          console.log("column:"+ column);
        }
        imgIndex = addChip(column, playerTurn);
        var jsontext = JSON.stringify({
          'action': 'addChip',
          'imgIndex': imgIndex
      });
        // send the response while including the JSON text		
        res.send(jsontext);
    } 
    if(z['action'] == "checkWin"){/*WHEN CHECKWIN IS CALLED BY CLIENT SIDE THE IF STATEMENT GOES AND DOES EVERYTHING WITHIN IT*/
      console.log(gameboardArray);
      if (checkFill()){//if array is full winner is set to 3
        winner = 3;
      }else{//the array is checked, horizontally, vertically or diagnolally for any wins and sets the variable as such
        winner = 0;//stays 0 unless there is a win
        if (checkHorizontal() != 0){
          console.log("Horizontal: " + checkHorizontal());
          winner = checkHorizontal();
        } else if (checkVertical() != 0) {
          winner = checkVertical();
          console.log("Vertical: " + checkVertical());
        } 
        var i = 0;
        var j = 0;
        var flag = false
        while(i < 6 && flag == false)
        {   
          for (let j = 0; j < 7; j++) { 
            if(checkDiagonal(i, j)[0]){
              flag = true;
              winner = checkDiagonal(i, j)[1];
            }
          }
          i++;
        }
      }
      //console.log(winner);
      var jsontext = JSON.stringify({
         'action': 'checkWin',
        'winner': winner
    });
    console.log("return")
      res.send(jsontext);
    } 
    if(z['action'] == "resetGame"){
        board();//calls on the board function to reset and create a new array
    }
    if(z['action'] == "resetWinner"){
      winner = 0;//resets winner variable
    }
}).listen(3000);
console.log("Server is running!");
function addChip(column, playerTurn) {//adds a chip in the array given the turn either 1 or 2
  if (firstFreeRow(column) < 6) {
    var imgIndex = (5 - firstFreeRow(column))* 7 + 1 + parseInt(column);
    if (playerTurn == 1) {
      gameboardArray[column][firstFreeRow(column)] = 1; 
    } else {
      gameboardArray[column][firstFreeRow(column)] = 2; 
    }
  }
  return imgIndex
}
function firstFreeRow(column) {//checks if there is an empty slot
  for (let i = 0; i < 6; i++) {
    if (gameboardArray[parseInt(column)][i] == 0) {
      return i;
    }
  }
}
function checkVertical() {//check vertical win function
  var firstChip;
  var numInRow = 1;
  var lastChip;
  for (let i = 0; i < 7; i++) {     //going through each row 
    for (let j = 0; j < 6; j++) { 
      if (lastChip == gameboardArray[i][j] && gameboardArray[i][j] != 0) {
        numInRow += 1;
      } else {
        numInRow = 1;
      }
      lastChip = gameboardArray[i][j];
      if (numInRow == 4) {
        if (lastChip == 1) {
          //alert("Player 1 has won");
          return 1;
        } 
        if (lastChip == 2) {
          //alert("Player 2 has won");
          return 2;
        }
      }
    }
  }
  return 0;
}
function checkHorizontal() {//check horizontal win function
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
          //alert("Player 1 has won");
          return 1;
        }
        if (lastChip == 2) {
          //alert("Player 2 has won");
          return 2;
        }
      }
    }
  }
  return 0;
}
function checkDiagonal(row, column) {//check diagonal win function
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
function board(){//creates a new array full of 0, replacing the previous gameboardArray
  gameboardArray = []; 
  for(let i = 0; i < 7; i++) {
    gameboardArray[i] = new Array(6);
    for(let j = 0; j < 6; j++) {
      gameboardArray[i][j] = 0;
    }
  }     
}
function checkFill(){//Checks and returns true if the board/array is full, else false
  var filled = 0;
  for (let i = 0; i<gameboardArray.length;i++){
    if (gameboardArray[i][5] != 0){//checks if the top row of the board is full if so filled increases
      filled++;
    }
  }
  if (filled == 7){
    return true;
  }else{
    return false;
  }
}