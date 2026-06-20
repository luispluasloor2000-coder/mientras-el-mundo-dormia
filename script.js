/*==========================================================

MIENTRAS EL MUNDO DORMÍA
Versión 0.1

==========================================================*/

/*=========================
ELEMENTOS
=========================*/

const intro = document.getElementById("intro");

const letterScene = document.getElementById("letterScene");

const startButton = document.getElementById("startButton");

const paper = document.getElementById("paper");

const music = document.getElementById("music");

const sky = document.getElementById("sky");

const ctx = sky.getContext("2d");

/*=========================
CANVAS
=========================*/

let width;
let height;

function resizeCanvas(){

    width = sky.width = window.innerWidth;

    height = sky.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize",resizeCanvas);

/*=========================
ESTRELLAS
=========================*/

const stars=[];

for(let i=0;i<220;i++){

    stars.push({

        x:Math.random()*width,

        y:Math.random()*height,

        radius:Math.random()*2,

        alpha:Math.random(),

        speed:0.002+Math.random()*0.004,

        direction:Math.random()>0.5?1:-1

    });

}

/*=========================
DIBUJAR ESTRELLAS
=========================*/

function drawStars(){

    ctx.clearRect(0,0,width,height);

    stars.forEach(star=>{

        star.alpha+=star.speed*star.direction;

        if(star.alpha>=1){

            star.direction=-1;

        }

        if(star.alpha<=0.15){

            star.direction=1;

        }

        ctx.beginPath();

        ctx.fillStyle=`rgba(255,255,255,${star.alpha})`;

        ctx.arc(

            star.x,

            star.y,

            star.radius,

            0,

            Math.PI*2

        );

        ctx.fill();

    });

    requestAnimationFrame(drawStars);

}

drawStars();

/*=========================
ABRIR CARTA
=========================*/

startButton.addEventListener("click",()=>{

    intro.classList.remove("active");

    letterScene.classList.add("active");

    paper.classList.add("show");

    if(music){

        music.volume=0;

        music.play().catch(()=>{});

        fadeMusic();

    }

});

/*==========================================================

FADE DE LA MÚSICA

==========================================================*/

function fadeMusic(){

    const timer=setInterval(()=>{

        if(music.volume<0.35){

            music.volume+=0.01;

        }else{

            clearInterval(timer);

        }

    },180);

}

/*==========================================================

MÁQUINA DE ESCRIBIR

==========================================================*/

const paragraphs=document.querySelectorAll("#paperContent p");

const title=document.querySelector("#paperContent h2");

const signature=document.querySelector(".signature");

const love=document.querySelector(".love");

const all=[title,...paragraphs,love,signature];

const originals=[];

all.forEach(item=>{

    originals.push(item.innerHTML);

    item.innerHTML="";

    item.style.opacity="1";

});

/*==========================================================

ESCRIBIR TEXTO

==========================================================*/

let current=0;

function writeNext(){

    if(current>=all.length){

        return;

    }

    typeText(

        all[current],

        originals[current],

        ()=>{

            current++;

            setTimeout(writeNext,450);

        }

    );

}

/*==========================================================

EFECTO DE ESCRITURA

==========================================================*/

function typeText(element,text,callback){

    let i=0;

    const timer=setInterval(()=>{

        element.innerHTML=text.substring(0,i);

        paper.scrollTop=paper.scrollHeight;

        i++;

        if(i>text.length){

            clearInterval(timer);

            callback();

        }

    },22);

}

/*==========================================================

BOTÓN

==========================================================*/

startButton.addEventListener("click",()=>{

    setTimeout(()=>{

        writeNext();

    },900);

});
