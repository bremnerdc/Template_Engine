const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamArray = [];
const idArray = [];


function app(){
    function CreateManager(){
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?"
                },
                {
                type: "input",
                name: "managerID",
                message: "What is your manager's ID?"
                },
                {
                    type: "input",
                    name: "managerEmail",
                    message: "What is your manager's email?"
                    },
                {
                type: "input",
                name: "officeNumber",
                message: "What is your manager's office number?"
                }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber);
            teamArray.push(manager);
            idArray.push(answers.managerID);
            createTeam();
        });
    }
    function createTeam() { 
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member do you want to add?",
                choices: ["Engineer", "Intern", "No One"]
                }
            ]).then(userChoice => {
                switch(userChoice.memberChoice){
                    case "Engineer":
                        addEngineer();
                        break;
                        case "Intern":
                        addIntern();
                        break;
                        default:
                        writeToHtml();
                }
            });
    }
    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?"
                },
                {
                type: "input",
                name: "engineerID",
                message: "What is your engineer's ID?"
                },
                {
                    type: "input",
                    name: "engineerEmail",
                    message: "What is your engineer's email?"
                    },
                {
                type: "input",
                name: "engineerGithub",
                message: "What is your engineer's github ID?"
                }
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            teamArray.push(engineer);
            console.log(engineer);
            idArray.push(answers.engineerID);
            createTeam();
        });
    }
        function addIntern() {
            inquirer.prompt([
                {
                    type: "input",
                    name: "internName",
                    message: "What is your intern's name?"
                    },
                    {
                    type: "input",
                    name: "internID",
                    message: "What is your intern's ID?"
                    },
                    {
                        type: "input",
                        name: "internEmail",
                        message: "What is your intern's email?"
                        },
                    {
                    type: "input",
                    name: "internSchool",
                    message: "What is your intern's school?"
                    }
            ]).then(answers => {
                const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
                teamArray.push(intern);
                idArray.push(answers.internID);
                createTeam();
            });
        }
        function writeToHtml(){
            if(!fs.existsSync(OUTPUT_DIR)){
                fs.mkdirSync(OUTPUT_DIR)
            }
            fs.writeFileSync(outputPath, render(teamArray), "utf-8");
        }
        CreateManager();
}

app();