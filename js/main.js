WIDTH = 640;
HEIGHT = 480;
X_LINES = 13;
Y_LINES = 13;
BOARD_OFFSET_X = 30;
BOARD_OFFSET_Y = 30;
BOARD_WIDTH = 400;
BOARD_HEIGHT = BOARD_WIDTH;
BOARD_UNIT = BOARD_WIDTH / X_LINES;
IS_WHITE_TURN = true;
IS_GAME_END=false;

BOARD = [];
/*
* 1 -> WHITE
* -1 -> BLACK
*
*/

BACKUP=[];
BACKUP_COUNT=0;


function main(){
  init();

    window.onclick = function(e){
      var cx = Math.floor((e.clientX-BOARD_OFFSET_X)/BOARD_UNIT);
      var cy = Math.floor((e.clientY-BOARD_OFFSET_Y)/BOARD_UNIT);
      if (setStone(cx,cy,IS_WHITE_TURN)) {
        IS_WHITE_TURN = !IS_WHITE_TURN;
      }
    }

    window.onkeydown = function(e){
      console.log(e.keyCode);
      switch(e.keyCode){
        case 66:　 //Bをおした時一つ戻る
          back();
          break;
        case 78:　 //Nをおした時ニューゲーム
          newGame();
          break;
        default:
          break;
      }
    }
}

function init(){

  cvs = document.getElementById("cvsBoard");
  cvsBoard.width = WIDTH;
  cvsBoard.height = HEIGHT;
  ctxBoard = cvsBoard.getContext("2d");

  cvsStone = document.getElementById('cvsStone');
  cvsStone.width = WIDTH;
  cvsStone.height = HEIGHT;
  ctxStone = cvsStone.getContext('2d');
  ctxStone.shadowColor="white";
  
  ctxBoard.translate(BOARD_OFFSET_X,BOARD_OFFSET_Y);
  ctxStone.translate(BOARD_OFFSET_X,BOARD_OFFSET_Y);

  initBoard();
  
}

function initBoard() {
  ctxBoard.clearRect(0,0,WIDTH,HEIGHT);
  ctxBoard.beginPath();
  for(var i = 0; i< Y_LINES; i++){
    ctxBoard.moveTo(i*BOARD_UNIT,0);
    ctxBoard.lineTo(i*BOARD_UNIT, BOARD_HEIGHT-BOARD_UNIT);
  }
  for(var i = 0; i< X_LINES; i++){
    ctxBoard.moveTo(0,i*BOARD_UNIT);
    ctxBoard.lineTo(BOARD_WIDTH - BOARD_UNIT,i*BOARD_UNIT);
  }
  ctxBoard.stroke();

   for(var y = 0; y < Y_LINES; y++){
    var r = [];
    for(var x = 0; x < X_LINES; x++){
      r.push(0);
    }
    BOARD.push(r);
  }
 
}

function setStone(x,y,isWhite){
  console.log(x,y);
  if(!IS_GAME_END){
    if(BOARD[y][x] == 0 ){
      BOARD[y][x] = isWhite ? 1 : -1;
      drawStone(x,y,isWhite);
      check(x,y);
      backUp(x,y);
      return true;
    } else {
      console.log("there is the stone");
      return false;
    }
  }
}

function drawStone(x,y,isWhite) {
  ctxStone.beginPath();
  ctxStone.arc(BOARD_UNIT*x,BOARD_UNIT*y,10,Math.PI*2,false);
  ctxStone.stroke();
  if(isWhite){
    ctxStone.fillStyle = "white";
  } else {
    ctxStone.fillStyle = "black";
  }
  ctxStone.fill();
  ctxStone.closePath();
  
}

function check(x,y){
  checkStone(x,y,1,0);
  checkStone(x,y,0,1);
  checkStone(x,y,1,1);
  checkStone(x,y,-1,1);
}

function checkStone(x,y,stepX,stepY){
  var stoneCount = 1,
      nX = x + stepX,
      nY = y + stepY;

  while(nY != Y_LINES && BOARD[nY][nX] == BOARD[y][x]){
    nX += stepX;
    nY += stepY;
    stoneCount++;
  }

  nX = x - stepX;
  nY = y - stepY;

  while(nY != -1 && BOARD[nY][nX] == BOARD[y][x]){
    nX -= stepX;
    nY -= stepY;
    stoneCount++;
  }

  if (stoneCount>=5){
    alert("win");
    IS_GAME_END = true;
  }
}

function newGame(){
  BOARD.length = 0;
  initBoard();
  ctxStone.clearRect(-30,-30,BOARD_WIDTH,BOARD_HEIGHT)
  IS_WHITE_TURN = true;
  IS_GAME_END=false;
}
function backUp(x,y){
  var r=[];
  r.push(x,y);
  BACKUP.push(r);
  BACKUP_COUNT++;
}

function back(){
  if(BACKUP_COUNT > 0){
    BACKUP_COUNT--;
    var x = BACKUP[BACKUP_COUNT][0],
        y = BACKUP[BACKUP_COUNT][1];
    BOARD[y][x] = 0;
    BACKUP.pop();
    IS_WHITE_TURN = !IS_WHITE_TURN;
    IS_GAME_END = false;
    ctxStone.clearRect(BOARD_UNIT*(x-1/2),BOARD_UNIT*(y-1/2),BOARD_UNIT,BOARD_UNIT);
  }
}