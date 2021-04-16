//======== Dependencies===================//
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');

async function init() {
    const answers = await inquirer.prompt([{
        type: 'input',
        name: 'temp',
        message: 'what is cow?'

    }]);
    console.log(answers);
    const queryRsponse = await db.promise().query("SELECT * FROM employeeDB;")
    console.log(queryRsponse);
}

//========== Connection ID ==========================//
db.connect(function (err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    init();
});

//START MENU//
function init() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'START MENU',
        choices: [
            "View All Employees",
            "View All Employees By Roles",
            "View All Employees By Department",
            "Update Employee",
            "Add Employee",
            "Add Role",
            "Add Department"
        ]
    }]).then(function (val) {
        switch (val.choice) {
            case "View All Employees":
                //make a function to see all emp//
                break;
            case "View All Employees By Roles":
                //make view all roles func//
                break;
            case "View all Emplyees By Deparments":
                //same//
                break;

            case "Add Employee?":
                //same//
                break;

            case "Update Employee":
                //same//
                break;

            case "Add Role?":
                //same//
                break;

            case "Add Department?":
                //same//
                break;
        }
    })
}

init();