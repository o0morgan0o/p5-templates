//@ts-nocheck
// TODO : use HSL colors instead RGB
// TODO : generate palettes
function generateColors() {
    color1 = color(floor(random(255)), floor(random(255)), 0)
    color2 = color(floor(random(255)), floor(random(255)), 0)
    color3 = color(floor(random(255)), floor(random(255)), 0)
    color4 = color(floor(random(255)), floor(random(255)), 0)
    color5 = color(floor(random(255)), floor(random(255)), 0)
    colors = [color1, color2, color3, color4, color5]
}

function randomColor() {
    let c = color(floor(random(255)), floor(random(255)), floor(random(255)));
    return c
}