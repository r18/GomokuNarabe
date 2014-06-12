WIDTH = 640;
HEIGHT = 480;
X_LINES = 8;
Y_LINES = 8;
BOARD_OFFSET_X = 30;
BOARD_OFFSET_Y = 30;
BOARD_WIDTH = 320;
BOARD_HEIGHT = BOARD_WIDTH;
BOARD_UNIT = BOARD_WIDTH / X_LINES;
Color_Flg=true; //trueなら黒,falseなら白
Win_Flg=true;
Stone_Color=[];
Stone_Num=0;  

function main(){
  console.log("start");
  init();
}

function init(){
    cvs = document.getElementById('cvs');
    cvs.width = WIDTH;
    cvs.height = HEIGHT;
    ctx = cvs.getContext('2d');
    
    initBoard();
    
    window.onclick = function(e){
      if(e.clientX%BOARD_UNIT<=BOARD_UNIT/2){
        var cx = Math.floor(e.clientX/BOARD_UNIT);
      }else{
        var cx = Math.floor(e.clientX/BOARD_UNIT)+1;
      }

      if (e.clientY%BOARD_UNIT<=BOARD_UNIT/2){
        var cy = Math.floor(e.clientY/BOARD_UNIT);
      }else{
        var cy = Math.floor(e.clientY/BOARD_UNIT)+1;
      }
      setStone(cx,cy,Color_Flg);
    } 
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

function setStone(x,y,dir){
  if(Win_Flg){
    if(x<=9 && y<=9 && Stone_Color[10*x+y]!="Black" && Stone_Color[10*x+y]!="White"){
      if(dir){
          ctx.beginPath();
          ctx.arc(30+BOARD_UNIT*(x-1),30+BOARD_UNIT*(y-1),10,Math.PI*2,false);
          ctx.closePath();
          ctx.fillStyle="black";
          ctx.fill();
          Color_Flg=false;
          Stone_Color[10*x+y]="Black";
        }

      else{
        ctx.beginPath();
        ctx.arc(30+BOARD_UNIT*(x-1),30+BOARD_UNIT*(y-1),10,Math.PI*2,false);
        ctx.closePath();
        ctx.fillStyle="white";
        ctx.fill();
        Color_Flg=true;
        Stone_Color[10*x+y]="White";
      }
      Check(x,y);
    }
  }
}
    
function Check(x,y){
  Check_Horizontal(y);
  Check_Vertical(x);
  Check_Diagonal(x,y);
}

function Check_Horizontal(y){
 for(var i=1;i<=9;i++){
    Check_Stone_Num(i,y);
  }
  Stone_Num=0;
}

function Check_Vertical(x){
  for(var i=1;i<=9;i++){
    Check_Stone_Num(x,i);
  }
  Stone_Num=0;
}

function Check_Diagonal(x,y){
  for(var i=1;i<=9;i++){
    Check_Stone_Num(i,x+y-i);
  }
  Stone_Num=0;

  for(var i=1;i<=9;i++){
    Check_Stone_Num(i,y-x+i);
  }
  Stone_Num=0;
}

function Check_Stone_Num(x,y){
  if(!Color_Flg){
    if(Stone_Color[10*x+y]=="Black"){
      Stone_Num++;
    }
    else{
      Stone_Num=0;
    }
  }
  else{
    if(Stone_Color[10*x+y]=="White"){
      Stone_Num++;
    }
    else{
      Stone_Num=0;
    }
  }
  if(Stone_Num==5){
    console.log(Stone_Color[10*x+y]+" WIN")
    Win_Flg=false;
  }
}

