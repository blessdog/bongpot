import './style.css';

const canvas = document.getElementById('lava-lamp');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

// Add film grain texture pattern to be drawn on top
const grainCanvas = document.createElement('canvas');
const grainCtx = grainCanvas.getContext('2d');
grainCanvas.width = 200;
grainCanvas.height = 200;

// Generate static noise for the 1970s film grain look
for (let x = 0; x < grainCanvas.width; x++) {
  for (let y = 0; y < grainCanvas.height; y++) {
    const val = Math.floor(Math.random() * 255);
    grainCtx.fillStyle = `rgba(${val}, ${val}, ${val}, 0.05)`;
    grainCtx.fillRect(x, y, 1, 1);
  }
}
const grainPattern = ctx.createPattern(grainCanvas, 'repeat');

const numOrbs = 8;
const orbs = [];

for (let i = 0; i < numOrbs; i++) {
  orbs.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 150 + 100, // 100px to 250px radius
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 1.5,
  });
}

function animate() {
  requestAnimationFrame(animate);
  
  // Clear the canvas
  ctx.clearRect(0, 0, width, height);
  
  // Use screen blending for optical merging of translucent wax
  ctx.globalCompositeOperation = 'screen';
  
  for (let orb of orbs) {
    // Very slow convection physics
    // If near top, start sinking
    if (orb.y < height * 0.3) {
      orb.vy += 0.005;
    } 
    // If near bottom, start rising
    else if (orb.y > height * 0.7) {
      orb.vy -= 0.005;
    }
    
    // Add random horizontal drift
    orb.vx += (Math.random() - 0.5) * 0.02;
    
    // Dampen velocities to keep it super slow and cinematic
    orb.vx *= 0.99;
    orb.vy *= 0.995;
    
    // Apply velocity
    orb.x += orb.vx;
    orb.y += orb.vy;
    
    // Keep horizontally constrained
    if (orb.x < -orb.radius) orb.x = width + orb.radius;
    if (orb.x > width + orb.radius) orb.x = -orb.radius;
    
    // Subsurface scattering gradient
    // Center is offset slightly to simulate the backlit effect
    const gradient = ctx.createRadialGradient(
      orb.x - orb.radius * 0.2, orb.y - orb.radius * 0.2, 0,
      orb.x, orb.y, orb.radius
    );
    
    // Deep crimson / magenta wax fading to transparent
    gradient.addColorStop(0, '#ff4b1f'); // Hot center
    gradient.addColorStop(0.4, '#ff003c'); // Crimson mid
    gradient.addColorStop(0.75, 'rgba(128, 0, 32, 0.8)'); // Dark red outer edge
    gradient.addColorStop(1, 'transparent'); // Fade out for soft optical blending
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  
  // Draw film grain overlay
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = grainPattern;
  ctx.fillRect(0, 0, width, height);
}

animate();
