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
spaceshipImage.onload = function(){	spaceshipReady=true;	};
alienImage.onload = function(){	alienReady=true;	};

//handle events
var events = {};

document.addEventListener("keydown", function(e){ events[e.keyCode] = true; }, false );
document.addEventListener("keyup", function(e){ delete events[e.keyCode]; }, false);

var spaceship = {x: 300, y: 350, health: 100};

var explosionImage = new Image();
explosionImage.src = "static/explosion.png";
explosionReady = false;
explosionImage.onload = function(){ explosionReady = true;};

var explosion = {x: 250, y: 250, xframe: 0, yframe: 0};

var listofAliens = [];
var newAlienCounter = 0;
var listofIndicesToRemove = []

var render = function(){

if (backgroundReady){
	//console.log("Hello Background");
	ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
}
if (spaceshipReady){
	//console.log("Hello Spaceship");
	ctx.drawImage(spaceshipImage, spaceship.x, spaceship.y, 150, 150);
}
if (alienReady){
	//console.log("Hello Alien");
	//ctx.drawImage(alienImage, 100, 100, 75, 75);


	//TUTORIAL 5 STUFF!!!
	

	if (newAlienCounter == 0){
		listofAliens.push({x: Math.max(30,Math.random()* canvas.width - 100), y: 0, size: Math.random()*50 + 50});
	}
	
	newAlienCounter++;

	if (newAlienCounter == 30){
		newAlienCounter = 0;
	}
	
	
	listofIndicesToRemove = []
	for (var c=0;c<listofAliens.length;c++){
		console.log("test");
		var current = listofAliens[c];
		if (current.y > canvas.height){
			listofIndicesToRemove.push(c)
		}
		else{
			current.y += 5;
			ctx.drawImage(alienImage, current.x, current.y, current.size, current.size);
		}
	}
	
	for (var i in listofIndicesToRemove){
		listofAliens.splice(i,1);
	}

}




if (explosionReady){

	ctx.drawImage(explosionImage, 256 * explosion.xframe, explosion.yframe *256, 256, 256, explosion.x, explosion.y, 128, 128);
	
	explosion.xframe++;
	if (explosion.xframe == 8){
		explosion.xframe = 0;
		explosion.yframe ++;
	}
	if (explosion.yframe == 6){
		explosion.yframe = 0;
	}
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

setInterval(gameLoop, 30);