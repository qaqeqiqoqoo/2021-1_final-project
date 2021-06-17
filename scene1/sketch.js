let deer;
let words = false;
let saying;

// function preload(){
//     soundFormats('mp3');
//     saying = loadSound('voice');
// }
function setup() {
  createCanvas(windowWidth, windowHeight);

  deer = createSprite(width / 2, height /2);
  deer.addAnimation('normal', 'Layer 2.png');
  deer.addAnimation('stretch', 'Layer 3.png','Layer 4.png', 'Layer 5.png');

 
  deer.onMouseOver = function() {
    this.changeAnimation('stretch');
    words = true;
  }

  deer.onMouseOut = function() {
    this.changeAnimation('normal');
    words = false;
  }

  

}

function draw() {
  background(255, 255, 255);
  drawSprites();
  if(words){
    textSize(50);
    text('안녕 난 가슴사슴토끼야.', width / 3, 100);//타이핑되는 효과.....
    // saying.play();//콜백으로 넣어야 소리가나나? 
  }
  
}
