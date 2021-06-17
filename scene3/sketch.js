let video;
let poseNet;
let pose;
let fart;
let draggedSprite;
let words = false;



function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, this.modelLoaded);
    poseNet.on('pose',this.gotPoses);

    fart = createSprite(width / 2, 90);
    fart.addAnimation('normal', 'Layer 6.png');
    fart.addAnimation('fart','Layer 6.png','Layer 7.png','Layer 8.png');

    fart.onMouseOver = function() {
        this.changeAnimation('normal');
        words = true;
    }

    fart.onMousePressed = function() {
        this.changeAnimation('fart');
        this.animation.goToFrame(this.animation.getLastFrame());
        if (draggedSprite == null) {
          draggedSprite = this;
        }

        
        fart.onMouseReleased = function() {
            this.changeAnimation('fart');
            this.animation.goToFrame(0);
            if (draggedSprite == this) {
              draggedSprite = null;
            }
          };
    }
}
function gotPoses(poses){
    if(poses.length > 0 ){
      pose = poses[0].pose;
  }
  }
  
  function modelLoaded() {
    console.log("pose ready");
  }
  
  function pooing(){
      let posY = 0;
      let speed = 5;

    if(mouseIsPressed){
        ellipse(width / 3, posY, 30);
        
    }
    
  }

function draw() {
    
    image(video, 0, 0, width, height);
    // if(pose){
    //     // ellipse(pose.leftWrist.x-200, pose.leftWrist.y-150, 50);
    // }
    drawSprites();
    pooing();
    if(words){
        textSize(50);
        text('엉덩이를 눌러주면 선물을 줄게!🍑', width/ 3, height /3);
    }

}