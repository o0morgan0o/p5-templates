# Template generator for p5js


# Usage:

```
// install the package (be at the root of this project)
$ npm install -g

// launch the program
$ p5-template

// launch server
$ cd {projectName}
$ npm run start
``` 

# Templates

The templates are located in the templates folder and the contents are completely copied during the generation
List:
    - basic-with-svg-export
    

## useful tools

penkit-optimize : https://github.com/paulgb/penkit/tree/master/optimizer

```
$ penkit-optimize -g input.svg
```

optimizeGcode.py
This script is used in order to make a pause just before starting plotting. Also it adds auto home before drawing.

```
$ python optimizeGcode.py input.gcode
```


## My personal process

-> Generate svg file within p5jssvg.
-> open svg with illustrator
-> ungroup everything. All must be inside layer "Calque 1" without group. Make an empty layer "output"
-> Be sure to import actions `myActions.aia` script in Illustrator. (it make pathfinder outline with selected items)
-> run several times `AA_pathfinder.jsx` (it make pathfinder on every path)
-> delete unnecessary things, make outline black, etc.
-> copy the result in the illustrator template `AAA_PLOTTER_FRIXION_PEN_PILOT.ait` and place everything
-> generate gcode with illustrator script `Export to G-code V5.jsx`
-> Load in plotter thanks to pronterface



(old process :
-> run `AA_cutSVG.jsx` script = (join every path)
-> run `illustrator.ahk` autohotkey script to delete unwanted path on the borders (manual and boring) **must run in admin**
)