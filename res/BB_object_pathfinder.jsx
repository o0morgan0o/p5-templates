

/**********************************************************
*********************************************************/
// alert("working")
#targetengine main

// This script seems to work only in extendScript


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



// create temp layer
var outputLayer = myDoc.layers.getByName("output")
    app.selection = null;
var shape = myDoc.layers.getByName("shape")
// var newItemFirst = shape.pathItems[0].duplicate(shape, ElementPlacement.PLACEATEND)
// newItemFirst.selected=false



for(var i = 0 ; i < myPathItems.length ; i++){
    if(i==0){
        var additionalItem = shape.pathItems[0].duplicate(shape, ElementPlacement.PLACEATEND)
        app.selection = null
        alert('temporisation')
    }
    // get shape dimensions
    var newItem = shape.pathItems[0].duplicate(shape, ElementPlacement.PLACEATEND)
    newItem.selected = false
    app.selection =null
    
    var currentPathItem = myPathItems[i];
    currentPathItem.selected = true
    // create rectangle for pathfinder
    shape.pathItems[0].selected = true

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
        }



    // break;
    // if(i == 3) break;

}
