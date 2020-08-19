var myDoc = activeDocument;
var myLayer = myDoc.activeLayer;

// var g=confirm ("Randomize will be apply to layer: " + myLayer.name);
var myWindow = new Window("dialog", "form");

myWindow.orientation = "row";
myWindow.add("statictext", undefined, "Split in how many layers ?");
var myText = myWindow.add("edittext");
myText.text = 2;
var btnOk = myWindow.add("button", undefined, "OK");
var btnCancel = myWindow.add("button", undefined, "Cancel");
btnOk.onClick = separateInLayers;
btnCancel.onClick = myWindow.close;
myWindow.show();

function separateInLayers() {
  //get number of layers
  var nbLayers = myText.text;
  //   alert(nbLayers);
  // creation of new layers
  for (var i = 0; i < nbLayers; i++) {
    var newLayer = myDoc.layers.add();
    newLayer.name = "separate-" + i;
  }

  var Obs = myLayer.pathItems;
  var iterMax = Obs.length;

  var counter = 0;
  for (var j = iterMax - 1; j >= 0; j--) {
    var myObject = Obs[j];
    var selectionLayer = myDoc.layers.getByName("separate-" + counter);
    myObject.move(selectionLayer, ElementPlacement.PLACEATBEGINNING);
    counter++;
    if (counter >= nbLayers) {
      counter = 0;
    }
  }
  myWindow.close();
  alert("done");

  //   creation of new Layer
  // TODO check if random layer exist
  //   var newLayer = myDoc.layers.add();
  //   newLayer.name = myLayer.name + "-random";
  //   var Obs = myLayer.pathItems;
  //   var iterMax = Obs.length;
  //   for (var j = 0; j < iterMax; j++) {
  //     // $.writeln("new iter", j, "  ", iterMax)
  //     var i = Math.floor(Math.random() * Obs.length);
  //     //$.writeln("objs length", Objs.length, "  random: ", i);
  //     var myObject = Obs[i];
  //     myObject.move(newLayer, ElementPlacement.PLACEATBEGINNING);
  //   }
  //   // we save the name of the initial Layer
  //   var layerName = myLayer.name;
  //   myLayer.remove();
  //   newLayer.name = layerName;
  //   //app.redraw()
}
