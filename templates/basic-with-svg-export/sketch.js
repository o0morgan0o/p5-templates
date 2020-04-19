function setup() {
  createCanvas(200, 287, SVG);
  strokeWeight(1);
  stroke(0);
  noFill();
  rect(0, 0, width, height);
}

let count = 0;

function draw() {
  count++;
  rect(random(width), random(height), 80, 80);

  if (count > 100) {
    noLoop();
    // save()
  }
}
