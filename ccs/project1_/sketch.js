let brushMode = 1;
let brushSize = 30;
let eraserOn = false;

let showHUD = true; 
let bg;


let dustyRose, rust, beige, mutedBlue;
let palette = [];

let stampDelay = 0;


let hudDiv;
let cnv;

function setup() {
  cnv = createCanvas(800, 600);

 
  bg = color(25, 25, 28);            
  dustyRose = color(188, 120, 135);  
  rust = color(150, 65, 40);         
  beige = color(235, 222, 200);     
  mutedBlue = color(90, 120, 150);  

  palette = [dustyRose, rust, beige, mutedBlue];

  background(bg);
  noStroke();

  hudDiv = createDiv("");
  hudDiv.style("position", "absolute");
  hudDiv.style("padding", "10px 12px");
  hudDiv.style("border-radius", "12px");
  hudDiv.style("background", "rgba(0,0,0,0.45)");
  hudDiv.style("color", "white");
  hudDiv.style("font-family", "system-ui, Arial, sans-serif");
  hudDiv.style("font-size", "14px");
  hudDiv.style("line-height", "1.35");
  hudDiv.style("user-select", "none");
  hudDiv.style("z-index", "9999");

  positionHUD();

  windowResized();
}

function draw() {
  stampDelay = max(0, stampDelay - 1);
  updateHUD();
}

function windowResized() {
  positionHUD();
}

function positionHUD() {
  const r = cnv.elt.getBoundingClientRect();
  hudDiv.position(int(r.left + window.scrollX + 12), int(r.top + window.scrollY + 12));
}

function mouseDragged() {
  doBrush(mouseX, mouseY);
}

function mousePressed() {
  doBrush(mouseX, mouseY);
}

function keyPressed() {
  if (key === "1") brushMode = 1;
  if (key === "2") brushMode = 2;
  if (key === "3") brushMode = 3;

  if (key === "e" || key === "E") eraserOn = !eraserOn;

  if (key === "x" || key === "X") background(bg);

  if (key === "s" || key === "S") saveCanvas("mr_project1", "png");

  if (key === "h" || key === "H") {
    showHUD = !showHUD;
    hudDiv.style("display", showHUD ? "block" : "none");
  }

  if (key === "[") brushSize = max(8, brushSize - 4);
  if (key === "]") brushSize = min(120, brushSize + 4);
}


function pickColor() {
  return palette[int(random(palette.length))];
}

function doBrush(x, y) {
  let col = eraserOn ? bg : pickColor();

  if (brushMode === 1) mrDiagonalStripe(x, y, brushSize, col);
  if (brushMode === 2) mrRadiatingStripe(x, y, brushSize, 12, col);
  if (brushMode === 3) mrGridStamp(x, y, brushSize, col);
}

function mrDiagonalStripe(x, y, size, col) {
  let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  let thickness = map(speed, 0, 20, size * 0.3, size * 0.8);

  stroke(col);
  strokeWeight(thickness);
  line(pmouseX, pmouseY, mouseX, mouseY);
  noStroke();
}

function mrRadiatingStripe(x, y, size, amount, col) {
  fill(col);
  noStroke();

  for (let i = 0; i < amount; i++) {
    let ox = random(-size, size);
    let oy = random(-size, size);
    let s = random(size * 0.1, size * 0.3);
    ellipse(x + ox, y + oy, s);
  }
}

function mrGridStamp(x, y, size, col) {

  stroke(col);
  strokeWeight(size * 0.15);

  line(x - size/2, y - size/2, x + size/2, y + size/2);
  line(x + size/2, y - size/2, x - size/2, y + size/2);

  noStroke();
}


function updateHUD() {
  if (!showHUD) return;

  hudDiv.html(
    "<b>Brush:</b> " + brushMode +
    "<br><b>Size:</b> " + brushSize +
    "<br><b>Eraser:</b> " + (eraserOn ? "ON" : "OFF") +
    "<br><b>Keys:</b> 1/2/3 brush | [ ] size | E erase | X clear | S save | H hide HUD"
  );
}