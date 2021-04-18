//======== Dependencies===================//
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');
const db = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeDB"
  });


//========== db connect ==========================//
db.connect(function (err) {
    if (err) throw err
    console.log("Connected to DB")
    init();
});

//START MENU//
function init() {
    inquirer.prompt([{
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice',
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
    db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.log(res)
            init()
        })
}

function viewAllRoles() {
    db.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
        function (err, res) {
            if (err) throw err
            console.log(res)
            init()
        })
}

function viewAllDepartments() {
    db.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
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
        }
    ]).then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        db.query("INSERT INTO employee SET ?", 
        {
            first_name: val.firstName,
            last_name: val.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(val)
            init()
        })
    })
}
//updateEmployee//
function updateEmployee() {
    db.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    // console.log(res)
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        db.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            init()
        })
  
    });
  });

  }
//============= Add Employee Role ==========================//
function addRole() { 
  db.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
    inquirer.prompt([
        {
          name: "Title",
          type: "input",
          message: "What is the roles Title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the Salary?"

        } 
    ]).then(function(res) {
        db.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init();
            }
        )

    });
  });
  }
//============= Add Department ==========================//
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What Department would you like to add?"
        }
    ]).then(function(res) {
        var query = db.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                init();
            }
        )
    })
  }