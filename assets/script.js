// Simple interactivity:
// - floating hearts background
// - typing effect
// - reveal message and music control

// ---------- Hearts background ----------
const heartsContainer = document.getElementById('hearts');

function spawnHeart(){
  const h = document.createElement('div');
  h.className = 'heart';
  const size = Math.random()*18 + 12; // 12-30px
  h.style.width = h.style.height = size + 'px';
  const startX = window.innerWidth * (0.3 + Math.random()*0.4);
  h.style.left = startX + 'px';
  h.style.top = (window.innerHeight + 20) + 'px';
  heartsContainer.appendChild(h);

  const driftX = (Math.random()-0.5) * 300;
  const rise = - (window.innerHeight + 200) - Math.random()*200;
  const duration = 6000 + Math.random()*6000;

  h.animate([
    { transform: `translate3d(0,0,0) scale(1)`, opacity: 1 },
    { transform: `translate3d(${driftX}px, ${rise}px, 0) scale(${0.7 + Math.random()*0.6})`, opacity: 0.08 }
  ], {
    duration,
    easing: 'ease-out',
    iterations: 1,
    fill: 'forwards'
  });

  setTimeout(()=> h.remove(), duration + 50);
}

setInterval(spawnHeart, 450);

// ---------- Typing effect ----------
const messageLines = [
  "Hi there...",
  "I made something small just for you.",
  "Click 'Open my message' when you're ready."
];

const typedEl = document.getElementById('typed');

function typeLines(lines, el, speed = 35){
  el.textContent = '';
  function typeLine(i){
    const line = lines[i];
    let char = 0;
    function step(){
      if(char <= line.length){
        el.textContent = line.slice(0,char) + (char % 2 ? '|' : '');
        char++;
        setTimeout(step, speed + Math.random()*30);
      } else {
        if(i+1 < lines.length){
          el.textContent = el.textContent.replace(/\|$/, '') + '\n';
          setTimeout(()=> typeLine(i+1), 500);
        } else {
          el.textContent = el.textContent.replace(/\|$/, '');
        }
      }
    }
    step();
  }
  typeLine(0);
}

typeLines(messageLines, typedEl);

// ---------- Reveal message and music ----------
const revealBtn = document.getElementById('revealBtn');
const revealBox = document.getElementById('reveal');
const bgMusic = document.getElementById('bg-music');
const playBtn = document.getElementById('playBtn');

revealBtn.addEventListener('click', ()=> {
  revealBox.classList.remove('hidden');
  revealBox.scrollIntoView({behavior:'smooth', block:'center'});
});

playBtn.addEventListener('click', ()=> {
  if(!bgMusic) return;
  if(bgMusic.paused){
    bgMusic.play().catch(()=>{});
    playBtn.textContent = 'Pause music ▮▮';
  } else {
    bgMusic.pause();
    playBtn.textContent = 'Play music ♫';
  }
});

document.getElementById('yesBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  alert('Yay! 💖 I knew it! Replace this with a nicer animation or redirect.');
});
document.getElementById('noBtn').addEventListener('click', (e)=>{
  e.preventDefault();
  alert('No worries — you can always come back later 🙂');
});
