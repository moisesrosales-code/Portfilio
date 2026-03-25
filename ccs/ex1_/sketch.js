let counter = 0;
let bgcounter = 0;

function setup() {
  createCanvas(600, 600);
  noStroke();
  frameRate(30);
}

function draw() {

  counter += 1;

  if (counter % 60 === 0) {
    bgcounter++;
    console.log(
      "counter=" + counter +
      " bgcounter=" + bgcounter +
      " mouseX=" + mouseX +
      " mouseY=" + mouseY
    );
  }

  if (mouseIsPressed) {
    if (keyIsPressed) {
      console.log("mouse + key pressed");
    }
  }

  drawPlaidFlicker();

  drawFace(width / 2, height / 2, 1.0);

  drawFace(120, 120, 0.7);
  drawFace(width - 120, 120, 0.7);
  drawFace(120, height - 120, 0.7);
  drawFace(width - 120, height - 120, 0.7);
}


function drawFace(xOff, yOff, s) {
  push();
  translate(xOff, yOff);
  scale(s);

  translate(-140, -205);

  push();
  translate(85, 80);
  rotate(radians(-14));
  translate(-85, -80);

  fill('#184e7c');
  noStroke();
  beginShape();
  curveVertex(40, 175);
  curveVertex(40, 175);
  curveVertex(85, 80);
  curveVertex(130, 175);
  curveVertex(130, 175);
  endShape(CLOSE);

fill('#12395a');
noStroke();
beginShape();
curveVertex(55, 170);
curveVertex(55, 170);
curveVertex(85, 95);
curveVertex(115, 170);
curveVertex(115, 170);
endShape(CLOSE);


  noFill();
  stroke(30);
  strokeWeight(3);
  beginShape();
  curveVertex(40, 175);
  curveVertex(40, 175);
  curveVertex(85, 80);
  curveVertex(130, 175);
  curveVertex(130, 175);
  endShape(CLOSE);
  noStroke();
  pop();


  push();
  translate(195, 80);
  rotate(radians(14));
  translate(-195, -80);

  fill('#184e7c');
  noStroke();
  beginShape();
  curveVertex(150, 175);
  curveVertex(150, 175);
  curveVertex(195, 80);
  curveVertex(240, 175);
  curveVertex(240, 175);
  endShape(CLOSE);

fill('#12395a');
noStroke();
beginShape();
curveVertex(165, 170);
curveVertex(165, 170);
curveVertex(195, 95);
curveVertex(225, 170);
curveVertex(225, 170);
endShape(CLOSE);


  noFill();
  stroke(30);
  strokeWeight(3);
  beginShape();
  curveVertex(150, 175);
  curveVertex(150, 175);
  curveVertex(195, 80);
  curveVertex(240, 175);
  curveVertex(240, 175);
  endShape(CLOSE);
  noStroke();
  pop();


  fill('#184e7c');
  noStroke();
  circle(140, 200, 170);

  noFill();
  stroke(30);
  strokeWeight(3);
  circle(140, 200, 170);
  noStroke();


  fill('#ffffff');
  ellipse(111, 180, 26, 40);
  ellipse(167, 180, 26, 40);

  let localX = (mouseX - xOff) / s + 140;
  let localY = (mouseY - yOff) / s + 205;

  let leftEyeX = 111;
  let leftEyeY = 180;
  let rightEyeX = 167;
  let rightEyeY = 180;

  let maxMove = 6;

  let dxL = constrain(localX - leftEyeX, -maxMove, maxMove);
  let dyL = constrain(localY - leftEyeY, -maxMove, maxMove);
  let dxR = constrain(localX - rightEyeX, -maxMove, maxMove);
  let dyR = constrain(localY - rightEyeY, -maxMove, maxMove);

  fill('#000000');
  ellipse(leftEyeX + dxL, leftEyeY + dyL, 12, 25);
  ellipse(rightEyeX + dxR, rightEyeY + dyR, 12, 25);


  let mouthOpen = map(sin(frameCount * 0.15), -1, 1, 10, 35);

  noStroke();
  fill('#1a1a1a');
  ellipse(140, 242, 38, mouthOpen);

  fill('#ff8fa3');
  ellipse(140, 242 + mouthOpen * 0.25, 22, mouthOpen * 0.6);

  stroke(30);
  strokeWeight(2);
  line(140, 242, 140, 242 + mouthOpen * 0.6);
  noStroke();

  fill('#184e7c');
  ellipse(120, 232, 40, 26);
  ellipse(160, 232, 40, 26);

  stroke(30);
  strokeWeight(4);
  noFill();
  bezier(115, 228, 125, 248, 135, 248, 140, 228);
  bezier(140, 228, 145, 248, 155, 248, 165, 228);
  noStroke();


  stroke(30);
  strokeWeight(2);

  line(90, 205, 120, 210);
  line(85, 215, 120, 215);
  line(90, 225, 120, 220);

  line(160, 210, 190, 205);
  line(160, 215, 195, 215);
  line(160, 220, 190, 225);

  noStroke();

  pop();
}


function drawPlaidFlicker() {
  background('#f4eed8');
  const stripe = 30;

  const colA = color('#e07a5f');
  const colB = color('#3d5a80');
  const colC = color('#f2cc8f');

  for (let x = 0; x < width; x += stripe) {
    for (let y = 0; y < height; y += stripe) {

      let t = (x + y) / (width + height);
      let base;

      if (t < 0.33) {
        base = lerpColor(colA, colB, t);
      } else if (t < 0.66) {
        base = lerpColor(colC, colB, t);
      } else {
        base = lerpColor(colA, colC, t);
      }

      let flicker =
        1 + sin(frameCount * 0.12 + x * 0.05 + y * 0.05) * 0.25
        + random(-0.05, 0.05);

      fill(
        constrain(red(base) * flicker, 0, 255),
        constrain(green(base) * flicker, 0, 255),
        constrain(blue(base) * flicker, 0, 255)
      );

      rect(x, y, stripe / 2, stripe / 2);
    }
  }


  stroke(255, 180);
  strokeWeight(3);
  for (let i = 0; i < 6; i++) {
    point(random(width), random(height));
  }

  noFill();
  stroke(255, 60);
  strokeWeight(2);
  arc(mouseX, mouseY, 60, 30, 0, PI);

  noStroke();
}
