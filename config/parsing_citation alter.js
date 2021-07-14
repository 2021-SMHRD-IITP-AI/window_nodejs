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

/* citation 테이블 데이터 입력 시작 */
const json2 = fs.readFileSync('./citation_data');
let citationData = json2.toString();
let p2 = JSON.parse(citationData);

console.log(p2.aId);

let length = Object.keys(p2).length;
console.log(length);
let query = 'alter table article add column citation_id int';
let update_query = 'update article set citation_id = ? where article_id = ?';
let const_query = 'alter table article add constraint article_citation_id foreign key(citation_id) references article(article_id)'


conn.query(query, [], function (err, row) {

    if(!err){
        console.log("변경 성공");
    }else {
        console.log("변경 실패");
    }
    

});

conn.query(const_query, [], function (err, row) {

    if(!err){
        console.log("제약조건 변경 성공");
    }else {
        console.log("제약조건 변경 실패");
    }
    

});

conn.query(update_query, [p2.aId, p2.cId1], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
    

});



/* citation 테이블 데이터 입력 끝*/