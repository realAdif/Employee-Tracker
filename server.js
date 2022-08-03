const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// this is my first time doing this :)
const titleScreen = console.log("\x1b[32m",`.___________________________________.
 |        <- Employee Tacker ->      |
 |        <- Made By Aditya  ->      |
 '-----------------------------------'`);

init();
prompt();

// all my functions
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
    let roleTitle;
    let roleSalary;
    let roleDepartment_id;

    inquirer.prompt([
    {
        type:'input',
        name: 'title',
        message: 'What is the title for the role?',
    }, {
        type:'input',
        name: 'salary',
        message: 'What is the salary for the role?',
    }, {
        type:'input',
        name: 'department',
        message: 'What is the department id for the role?',
    }])
    .then(({title,salary,department})=>{ 
        
        roleTitle = title;
        roleSalary = salary;
        roleDepartment_id = department;
        db.query('INSERT INTO role(title, salary, department_id) VALUES(?,?,?)',[roleTitle,roleSalary,roleDepartment_id],(err,results)=>{
            if(err) console.log(err);

            console.log(results);
            prompt();
        })
    })


}

function sqlAddEmployee(){
    let firstName;
    let lastName;
    let roleId;
    let managerId;
    inquirer.prompt([
    {
        type:'input',
        name: 'employeeFirstName',
        message: 'What is the employee first name?',
    },{
        type:'input',
        name: 'employeeLastName',
        message: 'What is the employee last name?',
    },{
        type:'input',
        name: 'employeeRoleId',
        message: 'What is the employee id?',
    },{
        type:'input',
        name: 'employeeManagerId',
        message: 'What is the employee manager id?',
    }
]).then(({employeeFirstName,employeeLastName,employeeRoleId,employeeManagerId})=>{
    firstName = employeeFirstName;
    lastName = employeeLastName;
    roleId = employeeRoleId;
    managerId = employeeManagerId;
    if(managerId == '') managerId ='NULL';
    
    console.log(`first name ${firstName}`);
    console.log(`last name ${lastName}`);
    console.log(`role id ${roleId}`);
    console.log(`manager id ${managerId}`);
    db.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)',[firstName,lastName,roleId,managerId],(err,results)=>{
        if(err) console.log(err);

        console.log(results);
        prompt();      
    })
})
}
// this function connection to the sql
function init(){
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

    app.use((req, res) => {
        res.status(404).end();
    });
      
    app.listen(PORT, () => {
       
    });
}