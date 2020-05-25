let count = 0;
let data

function preload() {
    loadServer()
}

function setup() {
    createCanvas(218 * 2, 292 * 2, SVG); // aspect ratio for printing on 24x32
    noLoop();
    createSliders();
    background(255);
    strokeWeight(1); // for .5mm pen
    stroke(0);
    noFill();

    rect(0, 0, width, height)
    rect(random(width), random(height), s0(), s0());

}