let img;
const detail = 1;
let particles = [];
let grid = [];
let particleImage;
let ctx;
function preload() {
  img = loadImage('https://i.imgur.com/wc9DPQ7.jpg?1');
}


class Particle {
  constructor (x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.prevX = this.x;
    this.speed = 0;
    this.v = random(0, 0.7);
  }
  
  update (speed) {
    if (grid.length) {
      this.speed = grid[floor(this.y / detail)][floor(this.x / detail)] * 0.97;
    }
    this.x += (1 - this.speed) * 3 + this.v;
    
    if (this.x > width) {
      this.x = 0;
    }
  }
  
  draw () {
    image(particleImage, this.x, this.y);
  }
}

/* ====== STEP 6 ====== */
function goToStep6 () {
  clear();
  ctx.globalAlpha = 1;
  loop();
  image(img, 0, 0, width, height);
  loadPixels();
  clear();
  noStroke();
  
  grid = [];
  for (let y = 0; y < height; y+=detail) {
    let row = [];
    for (let x = 0; x < width; x+=detail) {
      const r = pixels[(y * width + x) * 4];
      const g = pixels[(y * width + x) * 4 + 1];
      const b = pixels[(y * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = brightness(_color) / 100;
      row.push(_brightness);
    }
    grid.push(row);
  }
  
  particles = [];
  for (let i = 0; i < 3000; i++) {
    particles.push(new Particle(null, (i/3000) * height));
  }
}

function step6 () {
  ctx.globalAlpha = 0.05;
  fill(0);
  rect(0,0,width,height);
  ctx.globalAlpha = 0.2;
  particles.forEach(p => {
    p.update();
    ctx.globalAlpha = p.speed * 0.3;
    p.draw();
  });
}

function setup () {
  const canvas = createCanvas(350,350);
  canvas.parent('canvas');
  ctx = canvas.drawingContext;
  
  pixelDensity(1);
  
  particleImage = createGraphics(8, 8);
  particleImage.fill(255);
  particleImage.noStroke();
  particleImage.circle(3, 3, 3);
  
  if (window['goToStep6']) {
    window['goToStep6']();
  }
  draw();
}

function draw () {
  window['step6']();
}
