var canvas = document.createElement("canvas");
canvas.height = $(document).height() * .97;
canvas.width = $(document).width() * .97;
document.body.appendChild(canvas);

var ctx = canvas.getContext("2d");

var backgroundImage = new Image();
backgroundImage.src = "static/background.jpg";
var backgroundReady = false;

var spaceshipImage = new Image();
spaceshipImage.src = "static/spaceship.png";
var spaceshipReady = false;

var alienImage = new Image();
alienImage.src = "static/alien.png";
var alienReady = false;

backgroundImage.onload = function(){	backgroundReady=true;	};
spaceshipImage.onload = function(){		spaceshipReady=true;	};
alienImage.onload = function(){			alienReady=true;	};

//handle events
var events = {};

document.addEventListener("keydown", function(e){ events[e.keyCode] = true; }, false );
document.addEventListener("keyup", function(e){ delete events[e.keyCode]; }, false);

var spaceship = {x: 300, y: 350, health: 100};

var render = function(){

	if (backgroundReady){
		console.log("Hello Background");
		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	}
	if (spaceshipReady){
		console.log("Hello Spaceship");
		ctx.drawImage(spaceshipImage, spaceship.x, spaceship.y, 150, 150);
	}
	if (alienReady){
		console.log("Hello Alien");
		ctx.drawImage(alienImage, 100, 100, 75, 75);
	}
	
	if (37 in events){
		spaceship.x = spaceship.x - 5;
	}
	if (38 in events){
		spaceship.y = spaceship.y - 5;
	}
	if (39 in events){
		spaceship.x = spaceship.x + 5;
	}
	if (40 in events){
		spaceship.y = spaceship.y + 5;
	}
	
}


var gameLoop = function(){
	render();
}

setInterval(gameLoop, 10);