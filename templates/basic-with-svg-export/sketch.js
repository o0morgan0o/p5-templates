function setup() {
  createCanvas(500, 705, SVG); // same aspect ratio than a4
  strokeWeight(1);
  stroke(0);
  noFill();

  rect(0,0, width,height)
}

let count = 0;

function draw() {
  count++;
  rect(random(width), random(height), 80, 80);

  if (count > 100) {
    noLoop();
  }
}









function keyPressed(){
  console.log(keyCode)
  if(keyCode == 83){ // key = s
    save()
  }
}
