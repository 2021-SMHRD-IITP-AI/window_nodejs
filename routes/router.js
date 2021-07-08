const express = require("express");
const router = express.Router();
const conn = require("../config/DB_config.js");
const ejs = require("ejs");


router.post("/Join", function(request, response){

    let user_id = request.body.id;
    let user_pw = request.body.pw;
    let user_name = request.body.name;
    let user_email = request.body.email;
    
    conn.connect();
    
    let sql = "insert into login values(?, ?, ?, ?, now())";
    
    conn.query(sql,[user_id, user_pw, user_email, user_name], function(err,row){
        if(!err){
            console.log(user_name+"님이 회원가입 하였습니다.");
            response.redirect("http://127.0.0.1:5500/project_Login_express/public/Login.html");//로그인전 메인페이지 이동
        }else{
            console.log("누군가 회원가입에 실패하였습니다.");
            response.redirect("http://127.0.0.1:5500/project_Login_express/public/Join.html");
        }

    })
    conn.end();
});

router.post("/Login", function(request, response){
    let user_id = request.body.id;
    let user_pw = request.body.pw;

    conn.connect();

    let sql = "select * from login where user_id = ?";

    conn.query(sql, [user_id], function(err,row){
        if(row.length > 0){
            for(let i = 0 ; i < row.length; i++){
                if(user_pw == row[i].user_pw){ //검색된 ID가 있을 때 비교
                    console.log("로그인 성공"+err);
                    response.redirect("http://127.0.0.1:5501/window_nodejs/public/main2.html")
                    // 로그인 후 메인페이지 이동
                }
                else{
                    console.log("로그인 실패"+err);
                    response.redirect("http://127.0.0.1:5501/window_nodejs/public/LoginF.html") //로그인 실패시 로그인창 이동
                    
                }
            }
        }else{//검색된 id가 없을때
            console.log("로그인 실패");
            response.redirect("http://127.0.0.1:5501/window_nodejs/public/LoginF.html")// 로그인 실패시 로그인창 이동
        }
    });
    conn.end();
});

router.post("/IdSelector", function(request, response){
    let user_email = request.body.email;

    conn.connect();

    let sql = "select * from login where user_email = ?";

    conn.query(sql, [user_email], function(err, row){
        if(row.length>0){
            console.log(err);
            for(let i = 0; i < row.length; i++){
                if(user_email==row[i].user_email){//입력한 메일과 db에 저장된 메일 비교
                    response.render("IdSelectorS",{
                        name : row[i].user_name,
                        id : row[i].user_id
                    });
                }
                else{//해당 메일로 가입한 아이디가 없을경우
                    console.log("해당 메일로 가입한 아이디가 없습니다.");
                }
            }
        }
        else{
            console.log("해당 메일로 가입한 아이디가 없습니다.");
        }
    });
    conn.end();
});

router.post("/PwSelector", function(request, response){//보류
    let user_id = request.body.id;
    let user_email = request.body.email;

    conn.connect();

    let sql = "select * from login where user_id = ?"// table명 수정

    conn.query(sql, [user_id], function(err,row){
        if(row.length > 0){
            console.log(err);
            for(let i = 0; i < row.length; i++){
                if(user_id == row[i].user_id && user_email==row[i].user_email){
                    response.redirect("http://127.0.0.1:5500/project_Login_express/public/PwUpdate.html")
                }else{
                    //알럿창으로 다시 입력 하게 하거나 회원가입 창으로 넘어가게 함.
                }
            }
        }
    });
    conn.end();
})
router.post("/PwUpdate",function(request,response){
    let user_id = request.body.id;
    let user_pw = request.body.pw;

    conn.connect();//mysql연결

    let sql ="update login set user_pw = ? where user_id = ?";

    conn.query(sql,[user_pw, user_id] ,function(err, row){
        if(!err){
        response.redirect("http://127.0.0.1:5500/project_Login_express/public/Login.html")
        }
        else{
            console.log("수정 실패"+err);
        }
    })
    conn.end();
});

router.get("/Logout", function(request, response){

    //로그인 정보가 없을 때 : undefined
    //로그인 정보가 있을 때 : object

    response.render("Logout",{
        user : request.session.user
    })
})

router.get("/Login", function(request, response){

    delete request.session.user;

    response.render("Logout",{
        user : undefined
    })
})

module.exports = router;