WIDTH = 640;
HEIGHT = 480;

function main(){
  console.log("start");
  init();
}

function init(){
  cvs = document.getElementById('cvs');
  cvs.width = WIDTH;
  cvs.height = HEIGHT;
  ctx = cvs.getContext('2d');
  ctx.fillRect(40,40,500,300);
}

