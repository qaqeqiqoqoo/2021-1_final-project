let filled = false;
let video;
let poseNet;
let pose;


function setup() {
  createCanvas(windowWidth, windowHeight);
  noiseDetail(8);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, this.modelLoaded);
  poseNet.on('pose',this.gotPoses);
d = new Deer();

}

function gotPoses(poses){
  if(poses.length > 0 ){
    pose = poses[0].pose;
}
}

function modelLoaded() {
  console.log("pose ready");
}

function draw() {
  image(video, 0, 0, width, height);
  background(255);
  drawSprites();
  d.body();
  
}

function mousePressed() {

  //create a sprite at the mouse position and store it in a temporary variable
  let s = createSprite(mouseX, mouseY, 30, 30);
  //if no image or animation is associated it will be a rectancle of the specified size
  //and a random color

  //now you can use the variable to set properties
  //e.g. a random velocity on the x and y coordinates
  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
  // if(){

  // }
}

