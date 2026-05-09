import './style.css';

const lavaLamp = document.getElementById('lava-lamp');

// Create the wax blobs
const numOrbs = 18;

function createOrb() {
  const orb = document.createElement('div');
  orb.classList.add('orb');
  
  // Varied sizes for splitting/merging effect (100px to 450px)
  const size = Math.random() * 350 + 100;
  orb.style.width = `${size}px`;
  orb.style.height = `${size}px`;
  
  // Random horizontal distribution
  const startX = Math.random() * 100;
  orb.style.left = `${startX}vw`;
  
  // Start near the bottom (tungsten bulb) or top (cooling off)
  const startY = Math.random() > 0.5 ? (100 + Math.random() * 20) : (-20 - Math.random() * 20);
  orb.style.top = `${startY}vh`;
  
  // Convection current animation (Slow rising or sinking)
  // The physics of lava lamps: hot wax rises, cools at top, and sinks.
  const isRising = startY > 50;
  
  const endY = isRising ? (-20 - Math.random() * 30) : (100 + Math.random() * 30);
  const endX = startX + (Math.random() * 20 - 10); // Slight horizontal drift
  
  // Explicit slowness (40s to 90s per movement)
  const duration = Math.random() * 50000 + 40000;
  
  // We use the Web Animations API (WAAPI) for smoother control over long physics-like movements
  orb.animate(
    [
      { transform: `translate(0, 0) scale(1)` },
      { transform: `translate(${endX - startX}vw, ${endY - startY}vh) scale(${0.8 + Math.random() * 0.5})` }
    ], 
    {
      duration: duration,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out' // Simulates acceleration near heat source and deceleration at top
    }
  );
  
  lavaLamp.appendChild(orb);
}

// Generate the initial convection cycle
for (let i = 0; i < numOrbs; i++) {
  createOrb();
}

// Add a few stationary/slow background blobs to create the illusion of depth (shallow depth of field)
for (let i = 0; i < 5; i++) {
  const depthOrb = document.createElement('div');
  depthOrb.classList.add('orb');
  const size = Math.random() * 500 + 300;
  depthOrb.style.width = `${size}px`;
  depthOrb.style.height = `${size}px`;
  depthOrb.style.left = `${Math.random() * 100}vw`;
  depthOrb.style.top = `${Math.random() * 100}vh`;
  depthOrb.style.opacity = '0.4'; // Out of focus / in the background
  depthOrb.style.filter = 'blur(15px)'; // Shallow depth of field effect
  
  depthOrb.animate(
    [
      { transform: `translate(0, 0)` },
      { transform: `translate(${Math.random() * 10 - 5}vw, ${Math.random() * 20 - 10}vh)` }
    ], 
    {
      duration: 80000,
      iterations: Infinity,
      direction: 'alternate',
      easing: 'ease-in-out'
    }
  );
  
  lavaLamp.appendChild(depthOrb);
}
