const mysql = require("mysql");
const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));

//nodejs와 mysql을 연결하기 위한 기능
const fs = require("fs");

const conn = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "1234",
    port : "3306",
    database : "nodejs_db"
}); //my sql 정보입력

conn.connect();

/* article 테이블 데이터 입력 시작*/

const json1 = fs.readFileSync('./article_data');
let articleData = json1.toString();
let parse1 = JSON.parse(articleData);

let article_sql = "insert into article values (?, ?, ?, ?, ?, ? ,? ,?, ?)";

conn.query(article_sql, [parse1.articleTitle, parse1.articleId, parse1.link, parse1.authorName, parseInt(parse1.citatedCount), parseInt(parse1.regDate), parse1.category,  parse1.keyword, parse1.abstract], function (err, row) {

    if (!err) {
        console.log("article 입력 성공");
    } else {
        console.log("article 입력 실패"+err);
    }

    conn.end();
});

/* article 테이블 데이터 입력 끝 */