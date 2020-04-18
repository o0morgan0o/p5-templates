const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')


let projectName = ""
let templates = []
const currentDirCli = path.resolve(__dirname)
const currentDirClient = process.cwd()

// get all the available templates
const getDirectories =  (source) =>{
    fs.readdirSync(source).map( name => {
        templates.push(name)
    })
    templates.push("cancel")
}



 getDirectories(currentDirCli+ "/templates/")

const choose_template = [ 
    {
        type: "input",
        name: "folder_name",
        message: chalk.green("What is the name of the project ?"),
        validate: function(value){
            if(value != ""){
                projectName = value
                return true
            }else{
                return "Problem with this name, enter a new name"
            }
        }
        
    },
    {
        type: "list",
        name: "template_choice",
        message: chalk.green("Select which template you want to create :") ,
        choices: templates,
        validate: function(value){
            if(value.length){
                return true
            }
        }
    },
]

inquirer.prompt(choose_template)
.then(answers => {
    if(answers.template_choice == "cancel") return true
    createDirectoryContents(answers.template_choice, answers.folder_name)
})
.catch(err => console.log(err))

function createDirectoryContents(templateSelected, newProjectName){
    //creation dossier projet
    fs.mkdirSync(path.join(currentDirClient, newProjectName))

    // lecture des fichier de la template sélectionnée
    const filesToCreate = fs.readdirSync(path.join(currentDirCli, "templates", templateSelected))
    console.log(filesToCreate)

    filesToCreate.forEach(file => {
        // sélection fichier par fichier dans la template
        const origFilePath = path.join(currentDirCli, "templates", templateSelected, file)
        const stats = fs.statSync(origFilePath);

        if(stats.isFile()){
            const contents = fs.readFileSync(origFilePath, 'utf8');
            const writePath = path.join(currentDirClient, newProjectName, file)
            fs.writeFileSync(writePath, contents, 'utf8');
        }else if(stats.isDirectory()){

            // recursive call
            createDirectoryContents(path.join(templateSelected, file), path.join(newProjectName,file));
        }
    });
    
}

