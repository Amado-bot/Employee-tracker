const inquirer = require('inquirer');
const db = require('./db/connection');

async function init(){
    const  answers = await inquirer.prompt([{
        type: 'input',
        name: 'temp',
        message: 'what is cow?'

    }]);
    console.log(answers);
   const queryRsponse = await db.promise().query("SELECT * FROM voters;")
   console.log(queryRsponse);
}

init();