const mysql = require("mysql");
//nodejs와 mysql을 연결하기 위한 기능

// const conn = mysql.createConnection({
//     host : "localhost",
//     user : "root",
//     password : "1234",
//     port : "3306",
//     database : "nodejs_db"
// });//my sql 정보입력

const conn = mysql.createConnection({
        host : "222.102.104.70",
        user : "smhrd",
        password : "1234",
        port : "3306",
        database : "nodejs_db"
    });

module.exports = conn;