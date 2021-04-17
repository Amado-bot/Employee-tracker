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
                viewAllEmployees();
                break;
            case "View All Employees By Roles":
                viewAllRoles();
                break;
            case "View all Emplyees By Deparments":
                viewAllDeparments();
                break;

            case "Add Employee?":
                addEmployee();
                break;

            case "Update Employee":
                updateEmployee();
                break;

            case "Add Role?":
                addRole();
                break;

            case "Add Department?":
                addDepartment();
                break;
        }
    })
}

function viewAllEmployees() {
    db.query("",
        function (err, res) {
            if (err) throw err
            console.log(res)
            init()
        })
}

function viewAllRoles() {
    db.query("",
        function (err, res) {
            if (err) throw err
            console.log(res)
            init()
        })
}

function viewAllDepartments() {
    db.query("",
        function (err, res) {
            if (err) throw err
            console.log(res)
            init();
        })
}

var roleArr = [];

function selectRole() {
    db.query("SELECT * FROM role", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
        }
    })
    return roleArr;
}
var managersArr = [];

function selectManagers() {
    db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function (err, res) {
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name);
        }
    })
    return managersArr;
}

function addEmployee() {
    inquirer.prompt([{
        name: 'firstName',
        type: 'input',
        message: 'Enter First Name'
    }, {

        name: 'lastName',
        type: 'input',
        message: 'Enter Last Name'
    }, {
        name: 'role',
        type: 'list',
        message: 'Choose A Roll',
        choices: selectRole()
    }, {
        name: 'choice',
        type: 'rawlist',
        message: 'Choose A Manager',
        choices: selectmanager()
    }])
}
init();