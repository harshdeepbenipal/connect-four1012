var gameboardArray = new Array[7][6];
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2

function playButton() {
  $("#startButton").css({'visibility' : 'hidden'});
  $("#box").css({'visibility' : 'hidden'});
}
function help(){
  alert("Instructions...");
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
}


function addChip(playernum, column) {
  if (firstFreeRow(column) > 6) {
    gameboardArray[column][firstFreeRow(column)] = playernum; 
  }
}

function firstFreeRow(column) {
  for (i = 0; i < 6; i++) {
    if (gameboardArray[column][i] == 0) {
      return i;
    }
  }
}

function checkHorizontal() {
  var firstChip;
  var numInRow = 1;
  var lastChip;
  for (i = 0; i < 6; i++) {     //going through each row 
    for (j = 0; j < 7; j++) { 

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

function checkVertical() {
  var firstChip;
  var numInRow = 1;
  var lastChip;
  for (j = 0; j < 7; j++) {     //going through each column 
    for (i = 0; i < 6; i++) { 
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

function checkDiagonalDownRight() {
  var firstChip;
  var numInRow = 1;
  var lastChip;


  j = 0;
  for (i = 4; i > 0; i--) {     //going through each row 
      
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