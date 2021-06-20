function Deer() {
let resolution = 50; // how many points in the circle
let rad = 150;
let x = 1;
let y = 1;

let t = 0; // time passed
let tChange = 0.01; // how quick time flies

let nVal; // noise value
let nInt = 1; // noise intensity
let nAmp = 1; // noise amplitude


    
this.body = function() {
    if(pose){
        // push();
        translate(pose.nose.x, pose.nose.y);
    
        fill(255);
        stroke(0);
        strokeWeight(4);
      
      nInt = map(pose.nose.x, 0, width, 0.1, 30); // map mouseX to noise intensity
      nAmp = map(pose.nose.y, 0, height, 0.0, 1.0); // map mouseY to noise amplitude
    
      beginShape();
      for (let a=0; a<=TWO_PI; a+=TWO_PI/resolution) {
    
        nVal = map(noise( cos(a)*nInt+1, sin(a)*nInt+1, t ), 0.0, 1.0, nAmp, 1.0); // map noise value to match the amplitude
    
        x = cos(a)*rad *nVal;
        y = sin(a)*rad *nVal;
    
        vertex(x, y);
        }
      endShape(CLOSE);
      //face
      // push();
        fill(0);
        ellipse(pose.nose.x, pose.nose.y, 8);
        ellipse(pose.nose.x-520, pose.nose.y-400, 8);
        noFill();
        arc(pose.nose.x-550, pose.nose.y-350, 50, 100, QUARTER_PI, PI - QUARTER_PI);
        arc(pose.nose.x-500, pose.nose.y-350, 50, 100, QUARTER_PI, PI - QUARTER_PI);
        // arc(pose.nose.x-570, pose.nose.y-450, 20, 150, QUARTER_PI, PI - QUARTER_PI);
        // arc(pose.nose.x-530, pose.nose.y-450, 20, 150, QUARTER_PI, PI - QUARTER_PI);
    
    
        // pop();
    
      t += tChange;
      
      }
}
}