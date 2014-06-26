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
        case 66:　  //Bをおした時一つ戻る
          if (BACKUP_COUNT !=0)back();
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
  cvs = document.getElementById('cvs');
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  ctx = cvs.getContext('2d');
  initBoard();
  boardArray();
}

function initBoard() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.beginPath();
  for(var i = 0; i< Y_LINES; i++){
    ctx.moveTo(BOARD_OFFSET_X+i*BOARD_UNIT,BOARD_OFFSET_Y);
    ctx.lineTo(BOARD_OFFSET_X+i*BOARD_UNIT,BOARD_OFFSET_Y+BOARD_HEIGHT-BOARD_UNIT);
  }
  for(var i = 0; i< X_LINES; i++){
    ctx.moveTo(BOARD_OFFSET_X,BOARD_OFFSET_Y+i*BOARD_UNIT);
    ctx.lineTo(BOARD_OFFSET_X+BOARD_WIDTH-BOARD_UNIT,BOARD_OFFSET_Y+i*BOARD_UNIT);
  }
  ctx.stroke();
}
function boardArray(){
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
  ctx.beginPath();
  ctx.arc(BOARD_OFFSET_X+BOARD_UNIT*x,BOARD_OFFSET_Y+BOARD_UNIT*y,10,Math.PI*2,false);
  ctx.stroke();
  if(isWhite){
    ctx.fillStyle = "white";
  } else {
    ctx.fillStyle = "black";
  }
  ctx.fill();
  ctx.closePath();
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
  boardArray();
}
function backUp(x,y){
  r=[];
  r.push(x,y);
  BACKUP.push(r);
  BACKUP_COUNT++
}

function back(){
  BACKUP_COUNT--;
  var x = BACKUP[BACKUP_COUNT][0],
      y = BACKUP[BACKUP_COUNT][1];
  BOARD[y][x] = 0;
  BACKUP.pop();
  IS_WHITE_TURN = !IS_WHITE_TURN;
  initBoard();

 for(var i =0; i<BACKUP_COUNT; i++){
    var x = BACKUP[i][0];
    var y = BACKUP[i][1];

    switch(BOARD[y][x]){
      case 1:
        drawStone(x,y,true);
        break;
      case -1:
        drawStone(x,y,false);
        break;
      default:
        break;
    }
  } 
}
