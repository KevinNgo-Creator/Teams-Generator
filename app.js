const inquirer = require('inquirer');

const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const Manager = require('./asset/lib/Manager');
const Engineer = require('./asset/lib/Engineer');
const Intern = require('./asset/lib/Intern');

let employeeArray = []

let questions = [
    {
        message: "What is your employee's name?",
        name: 'name',
    },
    {
        message: 'What is their id?',
        name: "id"
    },
    {
        message: 'What is their email address?',
        name: "email"
    },
]

let engineerQuestion = [
    {
        message: 'What is their GitHub user name?',
        name: "roleVar"
    }
]

let internQuestion = [
    {
        message: 'What school are they going to?',
        name: "roleVar"
    }
]

inquirer
    .prompt([
        {
            message: "What is your manager's name?",
            name: 'name',
        },
        {
            message: 'What is their id?',
            name: "id"
        },
        {
            message: 'What is their email address?',
            name: "email"
        },
        {
            message: 'What is their office number?',
            name: "roleVar"
        }
    ])
    .then(function (data) {
        employeeArray.push(new Manager(data.name, data.id, data.email, data.roleVar));


        addEmployee();
    })

function addEmployee() {
    inquirer
        .prompt(
            {
                message: 'Would you like to add an employee?',
                name: 'employee',
                choices: ["Engineer", 'Intern', 'No'],
                type: 'list'
            }
        )
        .then(function (data) {
            let q = [];

            switch (data.employee) {
                case 'No':
                    console.log(employeeArray)
                    let HTML = generateHTML();
                    writeFileAsync("./output/profile.html", HTML)
                    return null;
                case 'Engineer':
                    q = engineerQuestion;
                    break;
                case 'Intern':
                    q = internQuestion;
                    break;
            }


            inquirer
                .prompt(questions.concat(q))
                .then(function (data2) {
                    switch (data.employee) {
                        case 'Engineer':
                            employeeArray.push(new Engineer(data2.name, data2.id, data2.email, data2.roleVar));
                            break;
                        case 'Intern':
                            employeeArray.push(new Intern(data2.name, data2.id, data2.email, data2.roleVar));
                            break;
                    }

                    addEmployee();
                })

        })
}


function generateHTML() {
    let HTML = `<!DOCTYPE html>
    <head>
        <title></title>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <meta http-equiv='X-UA-Compatible' content='ie=edge'>
    
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
            crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
            crossorigin="anonymous"></script>
       
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
            crossorigin="anonymous"></script>
    
        <style>
            header {
                position: relative;
                background-color: red;
                color: white;
                width: 100%;
                height: 100px;
            }
    
            header h1 {
                position: relative;
                left: 40%
            }
    
            .card-header {
                background-color: blue;
                color: white;
            }
        </style>
    </head>
    
    <body>
        <header>
            <h1>My Team</h1>
        </header>
        <div class=row>`

    for (let i = 0; i < employeeArray.length; i++) {
        HTML += `<div class="card col-md-2" style="width: 18rem;">
            <div class="card-header">
                <h5 class="card-title"><span id="name">${employeeArray[i].name}</span> 
                <br> 
                ${employeeArray[i].getRole()}
                </h5>
            </div>
            <div class="card-body">
                <p class="card-text">
                    <div>ID: <span id="ID">${employeeArray[i].id}</span></div>
                        <div>Email: <span id="email">${employeeArray[i].email}</span></div>
                    <div>${employeeArray[i].role}: <span id="role">${employeeArray[i].getRoleVar()}</span></div>
                </p>
            </div>
        </div>`
    }

    HTML += `</div></body></html>`
    return HTML;
}