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

// const conn = mysql.createConnection({
//     host : "222.102.104.70",
//     user : "smhrd",
//     password : "1234",
//     port : "3306",
//     database : "nodejs_db"
// }); //my sql 정보입력

conn.connect();

/* citation 테이블 데이터 입력 시작 */
const json2 = fs.readFileSync('./citation_data');
let citationData = json2.toString();
let p2 = JSON.parse(citationData);

let update_query = 'update article set citation_id = ? where article_id = ?';

conn.query(update_query, [p2.aId, p2.cId1], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId2], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId3], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId4], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId5], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId6], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId7], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId8], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cId9], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

conn.query(update_query, [p2.aId, p2.cI10], function (err, row) {

    if(!err){
        console.log("업데이트 성공");
    }else {
        console.log("업데이트 실패");
    }
});

/* citation 테이블 데이터 입력 끝*/

conn.end();