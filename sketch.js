let mgr;

function setup() {
    createCanvas(600, 200);

    mgr = new SceneManager();

    mgr.addScene(Greeting);
    mgr.addScene(Feeding);
    mgr.addScene(Animation3);

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
            mgr.showScene (Animation3);
            break;
    } 
    
    mgr.handleEvent("keyPressed");
}
function Greeting()
{
    let gif;
    
    // enter() will be executed each time the SceneManager switches
    // to this animation
    // Note: Animation1() doesn't have setup() or draw()
    this.enter = function()
    {
        gif = loadImage("giphy.gif");
    }
    this.draw = function(){
        image(gif, 0, 0, width, height);
    }

    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}


function Feeding()
{
    this.y = 0;
    
    this.draw = function()
    {
        background("teal");

        line(0, this.y, width, this.y);
        this.y++;

        if ( this.y > height )
            this.y = 0;
    }

    this.mousePressed = function()
    {
        this.sceneManager.showNextScene();
    }
}


// When defining scenes, you can also 
// put the setup, draw, etc. methods on prototype
function Animation3( )
{
    this.oAnim1 = null;
}

Animation3.prototype.setup = function()
{
    // access a different scene using the SceneManager
    oAnim1 = this.sceneManager.findScene( Feeding );
}

Animation3.prototype.draw = function()
{
    background("lightblue");
            
    var r = sin( frameCount * 0.01 );
            
    fill("white");
    ellipse( width / 2, height / 2, map(r, 0, 1, 100, 200) );

    if ( oAnim1 != null )
    {
        fill("black");
        textAlign(LEFT);
        text( "Scene1 y: " + oAnim1.oScene.y, 10, height - 20);
    }
}

Animation3.prototype.mousePressed = function()
{
    this.sceneManager.showNextScene();
}
