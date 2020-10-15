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

  // banner
console.log(`╔═════════════════════════════════════════════════════╗
║                                                     ║
║     _____                 _                         ║
║    | ____|_ __ ___  _ __ | | ___  _   _  ___  ___   ║
║    |  _| | '_ \` _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\  ║
║    | |___| | | | | | |_) | | (_) | |_| |  __/  __/  ║
║    |_____|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___|  ║
║                    |_|            |___/             ║
║                                                     ║
║     __  __                                          ║
║    |  \\/  | __ _ _ __   __ _  __ _  ___ _ __        ║
║    | |\\/| |/ _\` | '_ \\ / _\` |/ _\` |\/ _ \\ '__|       ║
║    | |  | | (_| | | | | (_| | (_| |  __/ |          ║
║    |_|  |_|\\__,_|_| |_|\\__,_|\\__, |\\___|_|          ║
║                              |___/                  ║
║                                                     ║
\╚═════════════════════════════════════════════════════╝
`);

  //run function
  startPrompt();
});

//initial prompt to ask questions of what user would like to do

function startPrompt() {
  // console.log("working");
  inquirer
    .prompt({
      type: "list",
      name: "ownerChoice",
      message: "What would you like to do?",
      choices: [
        "View Employees",
        "View Departments",
        "View Roles",
        "Add Employee",
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
        case "View Departments":
          viewDept();
          break;
        case "View Roles":
          viewRoles();
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
  // console.log("VE Working");

  // https://dev.mysql.com/doc/refman/8.0/en/outer-join-simplification.html

  const query = `SELECT e.id, 
                e.first_name, 
                e.last_name, 
                r.title, 
                d.name, 
                r.salary, 
                CONCAT (m.first_name, ' ', m.last_name) AS manager
                FROM employee e
                LEFT JOIN role r 
                      ON e.role_id = r.id
                LEFT JOIN department d 
                      ON d.id = r.department_id
                LEFT JOIN employee m 
                      ON m.id = e.manager_id`;

  connection.query(query, function (err, res) {
    if (err) throw err;

    //display
    console.table(res);

    startPrompt();
  });
}


// function to View  Departments
function viewDept() {
  // console.log("VEBD Working");
  //selecting from dept. 
  connection.query("SELECT * from department", function (err, res) {
    if (err) throw err;

    console.table(res);

    startPrompt();
  });
}


//function to View Roles
function viewRoles() {
  // console.log("View Roles Working");
  //selecting for roles
  connection.query("SELECT * from role", function (err, res) {
    if (err) throw err;

    console.table(res);

    startPrompt();
  });
}


// function Add Employee
function addEmployee() {
  // console.log("Add Employee");

  //questions to add employee information
  const addEmp = [
    {
      type: "input",
      message: "Employee's first name?",
      name: "first_name",
    },
    {
      type: "input",
      message: "Employee's last name?",
      name: "last_name",
    },
    {
      type: "input",
      message: "Employee's position?",
      name: "roleID",
    },
    {
      type: "input",
      message: "Who manages this employee?",
      name: "managerID",
    },
  ];
  //insert response into employee
  inquirer.prompt(addEmp).then(function (answer) {
    const query = `INSERT INTO employee SET ?`;

    connection.query(
      query,
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.roleID,
        manager_id: answer.managerID,
      },
      function (err) {
        if (err) throw err;

        viewEmployee();
      }
    );
  });
}


// function Update Employees Role
function updateEmpRole() {
  // console.log("Update Employee Role");

  //prompts for updated employee role
  inquirer
    .prompt([
      {
        type: "input",
        name: "empName",
        message: "Update which employee's information?",
      },
      {
        type: "input",
        name: "newRole",
        message: "Enter new role id (1 - 7):",
      },
    ])
    //updating our db with user input
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id = ? WHERE first_name = ?",
        [answer.newRole, answer.empName],
        function (err, res) {
          if (err) throw err;
          console.table(res);

          startPrompt();
        }
      );
    });
}


// function Add Role
function addRole() {
  // console.log("Add Role");

  //prompts
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Enter new title",
      },
      {
        type: "number",
        name: "salary",
        message: "Enter new salary",
      },
      {
        type: "input",
        name: "department_id",
        message: "Enter department ID (1, 2, 3, 4):",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) values (?, ?, ?)",
        [answer.title, answer.salary, answer.department_id],
        function (err, data) {
          console.table(data);
        }
      );
      viewRoles();
    });
}
