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
    createCanvas(218 * 2, 292 * 2, SVG); // aspect ratio for printing on 24x32
    // createCanvas(218 * 2, 292 * 2); // aspect ratio for printing on 24x32
    noLoop();
    createSliders();
    background(255);
    strokeWeight(1); // for .5mm pen
    stroke(0);
    noFill();

    // stroke(color3)
    // rect(random(width), random(height), s0(), s0());

}

function draw() {

}