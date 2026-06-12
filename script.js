const intro = document.getElementById("intro");
const app = document.getElementById("app");

setTimeout(() => {
  intro.style.opacity = "0";

  setTimeout(() => {
    intro.remove();
    app.style.display = "block";

    requestAnimationFrame(() => {
      app.style.opacity = "1";
    });

  }, 900);

}, 2500);


// HEART
const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let t = 0;

function heart(x){
  return {
    x:16*Math.pow(Math.sin(x),3),
    y:13*Math.cos(x)-5*Math.cos(2*x)-2*Math.cos(3*x)-Math.cos(4*x)
  };
}

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.beginPath();

  for(let i=0;i<t;i++){
    let p = heart(i*0.05);

    let x = canvas.width/2 + p.x*10;
    let y = canvas.height/2 - p.y*10;

    if(i===0) ctx.moveTo(x,y);
    else ctx.lineTo(x,y);
  }

  ctx.strokeStyle="rgba(255,210,125,0.9)";
  ctx.lineWidth=2.5;
  ctx.shadowBlur=15;
  ctx.shadowColor="#ffd27d";

  ctx.stroke();

  if(t<180) t++;

  requestAnimationFrame(draw);
}
draw();


// COUNTDOWN
const target = new Date("July 13, 2026 12:00:00").getTime();

function updateCountdown(){
  const now = Date.now();
  const diff = target - now;

  if(diff <= 0){
    document.querySelector(".countdownBox").innerHTML =
      "<h2 style='color:#ffd27d'>💍 Happily Married</h2>";
    return;
  }

  document.getElementById("days").textContent = Math.floor(diff/86400000);
  document.getElementById("hours").textContent = Math.floor((diff/3600000)%24);
  document.getElementById("mins").textContent = Math.floor((diff/60000)%60);
  document.getElementById("secs").textContent = Math.floor((diff/1000)%60);
}

setInterval(updateCountdown,1000);
updateCountdown();