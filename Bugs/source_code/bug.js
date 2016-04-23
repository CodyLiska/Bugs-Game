// BUG CONSTRUCTOR 


goog.provide('chapter6.Bug');

// GET REQUIREMENTS
goog.require('lime.Sprite');
goog.require('goog.math');

chapter6.Bug = function() {

    // CALLING PARENT CONSTRUCTOR
    goog.base(this);

    this.setAnchorPoint(0,0).setFill('img/bug.png').setSize(80,70);

    var x = goog.math.uniformRandom(20,440);
    var y = goog.math.uniformRandom(50,200);

    this.setPosition(x,y);

    this.is_moving = false;

    lime.scheduleManager.schedule(function(dt) {
 
        if(this.is_moving) {

            current_x = this.getPosition().x;
            current_y = this.getPosition().y;

            // KEEPS BUGS ON THE SCREEN
            if(current_x > 400) {
                this.speed_x = goog.math.uniformRandom(-0.05, -0.01);
            }

            else if(current_x < -2) {
                this.speed_x = goog.math.uniformRandom(0.01, 0.05);
            }

            if(current_y > 248) {
                this.speed_y = goog.math.uniformRandom(-0.05, -0.01);
            }

            else if(current_y < 3) {
                this.speed_y = goog.math.uniformRandom(0.01, 0.05);
            }

            // SETTING A NEW POSITION FOR MOVEMENT
            this.setPosition(current_x+this.speed_x*dt,current_y+this.speed_y*dt);
        }
    }, this);
}

// CHAPTER6 INGERITS FROM LIME.SPRITE
goog.inherits(chapter6.Bug,lime.Sprite);

// CRAWL FUNCTION
chapter6.Bug.prototype.crawl = function() {

    this.is_moving = true;
    this.speed_x = goog.math.uniformRandom(-0.05,0.05);
    this.speed_y = goog.math.uniformRandom(-0.05,0.05);
}