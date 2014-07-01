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

var gif_encoder;
var capture_interval;

var startCapture = function(){
    gif_encoder = new GIFEncoder();
    gif_encoder.setRepeat(0);
    gif_encoder.setDelay(1000/15);
    gif_encoder.setDispose(1); // do not dispose
    gif_encoder.start();
    capture_interval = setInterval( function(){
        gif_encoder.addFrame( context );
    }, 100 );
};

var endCapture = function(){
    clearInterval( capture_interval );
    gif_encoder.finish();
    var img = gif_encoder.stream().getData();
    var data_url = 'data:image/gif;base64,'+ encode64(img);
    window.open( data_url );
};

youtube_video.addEventListener( 'play', function(){
    startCapture();
});

youtube_video.addEventListener( 'pause', function(){
    endCapture();
});
