const mysql = require("mysql"); 
const inquirer = require("requirer"); 

const connection = mysql.createConnection({
    host: "localhost", 
    port: 3306, 
    user: "root", 
    password: "Tjul869511!", 
    database: "employeesDB", 
}); 

connection.connect(function(err) {
    if (err) throw err; 
    console.log("connected!", connection.threadId); 

});