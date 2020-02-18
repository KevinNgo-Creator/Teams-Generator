const inquirer = require("inquirer");

function promptUser() {
  return inquirer.prompt([
    {
        type: "input",
        name: 'name',
        message: 'What is this employees Name',
      },
    {
        type: "input",
        name: 'id',
        message: 'What is this employees ID',
      },
    {
        type: "input",
        name: 'email',
        message: 'What is this employees Email',
      },
    {
        type: "input",
        name: 'role',
        message: 'What is this employees Role',
      }
    ]);
  }

  function generateHTML(answers){
return`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main html</title>
</head>
<body>
    
</body>
</html>`
};





//   }
//         getName(name); {
          

//         getId(id); {

//         };

//         getEmail(email); {

//         };

//         getRole(role); {
//           if(role === manager){
//             inquirer.prompt()

//           }
//         };
//     }
// }


// class Employee {
  //     constructor(name, id, email, role,){
  
  //       const newEmployee = new Employee,
  
  //         this.name = name,
  //         this.id = id,
  //         this.id = email,
  //         this.role = role,
  