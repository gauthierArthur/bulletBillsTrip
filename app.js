/*jeu créé par arthur gauthier alias l'arti'cho:) 
var up = 0;
var phrase ="premiers pas";
var calcul =1+1;
var resultat = "    le resultat ";
console.log(phrase);
console.log(resultat+calcul);
calcul=calcul+8;
console.log(resultat+calcul);
for(i=10; i >= 0; i--)
{
    if(i >0 ) {
        console.log("votre nombre de vie est: " + i);
    }
    else{
        console.log("Désolé vous n'avez plus de vie Looser ! :D ");
    }
}
for(j=0; j<=10;j++)
{
    if(j<10) {
        console.log("you loose :,( Try again !"+ j);
    }
    else {
        console.log ("you win §§§!");
    }
}
function flyUp()
{
    up=up+1;
console.log(up);
}
flyUp();
*/

/** Jeu **/
var obstacle;
var carre; 
function startGame(){
    myGameArea.start();
    carre= new component (30,30,"blue",10,120);
    obstacle= new component (10,200,"red",300,120);
}

/** creation du "canvas"
 myGameArea permets de cree le canvas **/
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
         this.interval = setInterval(updateGameArea, 20);
           window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })
    },  
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
// fonction detruisant les obstacles apres 20 ms
stop : function() {
    clearInterval(this.interval);
    console.log("hello crash");
}
}
/** creation du carrée et des obstacles **/
function component (width,height,color,x,y){
    this.width=width;
    this.height=height;
    this.x=x;
    this.y=y;
    this.update = function(){
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
},  
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    },  
this.crashWith = function (otherobj){
     var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
               (mytop > otherbottom) ||
               (myright < otherleft) ||
               (myleft > otherright)) {
           crash = false;
        }
        return crash;
    }

}

function updateGameArea() {
   if (carre.crashWith(obstacle)) {
        myGameArea.stop();
    } else {
        console.log("What else");
        myGameArea.clear();
        obstacle.update();
        carre.x += carre.speedX;
        carre.y += carre.speedY;    
        carre.update();
    }
}

function moveup() {
    carre.speedY = -1; 
}

function movedown() {
    carre.speedY = 1; 
}

function moveleft() {
    carre.speedX = -1; 
}

function moveright() {
    carre.speedX = 1; 
}

function clearmove() {
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
