var gameboardArray;    
var imgIndex;
var winner;  
var document;
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2
board(); 
var express = require('express');
var app = express();


app.post('/post', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    console.log("New express client      Received: " + JSON.parse(req.query['data']));
    var z = JSON.parse(req.query['data']);
    // check if the request action is generateCode
    if (z['action'] == "addChip") {
        var column = z['column'];
        var playerTurn = z['playerTurn'];
        document = z['document'];
        console.log(playerTurn);
        if(playerTurn == 3){
          column = Math.floor(Math.random()*6);
        }
        imgIndex = addChip(column, playerTurn);
        var jsontext = JSON.stringify({
          'action': 'addChip',
          'imgIndex': imgIndex
      });
        // send the response while including the JSON text		
        /*TODO 2 ... send the response including the JSON text*/
        res.send(jsontext);
    } 
    if(z['action'] == "checkWin"){
      winner = 0;
      console.log(gameboardArray);
      //console.log("Horizontal: " + checkHorizontal());
      //console.log("Vertical: " + checkVertical());
      if (checkHorizontal() != 0){
        winner = checkHorizontal();
      } else if (checkVertical() != 0) {
        winner = checkVertical();
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
      //console.log(winner);
      var jsontext = JSON.stringify({
         'action': 'checkWin',
        'winner': winner
    });
    console.log("return")
      res.send(jsontext);
    } 
    if(z['action'] == "resetGame"){
        board();
    }
    if(z['action'] == "resetWinner"){
      winner = 0;
    }
}).listen(3000);
console.log("Server is running!");
function addChip(column, playerTurn) {
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
function board(){
  gameboardArray = []; //2D ARRAY FOR COLUMNS AND ROW CHECK
  for(let i = 0; i < 7; i++) {
    gameboardArray[i] = new Array(6);
    for(let j = 0; j < 6; j++) {
      gameboardArray[i][j] = 0;
    }
  }     
}