// SET MAIN NAMESPACE
goog.provide('chapter6');


// GET REQUIREMENTS 
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('lime.fill.LinearGradient');
goog.require('lime.Label');
goog.require('goog.math');
goog.require('lime.Layer');
goog.require('chapter6.Bug');
goog.require('lime.GlossyButton'); 
goog.require('lime.audio.Audio');

// ENTRYPOINT
chapter6.start = function(){

    // DIRECTOR
    var director = new lime.Director(document.body,480,320);
    director.makeMobileWebAppCapable();
    director.setDisplayFPS(false);
    
    var initialScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    var gameScene = new lime.Scene().setRenderer(lime.Renderer.CANVAS);
    
    // START SCENE
    var initialLayer = new lime.Layer().setPosition(30,30);
    
    var initialContainer = new lime.Sprite().setPosition(0,0).setSize(420,260).setFill('#EEE0E5').setAnchorPoint(0,0);
    
    var initialTitle = new lime.Label().setText('WELCOME').setFontFamily('Arial').setFontColor('#000000').
        setFontSize(20).setAnchorPoint(0,0).setPosition(150,60);
    
    var startButton = new lime.GlossyButton().setSize(200,60).setPosition(200,150).setText('Start').setColor('#00CD00'); 
    
    initialLayer.appendChild(initialContainer);
    initialLayer.appendChild(initialTitle);
    initialLayer.appendChild(startButton);
    
    initialScene.appendChild(initialLayer);

    goog.events.listen(startButton, ['mousedown','touchstart'], function(e) {
        director.pushScene(gameScene);
    })
    
    // GAME SCENE
        
    // GRASS
    var grass_gradient = new lime.fill.LinearGradient().setDirection(0,0,1,-1)
        .addColorStop(0,'#7CCD7C').addColorStop(0.5, '#00FF00');
    
    var grass = new lime.Sprite().setSize(480,320).setPosition(0,0).
        setAnchorPoint(0,0).setFill(grass_gradient);
    
    // BUG COUNT
    var num_bugs_caught = 0;
    var bug_count = new lime.Label().setText('Bug count: '+num_bugs_caught).
        setFontFamily('Arial').setFontColor('#000000').setFontSize(20).
        setPosition(100,300);
    
    // BOX
    var box = new lime.Sprite().setAnchorPoint(0,0).setPosition(390,230).setFill('img/box.png');

    // SOUND
    var bugSound = new lime.audio.Audio('sound/bug_sound.mp3');
    
    // RANDOM NUMBER OF BUGS
    var num_bugs = goog.math.randomInt(5)+1;
    
    var bugsArray = [];
    
    for(i=0;i<num_bugs;i++) {
            
        bug = new chapter6.Bug();

        // BUG MOVEMENT
        bug.crawl();

        goog.events.listen(bug,['mousedown','touchstart'], function(e) {
            var drag = e.startDrag();

            e.event.stopPropagation();

            drag.addDropTarget(box);

            current_bug = this;
            goog.events.listen(drag,lime.events.Drag.Event.DROP, function(e) {

                // STOPS SOUNDS AS NEEDED
                bugSound.stop();
                bugSound.play();

                current_bug.setHidden(true);
                delete current_bug;

                // UPDATE BUG COUNT
                num_bugs_caught++;
                bug_count.setText('Bug Count: '+num_bugs_caught);

                if(num_bugs_caught == num_bugs) {
                    alert('You WON!');
                    chapter6.start();
                }
            });
        });
                    
        bugsArray.push(bug);
    }
    
    gameScene.appendChild(grass);
    gameScene.appendChild(box);
    gameScene.appendChild(bug_count);
    
    for(i in bugsArray) {
        gameScene.appendChild(bugsArray[i]);
    }
    
    director.replaceScene(initialScene);
        
}
