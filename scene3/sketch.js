let video;
let poseNet;
let pose;
let fart;
let draggedSprite;
let words = false;
let poo = false;

let particleArray =[];
let s = 5;//circle scale

function createParticle(){
    return {
        position: { x: width / 2, y: 150 },
    velocity: { x: random(-1, 1), y: random(-5, 0) }
    };
}
function initializeParticle(particle) {
    particle.position = { x: width / 2, y:150 };
    particle.velocity = { x: random(-1, 1), y: random(-10, 0) };
    
    return particle;
  }
function advanceParticle(particle) {
    particle.position.x += particle.velocity.x;
    particle.position.y += particle.velocity.y;  
}
  
function setup() {
    createCanvas(windowWidth, windowHeight);
    c = color(random(255), random(255), random(255));

    for (let i = 0; i < 100; i++) {
        let createdParticle = createParticle();
        let initializedParticle = initializeParticle(createdParticle);
        
        particleArray.push(initializedParticle);
      }

    video = createCapture(VIDEO);
    video.hide();

    fart = createSprite(width / 2, 90);
    fart.addAnimation('normal', 'Layer 6.png');
    fart.addAnimation('fart','Layer 6.png','Layer 7.png','Layer 8.png');

    fart.onMouseOver = function() {
        this.changeAnimation('normal');
        words = true;
    }

    fart.onMouseOut = function(){
        words = false;
    }

    fart.onMousePressed = function() {
        this.changeAnimation('fart');
        this.animation.goToFrame(this.animation.getLastFrame());
        if (draggedSprite == null) {
          draggedSprite = this;
        }
        poo = true;
    }
        
        fart.onMouseReleased = function() {
            this.changeAnimation('fart');
            this.animation.goToFrame(0);
            if (draggedSprite == this) {
              draggedSprite = null;
            }
            poo = false;

          };
    }


function draw() {
    c = color(random(255), random(255), random(255));

    image(video, 0, 0, width, height);
 
    drawSprites();
    
    if(words){
        textSize(50);
        text('엉덩이를 눌러주면 선물을 줄게!🍑', width/ 3, height /3);
    }
    if(poo){
        for (particle of particleArray) {
            noStroke();
            fill(c);
            circle(particle.position.x, particle.position.y, s);//여기를 변수로 두고 점점 커지는 거 하고 싶어
           
        }
        s++;  
          
          for (particle of particleArray) {
            particle.velocity.y += 0.2;
            
            advanceParticle(particle);
            
            if (particle.position.y > height) {
              initializeParticle(particle);
            }
    }
    
      }  
}