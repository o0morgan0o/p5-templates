/**********************************************************
*********************************************************/
// alert("working")

var myDoc = activeDocument;
var myLayer = myDoc.layers[0];
// var mySelection = null;
// var mySelection = app.activeDocument.layers[0];

var myPathItems = myLayer.pathItems;
// alert(myPathItems.length)
progress(myPathItems.length)
alert("starting on " + myPathItems.length + " items...")
for(var i = 0 ; i < myPathItems.length ; i++){
// for(var i = 0 ; i < 5; i++){

    progress.message("Join path : "+ i + " / " + myPathItems.length)
    progress.increment()
    
    var currentPathItem = myPathItems[i];
    currentPathItem.selected = true
    currentPathItem.closed = true


    // break;

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