var myGamePiece;
var myObstacles =[];
var myScore;
var bounce;
var myMusic;
var crashSound;
var loose;
var intScore = 0;
function startGame() {
    myGamePiece = new component(30, 30, "Flappy_Bird.png", 10, 120, "image");
    myGamePiece.gravity = 0.05;
    myScore = new component("25px", "Consolas", "black", 280, 40, "text");
    myMusic = new sound("startMusic.wav");
    bounce = new sound("fly.wav");
    crashSound = new sound("crash.wav")
    myMusic.play();
    myGameArea.start();

}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        this.frameNo = 0;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        loose = true;
        clearInterval(this.interval);
        myGamePiece.image.src = "explosion.png";
        crashSound.play();
        myMusic.stop();
         console.log("Looser");
        return loose;
    }

}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}
function component(width, height, color, x, y,type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }
       this.newPos = function () {
           this.gravitySpeed += this.gravity;
           this.x += this.speedX;
           this.y += this.speedY + this.gravitySpeed;
           this.hitBottom();
           this.hitTop();
       }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            console.log("Crash Bottom");
            myGameArea.stop();
        }
    }
        this.hitTop = function() {
            var rockTop = myGameArea.canvas.height;
            if (this.y < 0) {
                this.y = 0;
            }
        }
        this.crashWith = function (otherobj) {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var otherleft = otherobj.x;
            var otherright = otherobj.x + (otherobj.width);
            var othertop = otherobj.y;
            var otherbottom = otherobj.y + (otherobj.height);
            var crash = true;


            if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
                crash = false;
            }
            return crash;
        }
    }
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}
function updateGameArea() {

    var x, y;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
        }
    }
    document.body.onkeyup = function(e){
        if(e.keyCode == 32){
            accelerate(0.05);
        }
    }
    document.body.onkeydown = function(e){
        if(e.keyCode == 13){
            restart();
        }
    }
    document.body.onkeydown = function(e){
        if(e.keyCode == 32){

            accelerate(-0.2);
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
        minGap = 50;
        maxGap = 200;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        myObstacles.push(new component(50, height, "tubeUp.png", x, 0, "image"));
        myObstacles.push(new component(50, x - height - gap, "tubeBottom.png", x, height + gap, "image"));
    }
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
    if (myGameArea.keys && myGameArea.keys[38]) {
        accelerate(-0.2);
        accelerate(0.05);
    }
    else {

    }


        myScore.text = "Score: " + myGameArea.frameNo;
        myScore.update();



    myGamePiece.newPos();
    myGamePiece.update();
}

function checkKeyPressed(e) {
    if (e.keyCode == "32") {
        console.log("The 'a' key is pressed.");
    }
}
function returnKeyPressed(e) {
    if (e.keyCode == "13") {
        restart();
    }
}

function accelerate(n) {

    if (!myGameArea.interval) {myGameArea.interval = setInterval(updateGameArea, 20);}
    console.log("Accelerate");
    myGamePiece.gravity = n;
    bounce.play();
}


function clearmove() {

    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    }

function mute(){
    myMusic.stop();
}
function unmute(){
    myMusic.play();
}
function restart() {
    if (loose==true)
        location.reload(true);
}
