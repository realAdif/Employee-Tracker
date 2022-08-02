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

prompt();

function prompt(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'answers',
            message: "What would you like to do:",
            choices: ['View all department',
                    'View all roles',
                    'View all employess',
                    'Add department',
                    'Add a department',
                    'Update an employee role',
                    'Exit'],
    
        },
    ]).then(({answers}) =>{
        console.log(answers);
        if(answers === 'View all department'){
            console.log('this works');
            prompt()
        }else if(answers === 'View all roles'){
            SQLroles();
        }else if(answers === 'View all employess'){

        }else if(answers === 'Add department'){

        }else if(answers === 'Add a department'){

        }else if(answers === 'Update an employee role'){

        }
        else{
            console.log("Bye");
        }
    });
}

function SQLroles(){
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
    });
}


app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
  
  