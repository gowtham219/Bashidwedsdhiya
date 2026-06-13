// BACKGROUND MUSIC (autoplay with fallback for browser restrictions)
try {
  const bgMusic = document.getElementById("bgMusic");
  bgMusic.volume = 0.6;

  function tryPlayMusic(){
    bgMusic.play().catch(()=>{
      // Autoplay blocked — start on first user interaction
      const startOnInteract = () => {
        bgMusic.play();
        document.removeEventListener("click", startOnInteract);
        document.removeEventListener("touchstart", startOnInteract);
      };
      document.addEventListener("click", startOnInteract);
      document.addEventListener("touchstart", startOnInteract);
    });
  }

  tryPlayMusic();
} catch(e) { console.error("Music error:", e); }

// INTRO TRANSITION
try {
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
} catch(e) { console.error("Intro error:", e); }

// HEART CANVAS
try {
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
} catch(e) { console.error("Heart canvas error:", e); }

// COUNTDOWN
try {
  const target = new Date("July 19, 2026 12:00:00").getTime();

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
} catch(e) { console.error("Countdown error:", e); }

// FLOATING PETALS & HEARTS
let spawnFloatItem = () => {};
try {
  const floatContainer = document.getElementById("floatingElements");
  const items = ["🌸","💗","🌺","💕","🌷"];

  spawnFloatItem = function(){
    const el = document.createElement("div");
    el.className = "floatItem";
    el.textContent = items[Math.floor(Math.random()*items.length)];

    el.style.left = Math.random()*100 + "vw";
    el.style.fontSize = (14 + Math.random()*16) + "px";
    el.style.animationDuration = (8 + Math.random()*10) + "s";
    el.style.animationDelay = (Math.random()*5) + "s";

    floatContainer.appendChild(el);

    setTimeout(()=> el.remove(), 20000);
  };

  setInterval(spawnFloatItem, 800);
  for(let i=0;i<8;i++) spawnFloatItem();
} catch(e) { console.error("Floating petals error:", e); }

// RSVP CELEBRATION
try {
  const overlay = document.getElementById("celebrationOverlay");
  const confettiCanvas = document.getElementById("confettiCanvas");
  const cctx = confettiCanvas.getContext("2d");
  const rsvpYes = document.getElementById("rsvpYes");
  const rsvpNo = document.getElementById("rsvpNo");
  const closeCelebration = document.getElementById("closeCelebration");

  let confettiPieces = [];
  let confettiAnimId = null;

  function resizeConfettiCanvas(){
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeConfettiCanvas);
  resizeConfettiCanvas();

  function createConfetti(){
    resizeConfettiCanvas();
    confettiPieces = [];

    const colors = ["#ffd27d","#ff4d8d","#ffffff","#c8a45d","#ffe6b3"];
    const emojis = ["💛","🌸","💕","🌺","💗","🌷","✨"];
    const centerX = confettiCanvas.width/2;
    const centerY = confettiCanvas.height/2;

    for(let i=0;i<160;i++){
      const angle = Math.random()*Math.PI*2;
      const speed = 4 + Math.random()*10;
      const isEmoji = Math.random() < 0.35;

      confettiPieces.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle)*speed,
        vy: Math.sin(angle)*speed,
        size: isEmoji ? (16 + Math.random()*14) : (5 + Math.random()*6),
        color: colors[Math.floor(Math.random()*colors.length)],
        emoji: isEmoji ? emojis[Math.floor(Math.random()*emojis.length)] : null,
        rotation: Math.random()*360,
        rotationSpeed: (Math.random()-0.5)*10,
        gravity: 0.15 + Math.random()*0.1,
        opacity: 1
      });
    }
  }

  function animateConfetti(){
    cctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

    let stillVisible = false;

    confettiPieces.forEach(p=>{
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.006;

      if(p.opacity > 0){
        stillVisible = true;

        cctx.save();
        cctx.translate(p.x, p.y);
        cctx.rotate(p.rotation*Math.PI/180);
        cctx.globalAlpha = Math.max(p.opacity,0);

        if(p.emoji){
          cctx.font = p.size + "px serif";
          cctx.textAlign = "center";
          cctx.textBaseline = "middle";
          cctx.fillText(p.emoji, 0, 0);
        } else {
          cctx.fillStyle = p.color;
          cctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
        }

        cctx.restore();
      }
    });

    if(stillVisible){
      confettiAnimId = requestAnimationFrame(animateConfetti);
    } else {
      cctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
    }
  }

  function showCelebration(){
    overlay.classList.add("show");
    createConfetti();
    if(confettiAnimId) cancelAnimationFrame(confettiAnimId);
    animateConfetti();

    for(let i=0;i<25;i++) spawnFloatItem();
  }

  function hideCelebration(){
    overlay.classList.remove("show");
    if(confettiAnimId){
      cancelAnimationFrame(confettiAnimId);
      confettiAnimId = null;
    }
    cctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  }

  if(rsvpYes) rsvpYes.addEventListener("click", showCelebration);
  if(closeCelebration) closeCelebration.addEventListener("click", hideCelebration);

  overlay.addEventListener("click", (e)=>{
    if(e.target === overlay){
      hideCelebration();
    }
  });

  if(rsvpNo) rsvpNo.addEventListener("click", ()=>{
    // intentionally no action
  });
} catch(e) { console.error("RSVP celebration error:", e); }
