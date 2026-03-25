let bird1lox, bird1loy, bird1SpeedX, bird1SpeedY;
let bird2lox, bird2loy, bird2SpeedX, bird2SpeedY;
let counter = 0;
let stars = [];

let c1, c2, c3, c4;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);

c1 = color(220, 40, 40);   
c2 = color(40, 80, 220);    
c3 = color(40, 160, 60);    
c4 = color(220, 200, 40);   

  for (let i = 0; i < 120; i++) {
    stars.push({
      x: random(width),
      y: random(height * 0.75),
      size: random(1, 3.5),
      bright: random(150, 255)
    });
  }

  bird1lox = width / 2;
  bird1loy = height / 2;
  bird1SpeedX = random(2, 4);
  bird1SpeedY = random(2, 4);

  bird2lox = 100;
  bird2loy = 150;
  bird2SpeedX = random(-3, -1);
  bird2SpeedY = random(1, 3);
}

function draw() {
  background(18, 18, 40);
  mrStars();
  mrMoon();
  mrGround();

  counter += 0.5;

  if (bird1lox < 50 || bird1lox > width - 50) bird1SpeedX *= -1;
  if (bird1loy < 50 || bird1loy > height - 50) bird1SpeedY *= -1;
  bird1lox += bird1SpeedX;
  bird1loy += bird1SpeedY;

if (bird2lox < 0) bird2lox = width;
if (bird2lox > width) bird2lox = 0;
if (bird2loy < 0) bird2loy = height;
if (bird2loy > height) bird2loy = 0;
bird2lox += bird2SpeedX;
bird2loy += bird2SpeedY;

  mrBird(bird1lox, bird1loy, counter * 0.2, 1.0, c1);
  mrBird(bird2lox, bird2loy, -counter * 0.2, 0.85, c2);
  mrFancyBird(490, 508, counter * 0.1, 1.0 + sin(counter) * 0.05, c3);
  mrBird(265, 548, -counter * 0.1, 0.65 + sin(counter) * 0.05, c4);
}

function mrBird(lx, ly, rot, sc, k) {
  push();
  translate(lx, ly);
  rotate(rot);
  scale(sc);
  mrBirdTail(k, 0, 28);
  mrBirdBody(k);
  mrBirdWing(k, 0, 5);
  mrBirdHead(k, 18, -38);
  mrBirdFeet(-10, 46);
  mrBirdFeet(10, 46);
  pop();
}

function mrFancyBird(lx, ly, rot, sc, k) {
  push();
  translate(lx, ly);
  rotate(rot);
  scale(sc);
  mrBirdTail(k, 0, 28);
  mrBirdBody(k);
  mrBirdWing(k, 0, 5);
  mrBirdHead(k, 18, -38);
  mrBirdBow(k, 22, -64);
  mrBirdFeet(-10, 46);
  mrBirdFeet(10, 46);
  pop();
}


function mrBirdBody(k) {
  push();
  fill(k);
  stroke(30, 20, 10);
  strokeWeight(2.5);
  ellipse(0, 0, 72, 78);
  pop();
}

function mrBirdWing(k, lx, ly) {
  push();
  translate(lx, ly);
  fill(red(k) * 0.75, green(k) * 0.75, blue(k) * 0.75);
  stroke(30, 20, 10);
  strokeWeight(2);
  push();
  rotate(-10);
  ellipse(-8, 8, 38, 50);
  pop();
  pop();
}

function mrBirdHead(k, lx, ly) {
  push();
  translate(lx, ly);
  fill(k);
  stroke(30, 20, 10);
  strokeWeight(2.5);
  ellipse(0, 0, 42, 40);
  noFill();
  stroke(30, 20, 10);
  strokeWeight(2);
  arc(6, -4, 10, 8, 180, 360);
  mrBirdBeak(18, 2);
  pop();
}

function mrBirdBeak(lx, ly) {
  push();
  translate(lx, ly);
  fill(210, 150, 40);
  stroke(30, 20, 10);
  strokeWeight(1.5);
  triangle(0, -5, 14, 0, 0, 5);
  pop();
}

function mrBirdTail(k, lx, ly) {
  push();
  translate(lx, ly);
  fill(red(k) * 0.75, green(k) * 0.75, blue(k) * 0.75);
  stroke(30, 20, 10);
  strokeWeight(2);
  ellipse(-10, 0, 22, 28);
  ellipse(8, 2, 20, 24);
  pop();
}

function mrBirdFeet(lx, ly) {
  push();
  translate(lx, ly);
  stroke(100, 70, 30);
  strokeWeight(2.5);
  noFill();
  line(0, 0, 0, 14);
  line(0, 14, -10, 22);
  line(0, 14, 4, 23);
  line(0, 14, -4, 10);
  pop();
}

function mrBirdBow(k, lx, ly) {
  push();
  translate(lx, ly);
  fill(210, 100, 30);
  noStroke();
  push();
  rotate(-20);
  ellipse(-10, 0, 18, 12);
  pop();
  push();
  rotate(20);
  ellipse(10, 0, 18, 12);
  pop();
  fill(170, 70, 20);
  ellipse(0, 0, 8, 8);
  stroke(120, 50, 10);
  strokeWeight(1.5);
  noFill();
  push();
  rotate(-20);
  ellipse(-10, 0, 18, 12);
  pop();
  push();
  rotate(20);
  ellipse(10, 0, 18, 12);
  pop();
  pop();
}

function mrStars() {
  noStroke();
  for (let i = 0; i < stars.length; i++) {
    let s = stars[i];
    let twinkle = s.bright + sin(counter * 3 + i * 20) * 40;
    fill(twinkle, twinkle, twinkle * 0.9);
    ellipse(s.x, s.y, s.size, s.size);
  }
}

function mrMoon() {
  push();
  translate(500, 80);
  noStroke();
  fill(255, 240, 180, 40);
  ellipse(0, 0, 80, 80);
  fill(255, 240, 180, 30);
  ellipse(0, 0, 95, 95);
  fill(255, 235, 160);
  ellipse(0, 0, 65, 65);
  fill(18, 18, 40);
  ellipse(14, -6, 55, 58);
  pop();
}

function mrGround() {
  noStroke();
  fill(30, 55, 25);
  rect(0, 562, width, 38);
  fill(45, 75, 35);
  rect(0, 558, width, 10);
  stroke(55, 90, 40);
  strokeWeight(2);
  for (let x = 10; x < width; x += 18) {
    line(x, 558, x - 4, 548);
    line(x, 558, x, 545);
    line(x, 558, x + 4, 548);
  }
}