const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')


let outputDir = ""

const choose_template = [ 
    {
        type: "input",
        name: "folder_name",
        message: chalk.green("What is the name of the project ?"),
        validate: function(value){
            if(value != ""){
                outputDir = value
                return true
            }else{
                // TODO ask new name
            }
        }
        
    },
    {
        type: "list",
        name: "template_choice",
        message: chalk.green("Select which template you want to create :") ,
        choices: ["template1",  "template2", "cancel"] ,
        validate: function(value){
            if(value.length){
                return true
            }
        }
    },
]

inquirer.prompt(choose_template)
.then(answers => {
    console.log(answers)
    switch(answers.template_choice){
        case "template1": 
        console.log( '1 selected')
        createOutput();
        break;
        case "template2":
        console.log( "2 selected")
        break;
        default:
        break;
    }

})

function createOutput(){
    fs.mkdirSync(outputDir)
}