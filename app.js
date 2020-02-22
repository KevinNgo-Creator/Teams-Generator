const inquirer = require('inquirer');
const fs = require("fs");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const Manager = require('./asset/Manager');
const Engineer = require('./asset/Engineer');
const Intern = require('./asset/Intern');

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
        name: "role"
    }
]

let internQuestion = [
    {
        message: 'What school are they going to?',
        name: "role"
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
            name: "role"
        }
    ])
    .then(function (data) {
        employeeArray.push(new Manager(data.name, data.id, data.email, data.role));


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
          if (data.employee === 'No') {
            writeFileAsync("./output/profile.html", generateHTML())
            return
          }

            inquirer
                .prompt(questions.concat(roleQuestions[data.employee]))
                .then(function (data2) {
                    switch (data.employee) {
                        case 'Engineer':
                            employeeArray.push(new Engineer(data2.name, data2.id, data2.email, data2.role));
                            break;
                        case 'Intern':
                            employeeArray.push(new Intern(data2.name, data2.id, data2.email, data2.role));
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
        <script src="https://code.jquery.com/jquery-3.4.1.js"</script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"</script>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"</script>

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
                <h2 class="card-title"><span id="name">${employeeArray[i].name}</span> 
                <br> 
                ${employeeArray[i].getRole()}
                    </h2>
                </div>
            <div class="card-body">
                <p class="card-text">
                    <div>ID: <span id="ID">${employeeArray[i].id}</span></div>
                        <div>Email: <span id="email">${employeeArray[i].email}</span></div>
                            <div>${employeeArray[i].role}: <span id="role">${employeeArray[i].getRoleEmp()}</span></div>
                    </p>
                </div>
                </div>`
    }

    HTML += `</div></body></html>`
    return HTML;
}
