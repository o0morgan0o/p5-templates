const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const filePath = path.join(__dirname, 'presets.json')
app.use(express.json())

app.get('/server', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.sendFile(path.join(__dirname, "presets.json"))
})

app.options('/server', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.send('received')
})

app.post('/server', function(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type")
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS")

    // we get all the existing presets and add these to the new preset in json
    let configArray = []
    let newPreset = (req.body)
    console.log("new preset : ... ", newPreset)
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, data) => {
        if (err) throw err;
        configArray = JSON.parse(data)
        console.log("old values : ", configArray)

        configArray.saved_configs.push(req.body)

        saveNewJsonFile(path.join(__dirname, "presets.json"), JSON.stringify(configArray))
    })

    function saveNewJsonFile(outfile, data) {
        fs.writeFile(outfile, data, () => console.log("saved"))
    }

})

app.listen(3003, function() {
    console.log(`listening on port 3003...`)
})