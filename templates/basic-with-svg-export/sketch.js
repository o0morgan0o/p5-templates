// @ts-nocheck
let count = 0;
let data;
let colors = []
let color1, color2, color3, color4, color5

function preload() {
    loadServer()
    generateColors()
}

function setup() {
    createCanvas(373 * 2, 455 * 2, SVG); // aspect ratio for printing on 24x32
    blendMode(MULTIPLY)
    // createCanvas(373 * 2, 455 * 2); // aspect ratio for printing on 24x32
    noLoop();
    // createSliders();
    strokeWeight(.8); // for .4mm pen
    stroke(0);
    background(255);
    noFill();


}

function draw() {

}