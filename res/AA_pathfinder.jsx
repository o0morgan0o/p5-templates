/**********************************************************
*********************************************************/
// alert("working")
#target Illustrator-23
#targetengine main

alert( 'We will start to change 40 elements, make sure you have layers "Calque 1" and "output"')

var myDoc = activeDocument;
var myLayer = myDoc.layers.getByName("Calque 1");
// var mySelection = null;
// var mySelection = app.activeDocument.layers[0];

var myPathItems = myLayer.pathItems;
alert("remaining "+ myPathItems.length + " items ...")
// alert(myPathItems.length)
// progress(myPathItems.length)
// alert("starting on " + myPathItems.length + " items...")

function applyPathfinder(){
    try{
    app.doScript("test2", "myActions");
        // alert("success");
    }catch(err){
        alert(err.toString());
    }
}


// get document dimensions
var myArtboard = myDoc.artboards[0];
var top = (myArtboard.artboardRect[1])
var left = (myArtboard.artboardRect[0])
var width = (myArtboard.artboardRect[2] - left)
var height = (top - myArtboard.artboardRect[3])

// create temp layer
var outputLayer = myDoc.layers.getByName("output")
    app.selection = null;



for(var i = 0 ; i < myPathItems.length ; i++){

    
    
    var currentPathItem = myPathItems[i];
    currentPathItem.selected = true

    
    // create rectangle for pathfinder
    myDoc.pathItems.rectangle(top, left, width, height).selected = true

    applyPathfinder()
    var docSelected = app.activeDocument.selection
    // move each element of selection to the other layer
    for(var j = 0 ; j < docSelected.length; j++){
        var item = docSelected[j];
        item.move(outputLayer, ElementPlacement.PLACEATBEGINNING);
    }

    app.executeMenuCommand("ungroup")

    app.selection = null;

    if(i > 40){
        break;
    app.redraw();
    }

    // progress.message("trying pathfinder : "+ i + " / " + myPathItems.length)
    // progress.increment()


    // break;
    // if(i == 3) break;

}


// waiting window
function progress(steps) {
    var b;
    var t;
    var w;
    w = new Window("palette", "Progress", undefined, {closeButton: false});
    t = w.add("statictext");
    t.preferredSize = [450, -1]; // 450 pixels wide, default height.
    if (steps) {
        b = w.add("progressbar", undefined, 0, steps);
        b.preferredSize = [450, -1]; // 450 pixels wide, default height.
    }

    progress.close = function () {
        w.close();
    };

    progress.increment = function () {
        b.value++;
    };

    progress.message = function (message) {
        t.text = message;
    };
    w.show();

}