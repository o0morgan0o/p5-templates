let sliders = []

function createSliders() {
    let container = createDiv()
    container.id = "my-container"
    container.class("my-container")
    for (let i = 0; i < 8; i++) {
        // creation of divs for styling
        let sliderContainer = createDiv()
        sliderContainer.class("slider-container")
        sliderContainer.parent(container)
        let sliderContainerInputs = createDiv()
        sliderContainerInputs.class("slider-container-inputs")
        sliderContainerInputs.parent(sliderContainer)

        let input = createInput(.1)
        input.parent(sliderContainerInputs)
        input.id("min-" + i)
        input.style("width", "40px")
        input.input((e) => inputChanged(e))

        let input2 = createInput(100)
        input2.parent(sliderContainerInputs)
        input2.id("max-" + i)
        input2.style("width", "40px")
        input2.input((e) => inputChanged(e))

        let newSlider
        newSlider = createSlider(min, max, 50, 0)
        newSlider.parent(sliderContainer)
        newSlider.id("slid" + i)
        newSlider.input((e) => sliderChanged(e))
        sliders.push(newSlider)

        let label = createDiv("unknow")
        label.parent(sliderContainer)
        label.id("lbl-" + i)
        label.class("slider-label")

    }

    // try to get values from cookies
    loadCookies()

}

function sliderChanged(event) {
    event.preventDefault()
    setCookie(event.target.id, event.target.value)
    let index = event.target.id.substr(event.target.id.length - 1)
    document.getElementById(`lbl-${index}`)
        .innerHTML = `s${index}: ${parseFloat(event.target.value).toFixed(5)}`
}

function inputChanged(event) {
    setCookie(event.target.id, event.target.value)

}

function setCookie(key, value) {
    let expires = new Date()
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000))
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString()
}

function getCookie(key) {
    let keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)')
    return keyValue ? keyValue[2] : null
}

function loadCookies() {
    function myLog(minimum, slider, maximum) {
        this.minimum = minimum,
            this.slider = slider,
            this.maximum = maximum
    }

    let myTable = []

    for (let i = 0; i < 8; i++) {
        let result = parseFloat(getCookie("slid" + i))

        let min = parseFloat(getCookie("min-" + i))
        let max = parseFloat(getCookie("max-" + i))

        if (isNaN(result)) result = 50
        document.getElementById("lbl-" + i)
            .innerHTML = `s${i}: ${parseFloat(result).toFixed(5)}`

        if (isNaN(min)) min = .1
        document.getElementById("min-" + i)
            .value = min

        if (isNaN(max)) max = 100
        document.getElementById("max-" + i)
            .value = max

        //update slider
        let mySlider = document.getElementById("slid" + i)
        mySlider.min = min
        mySlider.max = max
        mySlider.value = result

        myTable.push(new myLog(min, result, max))

    }

    console.table(myTable)

}