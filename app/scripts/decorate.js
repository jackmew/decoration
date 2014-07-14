(function($){
    $.fn.decorate = function(options) {

    //get div
    var $canvasDiv = $(this);
    //get canvas
    var canvas = $canvasDiv.children('canvas')[0];
    //get canvas context
    var ctx = canvas.getContext("2d");
    //window width
    var W = canvas.width = $(window).width();
    //window height
    var H = canvas.height = $(window).height();
    //dynamic number for starCollection
    var mp = W*H/6400;
    //collection of star
    var starCollection ;

    //setType();

    //Accepting Options
    var settings = $.extend({
        //type: 1.star 2.littleStar 3.firefly 4.iceCrystal
        type: 'star',
        //decoration element color
        decorationColor: null,
        //direction: 1.up 2.down 3.left 4.right
        direction: null,
        //number of points
        points: null,
        //size
        size: 20,
    }, options );
    var type = settings.type;

    //  var decorationColor = settings.decorationColor;
    //  var direction = settings.direction;
    //  var points = settings.points;
    //  var size = settings.size;
     var decorationColor ;
     var direction ;
     var points ;
     var size = settings.size;


function setType() {
    switch(type) {
        case 'star':
            decorationColor = 'rgba(237, 241, 10, 0.5)';
            direction = 'up';
            points = 5;
            decorationColor=ctx.createLinearGradient(0,0,-10,-10);
            decorationColor.addColorStop(0,"yellow");
            decorationColor.addColorStop(0.3,"white");
            decorationColor.addColorStop(0.6,"yellow");
            decorationColor.addColorStop(1,"white");
            break;
        case 'littleStar':
            decorationColor = 'rgba(237, 241, 10, 0.5)';
            direction = 'down';
            points = 4;
            decorationColor=ctx.createRadialGradient(200,100,10,230,600,600);
            decorationColor.addColorStop(0,"white");
            decorationColor.addColorStop(1,"yellow");
            break;
        case 'firefly':
            decorationColor = 'rgba(237, 241, 10, 0.5)';
            direction = 'left';
            points = 60;
            decorationColor=ctx.createRadialGradient(180,30,10,130,100,400);
            decorationColor.addColorStop(0,"yellow");
            decorationColor.addColorStop(1,"lightgreen");

            break;
        case 'iceCrystal':
            decorationColor = 'rgba(237, 241, 10, 0.5)';
            direction = 'right';
            points = 10;
            decorationColor=ctx.createLinearGradient(0,0,10,10);
            decorationColor.addColorStop(0,"rgba(226, 245, 245, 0.79)");
            decorationColor.addColorStop(0.5,"rgba(182, 252, 250, 0.81)");
            decorationColor.addColorStop(1,"rgba(140, 248, 237, 0.84)");
            break;
    }
    if(settings.decorationColor) {
        decorationColor = settings.decorationColor;
    }
    if(settings.direction) {
        direction = settings.direction;
    }
    if(settings.points) {
        points = settings.points;
    }
}

//set the star instances in the array
function generateStar() {

    starCollection = [];
    for(var i = 0; i < mp; i++){
        starCollection.push({
                x:Math.random()*W,               //x of center
                y:Math.random()*H,               //y of center
                r:Math.random()*size,            //radius
                p:points,                        //number of point
                m:getRandomArbitrary(0.3,0.6)    //fraction of radius for inset
        });
    }
}
//get random number in the range between min and max.
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
//set requestAnmationFrame for multiple browsers
requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function(callback) { setTimeout(callback, 1000 / 60); };
//draw star
function drawStar()
{
    ctx.clearRect(0, 0, $(window).width(), $(window).height());

    //ctx.fillStyle = decorationColor;
    // var my_gradient=ctx.createLinearGradient(0,0,170,0);
    // my_gradient.addColorStop(0,"lightblue");
    // my_gradient.addColorStop(0.1,"white");


    ctx.fillStyle=decorationColor;

    for(var i=0;i<starCollection.length;i++) {
        ctx.save();
        ctx.beginPath();
        x= starCollection[i].x;
        y= starCollection[i].y;
        r= starCollection[i].r;
        p= starCollection[i].p;
        m= starCollection[i].m;

        ctx.translate(x, y);
        ctx.moveTo(0,0-r);
        drawingStar(r,p,m);
        ctx.fill();
        ctx.restore();
    }
    update();

    requestAnimationFrame(drawStar);

}
//draw star in detail
function drawingStar(r,p,m) {
    for (var i = 0; i < p; i++)
        {
            ctx.rotate(Math.PI / p);
            ctx.lineTo(0, 0 - (r*m));
            ctx.rotate(Math.PI / p);
            ctx.lineTo(0, 0 - r);
        }
}
//Function to move the star
var angle = 0.000;
var speed = 0.25;
function update(){
    if(angle > 2*Math.PI) {
        angle = 0.000;
    }else{
        angle += 0.002;
    }
    setDirection();

}
function setDirection() {
    switch (direction) {
        case 'up':
            for(var i = 0; i < mp; i++){
                var star = starCollection[i];

                star.y -= (Math.cos(angle+star.m) + 1 + star.r/2)*speed;
                star.x += (Math.sin(angle) * 2)*speed;

                if(star.x > W*1.5 || star.x < -0.5*W || star.y < 0) {
                    starCollection[i] = {x: Math.random()*W, y: H, r: star.r,p:star.p, m:star.m };
                }
            }
            break;
        case 'down':
            for(var i = 0; i < mp; i++){
                var star = starCollection[i];

                star.y += (Math.cos(angle+star.m) + 1 + star.r/2)*speed;
                star.x += (Math.sin(angle) * 2)*speed;

                if(star.x > W*1.5 || star.x < -0.5*W || star.y > H) {
                    starCollection[i] = {x: Math.random()*W, y: -10, r: star.r,p:star.p, m:star.m };
                }
            }
            break;
        case 'left':
            for(var i = 0; i < mp; i++){
                var star = starCollection[i];

                star.x -= (Math.cos(angle+star.m) + 1 + star.r/2)*speed;
                star.y += (Math.sin(angle) * 2)*speed;

                if(star.x > W*1.5 || star.x < -10 || star.y > H) {
                    starCollection[i] = {x: W+10, y: Math.random()*H, r: star.r,p:star.p, m:star.m };
                }
            }
            break;
        case 'right':
            for(var i = 0; i < mp; i++){
                var star = starCollection[i];

                star.x += (Math.cos(angle+star.m) + 1 + star.r/2)*speed;
                star.y += (Math.sin(angle) * 2)*speed;

                if(star.x > W*1.5 || star.x < -10 || star.y > H) {
                    starCollection[i] = {x: -10, y: Math.random()*H, r: star.r,p:star.p, m:star.m };
                }
            }
            break;
    }

}
/*****************************Entry point*********************************/
    setType();
    //generate random star
    generateStar();
    //listen to the resize event
    $(window).resize(function(){
        console.log("resize");
        generateStar();
        update();
    });
    //change the direction
    drawStar();
}//end decorate
})(jQuery);
