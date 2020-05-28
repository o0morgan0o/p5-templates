//@ts-nocheck
let bs1 = require('browser-sync')
    .create('Server 1')
let bs2 = require('browser-sync')
    .create('Server 2')

//TODO : refactor the dbserver/server.js in this file
require('./dbserver/server.js') // run server on port 3003 for loading preferences

bs1.init({
    server: {
        baseDir: "./",
        routes: {
            // route for accessing pics folder at parent location
            // may be also for getting color palettes
            // would be cool to do this also for saved settings
            "/pics": "../pics"
        },
    },
    port: 3000
})

bs1.watch('*.js')
    .on('change', bs1.reload)