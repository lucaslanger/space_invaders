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
spaceshipImage.id = "spaceship";
var spaceshipReady = false;
rotationangle = 0;

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

var spaceship = {x: 300, y: 350, health: 100, width: 150, height: 150, speed: 5}; //Added width and height

var explosionImage = new Image();
explosionImage.src = "static/explosion.png";
explosionReady = false;
explosionImage.onload = function(){ explosionReady = true;};

var explosion = {x: 250, y: 250, xframe: 0, yframe: 0};

var listofAliens = [];
var newAlienCounter = 0;
var listofIndicesToRemove = []

//Tutorial 6 Stuff
var gameOn = true;
var gameOverGif = new Image();
gameOverGif.src = "static/gameover.gif";
//

var render = function(){

	//Tutorial 6 Stuff
	for (var c=0;c<listofAliens.length;c++){
		alien = listofAliens[c];

		if ( ( (alien.x <= spaceship.x) && (alien.x + alien.size >= spaceship.x) ) //Check x collision
			 || ((alien.x >= spaceship.x) && (alien.x <= spaceship.x + spaceship.width) ) ){
			 
				if ( ((alien.y <= spaceship.y) && (alien.y + alien.size >= spaceship.y) ) //Check y collision
					|| ((alien.y >= spaceship.y) && (alien.y <= spaceship.y + spaceship.height) ) ){
						//gameOn = false;	
						break;
				}
		}
	}
	//

	if (backgroundReady){
		ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
	}
	if (spaceshipReady){
		//tutorial 6
		ctx.save();
		ctx.translate(spaceship.x + spaceship.width/2, spaceship.y + spaceship.height/2);
		ctx.rotate(rotationangle);
		ctx.drawImage(spaceshipImage, -spaceship.width/2, -spaceship.height/2, spaceship.width, spaceship.height);
		ctx.restore();
	}
		
	if (alienReady){

		if (newAlienCounter == 0){
			listofAliens.push({x: Math.max(30,Math.random()* canvas.width - 100), y: 0, size: Math.random()*50 + 50});
		}
		
		newAlienCounter++;

		if (newAlienCounter == 30){
			newAlienCounter = 0;
		}
		
		listofIndicesToRemove = []
		for (var c=0;c<listofAliens.length;c++){
		
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
		//Modified Tutorial 6
		rotationangle -= 5*Math.PI/180;	
	}
	if (38 in events){
		spaceship.y = spaceship.y - spaceship.speed*Math.cos(rotationangle);
		spaceship.x = spaceship.x + spaceship.speed*Math.sin(rotationangle);
	}
	if (39 in events){
		rotationangle += 5*Math.PI/180;	
	}
	if (40 in events){
		spaceship.y = spaceship.y + spaceship.speed*Math.cos(rotationangle);
		spaceship.x = spaceship.x + spaceship.speed*Math.sin(rotationangle);
	}

}


var gameLoop = function(){
	//Tutorial 6 add-on
	if (gameOn){
	
		render();
	}
	else{
		ctx.drawImage(gameOverGif, 0, 0, canvas.width, canvas.height);
	}
	//
}

setInterval(gameLoop, 30);