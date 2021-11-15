var gameboardArray = [7][6];
//from left to right, bottom to top
//empty = 0, p1 = 1, p2 = 2

function playButton() {
  console.log("working");
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