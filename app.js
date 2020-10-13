//dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

//sql
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Tjul869511!",
  database: "employeesDB",
});

//sql connect to db
connection.connect(function (err) {
  if (err) throw err;

  //run function
  startPrompt();
});

//initial prompt to ask questions of what user would like to do

function startPrompt() {
  console.log("working");
  inquirer
    .prompt({
      type: "list",
      name: "ownerChoice",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Employees by Department",
        "Add Employee",
        "Remove Employees",
        "Update Employee Role",
        "Add Role",
        "Quit",
      ],
    })

    //conditional switch statement for options

    .then(function ({ ownerChoice }) {
      switch (ownerChoice) {
        case "View Employees":
          viewEmployee();
          break;
        case "View Employees by Department":
          viewEmployeesByDept();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        case "Add Role":
          addRole();
          break;
        case "Quit":
          connection.end();
          break;
      }
    });
}

// function View Employees
function viewEmployee() {
  console.log("VE Working");

  // https://dev.mysql.com/doc/refman/8.0/en/outer-join-simplification.html

  var query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name)`;
}

// function View Employees by Department
function viewEmployeesByDept() {
  console.log("VEBD Working");
}
// function Add Employee
function addEmployee() {
  console.log("Add Employee");
}
// function Remove Employees
function removeEmployee() {
  console.log("Remove Employee");
}
// function Update Employees Role
function updateEmpRole() {
  console.log("Update Employee Role");
}
// function Add Role
function addRole() {
  console.log("Add Role");
}
// function Quit
