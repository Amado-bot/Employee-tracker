const connection = mysql.createConnection({
     host: "localhost",
     port: 3306,
     user: "root",
     password: "password",
     database: "employeeDB"
   });

  module.exports = db;