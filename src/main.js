import './style.css';

const lavaLamp = document.getElementById('lava-lamp');

// Base colors for the orbs (classic lava lamp vibes)
const baseColors = [
  '#00ff87', // Neon Green
  '#60efff', // Cyan
  '#ff007f', // Pink
  '#7000ff', // Purple
  '#ff8c00', // Orange
];

// Configuration for generating orbs
const numOrbs = 15;

function createOrb() {
  const orb = document.createElement('div');
  orb.classList.add('orb');
  
  // Random size between 100px and 400px
  const size = Math.random() * 300 + 100;
  orb.style.width = `${size}px`;
  orb.style.height = `${size}px`;
  
  // Random starting position
  const startX = Math.random() * 100;
  const startY = Math.random() * 100;
  orb.style.left = `${startX}vw`;
  orb.style.top = `${startY}vh`;
  
  // Random base color
  const color = baseColors[Math.floor(Math.random() * baseColors.length)];
  orb.style.background = color;
  
  // Random float animation
  const floatAnim = `float-${Math.floor(Math.random() * 3) + 1}`;
  const floatDuration = Math.random() * 20 + 15; // 15s to 35s
  
  // The psychedelic color transition (hue-rotate)
  const colorDuration = Math.random() * 15 + 10; // 10s to 25s
  
  // Combine animations
  orb.style.animation = `
    ${floatAnim} ${floatDuration}s ease-in-out infinite alternate,
    trippy-colors ${colorDuration}s linear infinite
  `;
  
  lavaLamp.appendChild(orb);
}

// Initialize orbs
for (let i = 0; i < numOrbs; i++) {
  createOrb();
}

// Add an interactive element: Orbs loosely follow mouse
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// An extra giant orb that follows the mouse to create interactive gooey effects
const interactiveOrb = document.createElement('div');
interactiveOrb.classList.add('orb');
interactiveOrb.style.width = '500px';
interactiveOrb.style.height = '500px';
interactiveOrb.style.background = '#ff003c';
interactiveOrb.style.animation = 'trippy-colors 20s linear infinite';
interactiveOrb.style.pointerEvents = 'none'; // Don't block other events
lavaLamp.appendChild(interactiveOrb);

function animateInteractiveOrb() {
  // Smoothly move the interactive orb towards the mouse
  const currentLeft = parseFloat(interactiveOrb.style.left || 0);
  const currentTop = parseFloat(interactiveOrb.style.top || 0);
  
  // Center the orb on the mouse
  const targetLeft = mouseX - 250; 
  const targetTop = mouseY - 250;
  
  const newLeft = currentLeft + (targetLeft - currentLeft) * 0.05;
  const newTop = currentTop + (targetTop - currentTop) * 0.05;
  
  interactiveOrb.style.left = `${newLeft}px`;
  interactiveOrb.style.top = `${newTop}px`;
  
  requestAnimationFrame(animateInteractiveOrb);
}

animateInteractiveOrb();
