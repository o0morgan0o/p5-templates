
class PixelGrid {
    constructor(width, height, init = undefined) {
        this.width = width
        this.height = height
        this.pixels = []
        for (let i = 0; i < width * height; i++) {
            this.pixels[i] = init
        }
    }

    randomize(min, max) {
        for (let i = 0; i < this.pixels.length; i++) {
            this.pixels[i] = random(min, max)
        }

    }


    setPixel(x, y, val) {
        let index = x + y * this.width
        this.pixels[index] = val
        return val
    }

    getPixel(x, y) {
        let index = x + y * this.width
        return this.pixels[index]
    }
}