let canvas = document.getElementById("miCanvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/2;
let y = canvas.height -30;
let dx = -2;
let dy = -2;
let radioBola = 10;
let raquetaheight = 10;
let raquetaWidth = 100;
let raquetaX = (canvas.width-raquetaWidth)/2;
let moverDerecha = false;
let moverIzquierda = false;
let cantidadLadrillosFila = 3;
let cantidadLadrillosColumnas = 10;
let ladrilloWidth = 100;
let ladrilloHeight = 20;
let ladrilloPadding = 10;
let ladrilloMargenTop = 30;
let ladrilloMargenIzquierda = 30;
let score = 0


let ladrillos = []
for (c = 0; c < cantidadLadrillosColumnas; c++){
    ladrillos[c] = [];
    for (f = 0; f < cantidadLadrillosFila; f++){
        ladrillos[c][f] = { x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown", presionar, false);
document.addEventListener("keyup", soltar, false);

function presionar(e){
    if(e.keyCode == 39){
        moverDerecha = true;
    }
    else if (e.keyCode == 37){
        moverIzquierda = true;
    }
}
function soltar(e){
    if(e.keyCode == 39){
        moverDerecha = false;
    }
    else if (e.keyCode == 37){
        moverIzquierda = false;
    }
}

function deteccionColision(){
    for ( c = 0; c < cantidadLadrillosColumnas; c++){
        for ( f = 0; f < cantidadLadrillosFila; f++){
            let n = ladrillos[c][f]
            if (n.status == 1){
                if ( x > n.x && x < (n.x + ladrilloWidth) && y > n.y && y < (n.y + ladrilloHeight)){
                    dy = -dy
                    n.status = 0
                    score++;
                    if (score == cantidadLadrillosFila*cantidadLadrillosColumnas){
                        alert("Ganaste!")
                        document.location.reload()
                    }
                }
            }
        }
    }
}

function dibujarScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function dibujarRaqueta(){
    ctx.beginPath()
    ctx.rect(raquetaX, canvas.height-raquetaheight, raquetaWidth, raquetaheight)
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.closePath();
}

function dibujarPelota(){
    ctx.beginPath();
    ctx.arc(x, y, radioBola, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function dibujarLadrillos(){
    for( c = 0; c < cantidadLadrillosColumnas; c++){
        for( f = 0; f < cantidadLadrillosFila; f++){
            if(ladrillos[c][f].status == 1){
                let ladrilloX = (c*(ladrilloWidth + ladrilloPadding)) + ladrilloMargenIzquierda;
                let ladrilloY = (f*(ladrilloHeight + ladrilloPadding)) + ladrilloMargenTop;
                ladrillos[c][f].x = ladrilloX;
                ladrillos[c][f].y = ladrilloY;
                ctx.beginPath();
                ctx.rect( ladrilloX, ladrilloY, ladrilloWidth, ladrilloHeight);
                ctx.fillStyle = "red";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function dibujar(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dibujarPelota()
    dibujarRaqueta()
    dibujarLadrillos()
    deteccionColision()
    dibujarScore()
    if (y + dy < radioBola){
        dy = -dy;
    } else if (y + dy > canvas.height-radioBola){
        if(x > raquetaX && x < raquetaX + raquetaWidth){
            dy = -dy*1.05
        }
        else{
            alert("game over")
            document.location.reload()
        }
    } 
    if (x + dx > canvas.width-radioBola || x + dx < radioBola){
        dx = -dx
    }

    if(moverDerecha && raquetaX < canvas.width-raquetaWidth) {
        raquetaX += 7;
    }
    else if(moverIzquierda && raquetaX > 0) {
        raquetaX -= 7;
    }
    x += dx;
    y += dy;
    requestAnimationFrame(dibujar);
}
dibujar()