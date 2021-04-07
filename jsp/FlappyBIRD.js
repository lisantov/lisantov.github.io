let canvas = document.getElementById("flappybird");
let ctx = canvas.getContext("2d");

let imgBird = new Image();
let imgBg = new Image();
let imgFg = new Image();
let imgPipeTop = new Image();
let imgPipeBottom = new Image();

let imageFolder = "imgs/";
	imgBird.src = imageFolder + "bird.png";
	imgBg.src = imageFolder + "bg.png";
	imgFg.src = imageFolder + "fg.png";
	imgPipeTop.src = imageFolder + "pipeTop.png";
	imgPipeBottom.src = imageFolder + "pipeBottom.png";

	let soundBird = new Audio();
	let soundScore = new Audio();
	let soundDie = new Audio();
	let soundHit = new Audio();

	let audioFolder = "audio/";
		soundScore.src = audioFolder + "score.mp3";
		soundBird.src = audioFolder + "fly.mp3";
		soundDie.src = audioFolder + "die.mp3";
		soundHit.src = audioFolder + "hit.mp3"

	let gameOver = true;
	let windowHeight = 160;

	let birdX = 25;
	let birdY = 175;
	let speed = 2;

	let score = 0;

	let pipe = [];
	pipe[0] = {
		x : canvas.width + 10,
		y : -100
	}

function init()
{
	gameOver = true;
	windowHeight = 160;

	birdX = 25;
	birdY = 175;
	speed = 2;

	score = 0;

	pipe = [];
	pipe[0] = {
		x : canvas.width,
		y : -100
	}
}

function draw()
{
	ctx.drawImage(imgBg,0,0);

	ctx.drawImage(imgBird,birdX,birdY);

	ctx.drawImage(imgFg, 0, canvas.height - imgFg.height);
	ctx.fillStyle = "#000";
	ctx.font = " 25px Verdana";
	ctx.fillText("Score: " + score, 10, canvas.height - 20 )

	for(let i = 0; i < pipe.length; i++)
	{
		ctx.drawImage(imgPipeTop, pipe[i].x, pipe[i].y);
		ctx.drawImage(imgPipeBottom, pipe[i].x, pipe[i].y + imgPipeTop.height + windowHeight);
	}

}

function flappyBird()
{
	
	if(gameOver === false)
	{
		birdY += speed;
		speed += 0.1;
		if(birdY + imgBird.height >= canvas.height - imgFg.height)
			init();
		for(let i = 0; i < pipe.length; i++)		
		{
			pipe[i].x--;
			if(pipe[i].x == 75)
			{

				pipe[i + 1] = {
					x : canvas.width,
					y : Math.floor(Math.random() * imgPipeTop.height - imgPipeTop.height)
				}				
			}	

			if(birdX + imgBird.width >= pipe[i].x
				&& birdX <= pipe[i].x + imgPipeTop.width
				&& (birdY <= pipe[i].y + imgPipeTop.height
				|| birdY + imgBird.height >= pipe[i].y + imgPipeTop.height + windowHeight))
				{
					init();
					soundHit.play();
				}

					if(birdX + imgBird.width === pipe[i].x + imgPipeTop.width / 2)
					{
						score += 1;
						soundScore.play();
					}	
				
			if(pipe[i].x < -50)
				pipe.splice(i, 1);
		}			
	}
	draw();
	requestAnimationFrame(flappyBird);
}

function moveUp()
{
	if(gameOver === true)
		gameOver = false;

	speed = -4;
	soundBird.play()
}

canvas.onclick = moveUp;
imgPipeBottom.onload = flappyBird;
