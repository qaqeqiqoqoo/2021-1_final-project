let stretchMult = 6;
let easing = 0.3; //easing value

// Squid[] mSquid = new Squid[1];

let mSquid = [];
let tx, ty;

let pause = false;

function setup() {
createCanvas(512, 512);
background(255);
noCursor();
for (let i = 0; i < 1; i++) {
mSquid[i] = new Squid((i + 1) * 8);
}
mouseX = width / 2;
mouseY = height / 2;
}

function draw() { //draw background background(255);
if (pause) return;
noStroke();
fill(255, 130);
rect(0, 0, width, height);

tx += (mouseX + (-0.5 + noise((mouseX + frameCount - 50) * 0.008, 0, 0)) * 120 - tx) * (easing * 0.3);
ty += (mouseY + (-0.5 + noise(0, (mouseY + frameCount - 50) * 0.008, 0)) * 120 - ty) * (easing * 0.3);

tx=mouseX,ty=mouseY;
for (let i = 0; i < mSquid.length; i++) {
mSquid[i].draw(tx + i * 70, ty + i * 70);
}

}

function keyPressed() {
pause = !pause;
}

class Squid {
// Tentacle[] tent; //declare and name array
constructor(_count) {
this.tent = [];
// this.s;
// this.shifts;
// this.tent = new Tentacle[_count];
this.s = 2 * 3.6 / float(_count + 1);
this.shifts = this.s * 0.2;

for (let i = 0; i < _count; i++) {
this.tent[i] = new Tentacle(width / 2, height / 2, stretchMult * (cos(this.s * i + this.shifts)), stretchMult * (sin(this.s * i + this.shifts)));
}
}

draw(_tx, _ty) {
for (let i = 0; i < this.tent.length; i++) {
this.tent[i].update(_tx, _ty); //math
stroke(0);
this.tent[i].display(7); //visual
}

fill(250, 250, 250);
strokeWeight(3.5);
ellipse(_tx, _ty, 70, 70);

for (let i = 0; i < this.tent.length; i++) {
stroke(75, 200, 0);
this.tent[i].display(0); //visual
}
strokeWeight(2);
stroke(0);
fill(255);
ellipse(_tx + 10, _ty - 6, 8, 5);
ellipse(_tx - 10, _ty - 6, 8, 5);
fill(0);
ellipse(_tx + 10, _ty - 6, 1, 1);
ellipse(_tx - 10, _ty - 6, 1, 1);
noFill();
arc(_tx, _ty + 6, 20, 20, QUARTER_PI, PI - QUARTER_PI);
//arc(50, 55, 70, 70, PI, PI+QUARTER_PI);
}
}

//class for each "segment" of the Limb
//begin class block:
class Limb {
constructor(_x, _y, _s, _ta) {
this.cX = _x;
this.cX = _y;
this.size = _s;
this.bumpSize = _s / 2;
this.randomBump = int(random(2));
this.bumpPos = random(-this.bumpSize, this.bumpSize);
this.stretch;
this.eX;
this.eY;
//Easing variables
this.folX; //follower for x
this.folY; //follower for y
}

update(x, y, a, b) { //, float x2, float y2, float s, float e){
this.cX = x;
this.cY = y;
this.eX = x + a;
this.eY = y + b;
this.eX += (0.5 - noise((this.eX + frameCount) * 0.008, 0, 0)) * 20;
this.eY += (0.5 - noise(0, (this.eY + frameCount) * 0.008, 0)) * 20;
this.folX += (this.eX - this.folX) * easing;
this.folY += (this.eY - this.folY) * easing;
// this.cX = this.cX > 0 ? this.cX < width ? this.cX : width : 0;
// this.cY = this.cY > 0 ? this.cY < height ? this.cY : height : 0;
// this.eX = this.eX > 0 ? this.eX < width ? this.eX : width : 0;
// this.eY = this.eY > 0 ? this.eY < height ? this.eY : height : 0;
if (this.cX > 0) {
this.cX = this.cX;
} else if (this.cX < width) {
this.cX = width;
} else {
this.cX = 0;
}

if (this.cY > 0) {
this.cY = this.cY;
} else if (this.cY < height) {
this.cY = height;
} else {
this.cY = 0;
}

if (this.eX > 0) {
this.eX = this.eX;
} else if (this.eX < width) {
this.eX = width;
} else {
this.eX = 0;
}

if (this.eY > 0) {
this.eY = this.eY;
} else if (this.eY < height) {
this.eY = height;
} else {
this.eY = 0;
}

this.stretch = dist(this.cX, this.cX, this.folX, this.folY);
}


display(sw, a, b) {
strokeWeight(this.size + sw);
line(this.cX, this.cY, this.folX, this.folY);
strokeWeight(this.bumpSize + sw);

if (this.randomBump < 2) {
point(this.cX + (b * 1.5), this.cY + (a * 1.5));
}
}
}

class Tentacle {
// this.segments;
// this.segmentsAmount = 20;
// Limb[] segments = new Limb[20];
// this.a;
// this.b;

constructor(_x, _y, _ai, _bi) {
this.a = _ai;
this.b = _bi;
this.segments = [];
this.segmentsAmount = 20;

// for (let i = 0; i < this.segmentsAmount; i++) {
// this.segments[i] = [];
// }

for (let i = 0; i < this.segmentsAmount; i++) {
this.segments[i] = new Limb(_x, _y, this.segmentsAmount - (i * 1.75) + 25, 15);
}
}

update(x, y) {
for (let i = 0; i < this.segments.length; i++) {
if (i == 0) {
this.segments[i].update(x, y, this.a, this.b);
} else {
this.segments[i].update(this.segments[i - 1].folX, this.segments[i - 1].folY, this.a, this.b);
}
}
}
display(sw) {
for (let i = 0; i < this.segments.length; i++) {
// stroke((255f/segments.length)*i,100,20);
this.segments[i].display(sw, this.a, this.b);
}
}
}

//연산이 끝난 다음에 콘솔넣어서 값을 체크
//각 페이지를 따로 만들어서 나중에 합치자. 