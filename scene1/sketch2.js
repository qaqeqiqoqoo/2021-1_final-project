
function setup()
{
  createCanvas(600, 600);  
  background(0, 100, 255);
  frameRate(30);
}
let i=0
let j=0;
let x=10
let y=15;
let message = "I love you. I'm sorry. Please forgive me. Thank you.";

function draw() {
  translate(0, 20);
  fill(255, 255, 0);
  //-----------------------------


  //-----------------------------
  if (j < message.length()) {
	//	print (message);
    text(message.charAt(j), x*j+10, y*i);
    j++;
  }
  else { 
    j=0;
    i++;
  }
}

function mousePressed()
{
  draw();
}