function setup(){
    createCanvas(800,800, SVG);
    // background(255);
    strokeWeight(1);
    stroke(0)
    noFill()


}

let count = 0

function draw(){
    count++
    rect(random(width), random(height), 80, 80)

    if( count > 100){
        noLoop()
        // save()
    }

}