let mode = 0;
let hits = 0;
let overlayOn = false;

let dvdX, dvdY;
let dvdVX = 2, dvdVY = 1.5;
let speedStep = 0.5;
let dvdW = 140, dvdH = 80;

let imgDVD, imgBird;

let hueVal = 0;
let c1;

let cx, cy;
let gridSize = 60;

let lastPulse = 0;


let padW = 26;
let padH = 120;

let birdX = 0, birdY = 0;
let birdSize = 120;
let birdChance = 0.01;

let birdAlpha = 0;
let birdTimer = 0;
let birdState = 0;



let trail = [];
let TRAIL_MAX = 18; 

function preload() {
  imgDVD = loadImage("images/dvd-logo-black-and-white.png");
  imgBird = loadImage("images/parrot_PNG731.png");
}


function setup() {
  createCanvas(800, 600);

  rectMode(CENTER);
  imageMode(CENTER);
  colorMode(HSB, 360, 100, 100, 255);
  noStroke();

  textFont("Arial");
  textSize(24);

  c1 = color(200, 80, 100);

  dvdX = width / 2;
  dvdY = height / 2;

  cx = width / 2;
  cy = height / 2;
}

function draw() {
  let pulse = 6 + (hits % 18);
  lastPulse = pulse;

  background(0, 0, 0, 40);


  switch (mode) {
    case 0:
      noCursor();
      runDVDBounceWithMousePaddle(pulse);
      updateBirdPopup();
      drawBirdPopup();
      break;

    case 1:
      cursor();
      runGridMode();
      break;

    case 2:
      cursor();
      runInfoMode();
      break;
  }


  

  if (hits > 300) hits = 0;
}

function runDVDBounceWithMousePaddle(pulse) {
  let padX = mouseX;
  let padY = mouseY;

  dvdX += dvdVX;
  dvdY += dvdVY;

  let hitWall = false;

  if (dvdX + dvdW / 2 >= width)  { dvdX = width - dvdW / 2; dvdVX *= -1; hitWall = true; }
  if (dvdX - dvdW / 2 <= 0)      { dvdX = dvdW / 2;         dvdVX *= -1; hitWall = true; }
  if (dvdY + dvdH / 2 >= height) { dvdY = height - dvdH / 2; dvdVY *= -1; hitWall = true; }
  if (dvdY - dvdH / 2 <= 0)      { dvdY = dvdH / 2;          dvdVY *= -1; hitWall = true; }

  if (hitWall) {
    hits++;
    hueVal = (hueVal + 35) % 360;
  }

  if (rectRectHit(dvdX, dvdY, dvdW, dvdH, padX, padY, padW, padH)) {
    let dx = dvdX - padX;
    let dy = dvdY - padY;

    if (abs(dx) > abs(dy)) dvdVX *= -1;
    else dvdVY *= -1;

    hits++;
    hueVal = (hueVal + 50) % 360;
  }

  trail.push({ x: dvdX, y: dvdY, p: pulse, h: hueVal });
  if (trail.length > TRAIL_MAX) trail.shift();

  drawDVDEchoTrail();

  fill(hueVal, 80, 100, 255);
  rect(dvdX, dvdY, dvdW + pulse, dvdH + pulse, 16);

  if (imgDVD) {
    image(imgDVD, dvdX, dvdY, dvdW + pulse, dvdH + pulse);
  } else {
    fill(0);
    textAlign(CENTER, CENTER);
    text("DVD", dvdX, dvdY);
  }

  fill(180, 80, 100, 255);
  rect(padX, padY, padW, padH, 8);
}

function drawDVDEchoTrail() {
  for (let i = 0; i < trail.length; i++) {
    let t = trail[i];

    let a = map(i, 0, trail.length - 1, 10, 150);

    fill(t.h, 80, 100, a);
    rect(t.x, t.y, dvdW + t.p, dvdH + t.p, 16);

    push();
    colorMode(RGB, 255);
    tint(255, 255, 255, a);
    if (imgDVD && imgDVD.width > 1) {
      image(imgDVD, t.x, t.y, dvdW + t.p, dvdH + t.p);
    }
    noTint();
    pop();
  }
}

