const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
// const { create } = require("domain");

let teamMembers = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function createTeam() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers))
}

function menuItems() {
    inquirer.prompt(
        {
            type: "list",
            name: "action",
            message: "What would you like to do next?",
            choices: [
                "Add an engineer?",
                "Add an intern?",
                "Build your team?"
            ]
        }
    ).then(function(answers) {
        switch(answers.action) {
            case "Add an engineer?":
                createEngineer();
                break;
            case "Add an intern?":
                createIntern();
                break;
            case "Build your team?":
                createTeam();
                break;
        }
    });
}

function createManager() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "managerName",
                message: "Please provide the manager's name:",
                validate: function(answer) {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "Please enter a manager ID:"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "Please enter the manager's email:"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "Please enter the manager's office number:"
            }
        ]
    ).then(function(answers) {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
        // console.log(manager)
        // const managerHtml = renderManager(manager);
        // console.log(managerHtml);
        teamMembers.push(manager);
        menuItems();
    });
}

function createEngineer() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "EngineerName",
                message: "Please provide the engineer's name:",
                validate: function(answer) {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "Please enter an engineer ID:"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "Please enter the engineer's email:"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "Please enter the engineer's Github username:"
            }
        ]
    ).then(function(answers) {
        const Engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        teamMembers.push(Engineer);
        menuItems();
    });
}

function createIntern() {
    inquirer.prompt(
        [
            {
                type: "input",
                name: "internName",
                message: "Please provide the Intern's name:",
                validate: function(answer) {
                    if (answer !== "") {
                        return true;
                    }
                    return "Please enter at least one character."
                }
            },
            {
                type: "input",
                name: "internId",
                message: "Please enter an Intern ID:"
            },
            {
                type: "input",
                name: "internEmail",
                message: "Please enter the Intern's email:"
            },
            {
                type: "input",
                name: "internSchool",
                message: "Please enter the Intern's school name:"
            }
        ]
    ).then(function(answers) {
        const Intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        teamMembers.push(Intern);
        menuItems();
    });
}

createManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
