const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'aditya',
        database: 'employees_db'
    },
    console.log(`Connected to the courses_db database.`)
);

// view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
inquirer.prompt([
    {
        type: 'list',
        name: "QUSTIONS",
        choices: ['alligator', 'crocodile'],
    },
])

db.query('SELECT * FROM role', function (err, results) {
    console.log(results);
});

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  
  