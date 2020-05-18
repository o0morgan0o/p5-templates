let sliders = []
let container

function loadServer() {
    fetch("http://localhost:3003/server")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            loadPresets(data)
        })
}

function createButtons() {

    container = createDiv()
    container.id("my-container-buttons")
    container.class("buttons-container")
    createSaveButton()

}

function createSaveButton() {
    let buttonSave = createButton("save preset()")
    buttonSave.class("button-save")
    buttonSave.parent(container)
    buttonSave.mousePressed(savePreset)
}

function loadPresets(data) {
    for (let i = 0; i < data.saved_configs.length; i++) {
        console.log(data.saved_configs[i])
        createButtonPreset(data.saved_configs[i], i)
    }
}

function createButtonPreset(preset, i) {
    let buttonPreset = createButton(preset.date)
    buttonPreset.class("button-preset")
    buttonPreset.mousePressed(() => loadPresetValues(preset, i))
    buttonPreset.parent(container)
}

function loadPresetValues(preset, presetIndex) {
    console.log(preset, presetIndex)
    for (let i = 0; i < 8; i++) {
        let slid = document.getElementById(`slid${i}`)
        let lbl = document.getElementById(`lbl-${i}`)
        let min = document.getElementById(`min-${i}`)
        let max = document.getElementById(`max-${i}`)
        slid.value = preset.sliders[i].value
        lbl.innerHTML = `s${i}: ${parseFloat(preset.sliders[i].value).toFixed(5)}`
        min.value = preset.sliders[i].min
        max.value = preset.sliders[i].max
        setCookie(`slid${i}`, preset.sliders[i].value)
        setCookie(`min-${i}`, preset.sliders[i].min)
        setCookie(`max-${i}`, preset.sliders[i].max)
    }
    window.location.reload()

}

function saveAllInCookies() {
    // console.log("saving all cookies")
    // for (let i = 0; i < )
    //     setCookie(event.target.id, event.target.value)

}

function savePreset() {
    const millis = new Date()

    const myDate = `${millis.getDate()}-${millis.getMonth()+1}-${millis.getFullYear()}--${millis.getHours()}:${millis.getMinutes()}:${millis.getSeconds()}`

    let myPreset = {}
    myPreset.date = myDate
    myPreset.sliders = []
    for (let i = 0; i < 8; i++) {
        let slid = document.getElementById(`slid${i}`)
        let min = document.getElementById(`min-${i}`)
        let max = document.getElementById(`max-${i}`)
        myPreset.sliders.push({
            "value": slid.value,
            "min": min.value,
            "max": max.value
        })
    }

    console.log(myPreset)

    fetch("http://localhost:3003/server", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(myPreset)
    })
}

function createSliders() {
    createButtons()

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