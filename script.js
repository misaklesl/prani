const door = document.getElementById('door');
const card = document.getElementById('card');
const wrap = document.getElementById('confetti-wrap');

let isOpen = false;
let confettiDone = false;

function openDoor() {
  if (isOpen) return;
  isOpen = true;
  door.classList.add('open');
  setTimeout(() => {
    card.classList.add('visible');
    if (!confettiDone) {
      spawnConfetti();
      confettiDone = true;
    }
  }, 350);
}

function closeDoor() {
  if (!isOpen) return;
  isOpen = false;
  card.classList.remove('visible');
  door.classList.remove('open');
}

door.addEventListener('click', () => isOpen ? closeDoor() : openDoor());
card.addEventListener('click', closeDoor);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') { e.preventDefault(); openDoor(); }
  if (e.key === 'ArrowLeft')  { e.preventDefault(); closeDoor(); }
});

const colors = [
  '#f87171', '#fb923c', '#fbbf24',
  '#34d399', '#2dd4bf', '#60a5fa',
  '#a78bfa', '#f472b6'
];

function spawnConfetti() {
  for (let i = 0; i < 40; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'cc';
      el.style.left = (Math.random() * 100) + '%';
      el.style.top = '-12px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.transform = 'rotate(' + (Math.random() * 180) + 'deg)';
      wrap.appendChild(el);

      const duration = 900 + Math.random() * 800;
      const endX = (Math.random() - 0.5) * 60;
      const endY = 100 + Math.random() * 180;

      el.animate([
        { opacity: 1, transform: `translate(0, 0) rotate(0deg)` },
        { opacity: 0, transform: `translate(${endX}px, ${endY}px) rotate(${Math.random() * 360}deg)` }
      ], { duration, easing: 'ease-in', fill: 'forwards' });

      setTimeout(() => el.remove(), duration + 100);
    }, i * 35);
  }
}
