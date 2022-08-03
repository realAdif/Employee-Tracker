const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
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

const titleScreen = console.log("\x1b[32m",`.___________________________________.
 |        <- Employee Tacker ->      |
 |        <- Made By Aditya  ->      |
 '-----------------------------------'`);

prompt();

//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function prompt(){
    titleScreen;
    inquirer.prompt([
        {
            type: 'list',
            name: 'answers',
            message: "What would you like to do:",
            choices: ['View all department',
                    'View all roles',
                    'View all employess',
                    'Add department',
                    'Add a role',
                    'Add a employee',
                    'Update an employee role',
                    'Exit'],
    
        },
    ]).then(({answers}) =>{
        if(answers === 'View all department'){
            sqlDepartment();      
        }else if(answers === 'View all roles'){
            sqlRoles();       
        }else if(answers === 'View all employess'){
            sqlEmployee();
        }else if(answers === 'Add department'){
            sqlAddDepartment()
        }else if(answers === 'Add a role'){
            sqlAddRole();
        }else if(answers === 'Add a employee'){
            sqlAddEmployee();
        }else if(answers === 'Update an employee role'){

        }
        else{
            console.log("Bye");   
        }
    });
}

function sqlRoles(){
    db.query('SELECT * FROM role',(err, results) =>{
        console.table(results);
        prompt();   
    });
}
function sqlDepartment(){
    db.query('SELECT * FROM department',(err, results) =>{
        console.table(results);  
        prompt();  
    });
}
function sqlEmployee(){
    db.query('SELECT * FROM employee',(err, results) =>{
        console.table(results);  
        prompt();  
    });
}


function sqlAddDepartment(){
    let AddDepartment;
    inquirer.prompt({
        type: 'input',
        name: 'answers',
        message: "What's the name of the department:",  
    }).then(({answers}) =>{
        console.log(answers);
        AddDepartment = answers
        db.query('INSERT INTO department(name) VALUES(?)',AddDepartment,(err, results) =>{
            if (err) console.log(err);

            console.log(results);
            prompt();  
        });
    })
    
}

function sqlAddRole () {
    
}

function sqlAddEmployee(){

}

app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
   
});
  
  