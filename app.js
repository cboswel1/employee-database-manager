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
    database: "employeesDB"
}); 

//sql connect to db
connection.connect(function (err) {
    if (err) throw err; 
    

    //run function 
    startPrompt();
});

//initial prompt to ask questions of what user would like to do

async function startPrompt() {
      console.log("working");
      try {
        const choice = await inquirer.prompt([
          {
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
              "Quit"
            ]
          }
        ])
    
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
      } catch (err) {
        console.log(err);
    }
    }
   

// function View Employees 
async function viewEmployee() {
    console.log("VE Working");
}
// function View Employees by Department 
async function viewEmployeesByDept() {
    console.log("VEBD Working");
}
// function Add Employee 
async function addEmployee() {
    console.log("Add Employee");
}
// function Remove Employees 
async function removeEmployee() {
    console.log("Remove Employee");
}
// function Update Employees Role 
async function updateEmpRole() {
    console.log("Update Employee Role");
}
// function Add Role 
async function addRole() {
    console.log("Add Role");
}
// function Quit 

