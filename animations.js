var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
var clearb = document.getElementById("clear");
var toggleb = document.getElementById("toggle");

var circle = true;
var shapeDrawn = false;

var oldX = 0;
var oldY = 0;

var tog = function() {
    if (circle) {
        circle = false;
    } else {
        circle = true;
    }
};


toggleb.addEventListener('click', tog, true);

var draw = function(e) {
    var x = e.offsetX;
    var y = e.offsetY;
	ctx.beginPath();

	if (shapeDrawn) {
		ctx.lineTo(oldX, oldY);
		ctx.stroke();
		var dim = 20;
      	if (circle) {
			ctx.arc(x - 5, y - 5, dim, 0, 2 * Math.PI);
           	ctx.stokeStyle = "#800000";
           	ctx.stroke();
   		   	ctx.fillStyle = "#800000";
           	ctx.fill();
      	 } else {
			ctx.fillStyle = "#808000";
			ctx.fillRect(x - dim, y - dim, dim*2, dim*2);
			ctx.moveTo(x,y);
			ctx.lineTo(oldX, oldY);
			ctx.stroke();
      	 }
	}
	else{
		var dim = 20;
		if (circle) {
			ctx.arc(x - 5, y - 5, dim, 0, 2 * Math.PI);
        	ctx.stokeStyle = "#800000";
       	 	ctx.stroke();
			ctx.fillStyle = "#800000";
       	 	ctx.fill();
			shapeDrawn = true;
		} else {
        	ctx.fillStyle = "#808000";
        	ctx.fillRect(x - dim, y - dim, dim*2, dim*2);
			shapeDrawn = true;
   	 	}
	}

	oldX = x;
	oldY = y;
};

var requestID;
var stopB = document.getElementById("stop");
var circleB = document.getElementById("circling");
var bounceB = document.getElementById("bouncing");

var radius = 20;
var x = canv.width/2;
var y = canv.height/2;

var xcor = x;
var ycor = y;
var angle = Math.random()*Math.PI*2;
var xfact;
var yfact;
if( Math.cos(angle) > 0 ){
	xfact = 1;
}
else{
	xfact = -1;
}
if( Math.sin(angle) > 0 ){
	yfact = 1;
}
else{
	yfact = -1;
}

var animate = function(){
	var grow = true;
	var r = 0;
	window.cancelAnimationFrame(requestID);

	var draw = function() {
		clear();
		ctx.beginPath();
		ctx.arc(canv.width/2, canv.height/2, r, 0, 2 * Math.PI);
		ctx.stokeStyle = "#800000";
   		ctx.stroke();
   	 	ctx.fillStyle = "#800000";
		ctx.fill();

		if (grow){
			r++;
			if (r >= canv.height/2){
				grow = false;
			}
		}
		else{
			r--;
			if (r <=1){
				grow = true;
			}
		}

		requestID = window.requestAnimationFrame( draw );
		console.log(requestID);
	}
	draw();
};

var animate2 = function(){
    var draw2 = function(){

	ctx.clearRect(0,0,canv.width,canv.height);

	ctx.beginPath();
	ctx.arc(xcor,ycor,20,0,2*Math.PI);
	ctx.stokeStyle = "#800000";
	ctx.stroke();
 	ctx.fillStyle = "#800000";
	ctx.fill();

	if( xcor-radius < 0 || xcor+radius > canv.width ){
	    xfact *=-1;
	}
	else if(ycor-radius < 0 || ycor+radius > canv.height){
	    yfact *=-1;
	}

	xcor+=Math.cos(angle)*xfact;
	ycor+=Math.sin(angle)*yfact;

	requestID = window.requestAnimationFrame(draw2);
	console.log(requestID);
    }
    draw2();
}

var pause = function(){
	window.cancelAnimationFrame(requestID);
}

stopB.addEventListener('click', pause);
circleB.addEventListener('click', animate);
bounceB.addEventListener('click', animate2);

canv.addEventListener('click', draw, true);

var clear = function() {
    ctx.clearRect(0, 0, 650, 650);
};

clearb.addEventListener('click', clear, true);