function rectRectHit(x1, y1, w1, h1, x2, y2, w2, h2) {
  return (
    x1 + w1 / 2 > x2 - w2 / 2 &&
    x1 - w1 / 2 < x2 + w2 / 2 &&
    y1 + h1 / 2 > y2 - h2 / 2 &&
    y1 - h1 / 2 < y2 + h2 / 2
  );
}

function updateBirdPopup() {
  if (birdState === 0 && random(1) < birdChance) {
    birdX = random(80, width - 80);
    birdY = random(80, height - 80);
    birdAlpha = 0;
    birdState = 1;
  }

  if (birdState === 1) {
    birdAlpha += 1;
    if (birdAlpha >= 255) {
      birdAlpha = 255;
      birdTimer = 120;
      birdState = 2;
    }
  }
  else if (birdState === 2) {
    birdTimer--;
    if (birdTimer <= 0) birdState = 3;
  }
  else if (birdState === 3) {
    birdAlpha -= 1;
    if (birdAlpha <= 0) {
      birdAlpha = 0;
      birdState = 0;
    }
  }
}

function drawBirdPopup() {
  if (birdState === 0) return;

  push();

  colorMode(RGB, 255);
  tint(255, 255, 255, birdAlpha);

  image(imgBird, birdX, birdY, birdSize, birdSize);

  noTint();
  pop();
}

function runGridMode() {
  fill(0, 0, 100);
  textSize(18);
  text("Grid Mode — Use arrow keys to move stamp", 210, height - 40);

  if (imgBird) {
    image(imgBird, cx, cy, gridSize, gridSize);
  } else {
    fill(60, 80, 100);
    rect(cx, cy, gridSize, gridSize);
  }
}

function runInfoMode() {
  fill(120, 80, 100);
  textSize(32);
  text("Exercise 2 — DVD, Paddle, Bird, Echo", 110, 260);

  fill(0, 0, 100);
  textSize(18);
  text("1 — DVD Mode (echo + paddle)", 210, 320);
  text("2 — Grid Mode (arrow keys)", 210, 350);
  text("3 — Info Mode", 210, 380);
  text("Bird fades in/out in DVD Mode", 170, 420);
}

function mouseMoved() {
  hueVal = (hueVal + 2) % 360;
}

function mousePressed() {
  let clickW = dvdW + lastPulse;
  let clickH = dvdH + lastPulse;

  if (
    mouseX > dvdX - clickW / 2 &&
    mouseX < dvdX + clickW / 2 &&
    mouseY > dvdY - clickH / 2 &&
    mouseY < dvdY + clickH / 2
  ) {
    dvdVX *= -1;
    dvdVY *= -1;
  }

  overlayOn = !overlayOn;
}

function keyPressed() {
  if (key === '1') mode = 0;
  if (key === '2') mode = 1;
  if (key === '3') mode = 2;

  if (key === 't' || key === 'T') overlayOn = !overlayOn;

  if (mode === 1) {
    if (keyCode === LEFT_ARROW)  cx -= gridSize;
    if (keyCode === RIGHT_ARROW) cx += gridSize;
    if (keyCode === UP_ARROW)    cy -= gridSize;
    if (keyCode === DOWN_ARROW)  cy += gridSize;
  }

  if (key === '+' || key === '=') {
    dvdVX += speedStep;
    dvdVY += speedStep;
  }

  if (key === '-' || key === '_') {
    dvdVX -= speedStep;
    dvdVY -= speedStep;
  }

  if (key === 'r' || key === 'R') {
    dvdVX = 2;
    dvdVY = 1.5;
  }
}

