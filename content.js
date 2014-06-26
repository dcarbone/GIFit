console.log('it works!');

var youtube_video = document.querySelector('video.video-stream');
var canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style['z-index'] = 2147483647;
canvas.width = 300;
canvas.height = 169;
var context = canvas.getContext('2d');

document.body.appendChild( canvas );

function draw(v, c, w, h) {
    // if(v.paused || v.ended)  return false;
    console.log("draw event entered");
    c.drawImage(v, 0, 0, w, h);
    setTimeout(draw, 20, v, c, w, h);
};

draw( youtube_video, context, canvas.width, canvas.height );

var gif;
var capture_interval;

var startCapture = function(){
    gif = new GIFter({
        width: canvas.width,
        height: canvas.height,
        loop: 0,
        loopDelay: 0,
        frameDelay: 100
    });
    capture_interval = setInterval( function(){
        gif.addFrame( canvas );
    }, 100 );
};

var endCapture = function(){
    clearInterval( capture_interval );
    var img = gif.render();
    window.open( img );
};

youtube_video.addEventListener( 'play', function(){
    startCapture();
});

youtube_video.addEventListener( 'pause', function(){
    endCapture();
});
