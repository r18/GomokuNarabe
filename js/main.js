WIDTH = 640;
HEIGHT = 480;
X_LINES = 14;
Y_LINES = 14;
BOARD_OFFSET_X = 30;
BOARD_OFFSET_Y = 30;
BOARD_WIDTH = 400;
BOARD_HEIGHT = BOARD_WIDTH;
BOARD_UNIT = BOARD_WIDTH / X_LINES;

IS_WHITE_TURN = true;

function main(){
  init();

  window.onclick = function(e){
    var cx = Math.floor(e.clientX/BOARD_UNIT) ;
    var cy = Math.floor(e.clientY/BOARD_UNIT) ;
    setStone(cx,cy,IS_WHITE_TURN);
    IS_WHITE_TURN = !IS_WHITE_TURN;
  }
}

function init(){
  cvs = document.getElementById('cvs');
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  ctx = cvs.getContext('2d');
  initBoard();
}

function initBoard() {
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  ctx.beginPath();
  for(var i = 0; i<= Y_LINES; i++){
    ctx.moveTo(BOARD_OFFSET_X+i*BOARD_UNIT,BOARD_OFFSET_Y+0);
    ctx.lineTo(BOARD_OFFSET_X+i*BOARD_UNIT,BOARD_OFFSET_Y+BOARD_HEIGHT);
  }
  for(var i = 0; i<= Y_LINES; i++){
    ctx.moveTo(BOARD_OFFSET_X,BOARD_OFFSET_Y+i*BOARD_UNIT);
    ctx.lineTo(BOARD_OFFSET_X+BOARD_WIDTH,BOARD_OFFSET_Y+i*BOARD_UNIT);
  }
  ctx.stroke();
}

function setStone(x,y,isWhite){
  drawStone(x,y,isWhite);
}

function drawStone(x,y,isWhite) {
  ctx.beginPath();
  ctx.arc(30+BOARD_UNIT*(x-1),30+BOARD_UNIT*(y-1),10,Math.PI*2,false);
  ctx.stroke();
  if(isWhite){
    ctx.fillStyle = "white";
  } else {
    ctx.fillStyle = "black";
  }
  ctx.fill();
  ctx.closePath();
}

function getStone(){

}

function drawBoard(){

}

function check(){

}
