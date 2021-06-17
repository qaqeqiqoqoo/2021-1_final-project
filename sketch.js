let mgr;

function setup() {
    createCanvas(720,480);

    mgr = new SceneManager();

    mgr.addScene(Greeting);
    mgr.addScene(Feeding);
    mgr.addScene(Pooing);

    mgr.showNextScene();

}

function draw() {
    mgr.draw();
}

function mousePressed(){
    mgr.handleEvent("mousePressed");
}

function keyPressed(){
    switch(key) {
        case '1': 
            mgr.showScene (Greeting);
            break;
        case '2': 
            mgr.showScene(Feeding);
            break;
        case '3':
            mgr.showScene (Pooing);
            break;
    } 
    
    mgr.handleEvent("keyPressed");
}
function Greeting()
{
    let gif;
    let deer;
    
    // enter() will be executed each time the SceneManager switches
    // to this animation
    // Note: Animation1() doesn't have setup() or draw()
    this.enter = function()
    {
        gif = loadImage("deer/giphy.gif");
    }
    this.draw = function(){
        image(gif, 0, 0, width, height);
    }

   

    // this.setup = function(){
    //     deer = createSprite(600, 600);
    //     deer.addAnimation('normal','deer/giphy1.png','deer/giphy2.png');
    //     deer.addAnimation('transform','deer/giphy3.png','deer/giphy4.png');
    //     deer.setCollider('circle', 0, 0, 64);

    //     deer.onMouseOver = function(){
    //         this.changeAnimation('transform');
    //     }
    //     deer.onMouseOut = function() {
    //         this.changeAnimation('normal');
    //       };
    // }

    // this.draw = function() {
    //     drawSprites();
    // }
    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}


function Feeding()
{   
    let video;
    let poseNet;
    let pose;

    this.setup = function() {
        video = createCapture(VIDEO);
        video.hide();
        poseNet = ml5.poseNet(video, this.modelLoaded);
        poseNet.on('pose',this.gotPoses);
    }

    // this.sprites = function () {
    //     createSprite(400, 200, 50, 50);
    //     drawSprites();

    // }

    this.gotPoses = function(poses) {
        // console.log(poses);
        if(poses.length > 0 ){
            pose = poses[0].pose;
        }
    }

    this.modelLoaded = function() {
        console.log("pose ready");
    }
    
    this.draw = function()
    {
        image(video, 0, 0, width, height);
        background(255,255, 0);

        if(pose){
            fill(255, 0, 0);
            ellipse(pose.nose.x, pose.nose.y, 100);
        }
        // this.sprites();
    }

    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}


// When defining scenes, you can also 
// put the setup, draw, etc. methods on prototype
function Pooing( )
{
    this.oAnim1 = null;
}

Pooing.prototype.setup = function()
{
    // access a different scene using the SceneManager
    // oAnim1 = this.sceneManager.findScene( Feeding );

    video = createCapture(VIDEO);
    video.hide();

}

Pooing.prototype.draw = function()
{
    
    image(video, 0, 0, width, height);

    var r = sin( frameCount * 0.01 );
    fill("white");
    ellipse( width / 2, height / 2, map(r, 0, 1, 100, 200) );


    // if ( oAnim1 != null )
    // {
    //     fill("black");
    //     textAlign(LEFT);
    //     text( "Scene1 y: " + oAnim1.oScene.y, 10, height - 20);
    // }
    
}

Pooing.prototype.mousePressed = function()
{
    this.sceneManager.showNextScene();
}
