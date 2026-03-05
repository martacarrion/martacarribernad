const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

const PARTICLE_COUNT = 120;

// posición del ratón
let mouse = {
x: canvas.width / 2,
y: canvas.height / 2
};

// estrella luciérnaga
let firefly = {
x: canvas.width / 2,
y: canvas.height / 2,
size: 3
};

// partículas normales
for(let i=0;i<PARTICLE_COUNT;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

size:Math.random()*1.8,

speedX:(Math.random()-0.5)*0.25,
speedY:(Math.random()-0.5)*0.25

});

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height);

// mover partículas
particles.forEach(p=>{

p.x+=p.speedX;
p.y+=p.speedY;

if(p.x<0||p.x>canvas.width)p.speedX*=-1;
if(p.y<0||p.y>canvas.height)p.speedY*=-1;

// interacción con ratón
let dx = p.x - mouse.x;
let dy = p.y - mouse.y;
let distance = Math.sqrt(dx*dx + dy*dy);

let radius = 120;

if(distance < radius){

let force = (radius - distance) / radius;

p.x += dx * force * 0.02;
p.y += dy * force * 0.02;

}

ctx.fillStyle="rgba(255,255,255,0.9)";

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fill();

});

// movimiento suave hacia el ratón
firefly.x += (mouse.x - firefly.x) * 0.12;
firefly.y += (mouse.y - firefly.y) * 0.12;
firefly.y += Math.sin(Date.now()*0.003)*0.3;

// brillo
// variación para que no sea perfecta
let flicker = 18 + Math.sin(Date.now()*0.005)*4;

let glow = ctx.createRadialGradient(
firefly.x,
firefly.y,
0,
firefly.x,
firefly.y,
flicker
);

glow.addColorStop(0,"rgba(255,255,200,1)");
glow.addColorStop(0.4,"rgba(255,240,150,0.6)");
glow.addColorStop(1,"rgba(255,240,150,0)");

ctx.fillStyle = glow;

ctx.beginPath();
ctx.arc(firefly.x,firefly.y,20,0,Math.PI*2);
ctx.fill();

// estrella central
// centro irregular
ctx.fillStyle="rgba(255,255,220,1)";
ctx.beginPath();
ctx.arc(
firefly.x + Math.random()*0.8-0.4,
firefly.y + Math.random()*0.8-0.4,
firefly.size + Math.random()*0.4,
0,
Math.PI*2
);
ctx.fill();

requestAnimationFrame(animate);

}

animate();

// detectar ratón
window.addEventListener("mousemove",(e)=>{

mouse.x = e.clientX;
mouse.y = e.clientY;

});

window.addEventListener("resize",()=>{

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

});