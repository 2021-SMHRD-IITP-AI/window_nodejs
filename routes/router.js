const express = require("express");
const router = express.Router();
const conn = require("../config/DB_config");
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
            response.redirect("http://127.0.0.1:5500/public/main.html");//로그인전 메인페이지 이동
        }else{
            console.log("누군가 회원가입에 실패하였습니다.");
            response.redirect("http://127.0.0.1:5500/public/Join.html");
        }

    })
    for(let temp = 1; temp<4; temp++){
        let temp2 = ("폴더"+temp);
        console.log(temp2);
        let sql1 = "insert into folder values (?,?,?);"
        conn.query(sql1,[user_id, temp, temp2], function(err,row){
            console.log(user_id+temp+temp2+" ");
        })
        }

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

                    request.session.user = {
                        "name" : row[i].user_name
                    }
                    response.render("ma3",{
                        id : row[i].user_id,
                        name : row[i].user_name
                    })
                    
                    // 로그인 후 메인페이지 이동
                }
                else{
                    console.log("로그인 실패");
                    response.redirect("http://127.0.0.1:5500/public/LoginF.html") //로그인 실패시 로그인창 이동
                    
                }
            }
        }else{//검색된 id가 없을때
            console.log("로그인 실패");
            response.redirect("http://127.0.0.1:5500/public/LoginF.html")// 로그인 실패시 로그인창 이동
        }
    });
    conn.end();
});

router.get("/main", function(request, response){
    let user_id = request.query.id;

    conn.connect();

    let sql = "select * from login where user_id = ?";

    conn.query(sql, [user_id], function(err,row){
        console.log(row+"");
        if(row != ""){
            request.session.user = {
                "name" : row[0].user_name,
            }

            response.render("ma3",{
                id : row[0].user_id,
                name : row[0].user_name,
            })
        }else{
            response.render("ma3",{
                name : "no"
            })

        }
    })
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
                    response.redirect("http://127.0.0.1:5500/public/IdSelectorF.html")
                }
            }
        }
        else{
            console.log("해당 메일로 가입한 아이디가 없습니다.");
            response.redirect("http://127.0.0.1:5500/public/IdSelectorF.html")
        }
    });
    conn.end();
});

router.post("/PwSelector", function(request, response){//보류
    let user_id = request.body.id;
    let user_email = request.body.email;

    conn.connect();

    let sql = "select * from login where user_id = ?"

    conn.query(sql, [user_id], function(err,row){
        if(row.length > 0){
            console.log(err);
            for(let i = 0; i < row.length; i++){
                if(user_id == row[i].user_id && user_email==row[i].user_email){
                    request.session.user ={
                        "id" : row[i].user_id
                    }
                    response.render("PwUpdate",{
                        id : row[i].user_id
                    })

                    // response.redirect("http://127.0.0.1:5502/window_nodejs/public/PwUpdate.html")
                }else{
                    //알럿창으로 다시 입력 하게 하거나 회원가입 창으로 넘어가게 함.
                    response.redirect("http://127.0.0.1:5500/public/PwSelectorF.html")
                }
            }
        }else{
            response.redirect("http://127.0.0.1:5500/public/PwSelectorF.html")
        }
    });
    conn.end();
})

router.post("/PwUpdate",function(request,response){
    let user_id = request.session.user
    let user_pw = request.body.pw;

    console.log(user_id.id);
    
    console.log(user_pw);

    conn.connect();//mysql연결

    let sql ="update login set user_pw = ? where user_id = ?";

    conn.query(sql,[user_pw, user_id.id] ,function(err, row){
        if(!err){
            request.session.destroy(function(){
                request.session;
            })
        response.redirect("http://127.0.0.1:5502/window_nodejs/public/Login.html")
        }
        else{
            console.log("수정 실패"+err);
        }
    })
    conn.end();
});

// router.get("/main", function(request, response){
//     let ser = request.query.ser;
//     conn.connect(); //mysql 연결
//     let keyword = "%" + ser + "%";

//     let sql = "select * from article where article_title like ?";
//     conn.query(sql, [keyword], function (err, row) {
//         console.log(row);
//         response.render("ma2", {
//             in_row : row
//         })
//     })

//     conn.end();
// })

router.get("/sealist", function(request, response){

    let sea = request.query.sea;

    conn.connect(); //mysql 연결
    let keyword = "%" + sea + "%";

    let sql = "select * from article where article_title like ?";
    conn.query(sql, [keyword], function (err, row) {
        // console.log(row);
        response.send(row);
    })
    conn.end();
})

router.get("/cit_list", function(request, response){

    let sea = parseInt(request.query.sea);

    conn.connect(); //mysql 연결
    let article_id = sea;

    let sql = "select * from article where citation_id = ? ";
    conn.query(sql, [article_id], function (err, row) {
        // console.log(row);
        response.send(row);
    })

    // let sql2 = "select * from article where article_id = (select citation_id from article where article_id = ? )"
    // conn.query(sql2, [article_id], function (err, row2) {
    //     // console.log(row);
    //     response.send(row2);

})

router.get("/cited_list", function(request, response){

    let sea = parseInt(request.query.sea);

    conn.connect(); //mysql 연결
    let article_id = sea;

    let sql = "select * from article where article_id = (select citation_id from article where article_id = ? )"
    conn.query(sql, [article_id], function (err, row) {
        // console.log(row);
        response.send(row);
    })
})

// router.get("/cit_list2", function(request, response){

//     let sea = parseInt(request.query.sea);

//     conn.connect(); //mysql 연결
//     let article_id = sea;

//     let sql = "select article_title from article where citation_id = ? ";
//     conn.query(sql, [article_id], function (err, row) {
//         // console.log(row);
//         response.send(row);
//     })

// })

router.get("/LEF", function(request, response){
    let ser = request.query.ser;
    conn.connect(); //mysql 연결
    let keyword = "%" + ser + "%";

    let sql = "select * from article where article_title like ?";
    conn.query(sql, [keyword], function (err, row) {
        console.log(row);
        response.render("LEF", {
            in_row : row
        })
    })

    conn.end();

})

router.get("/MID", function(request, response){
    let title = request.query.det;
    let num = request.query.den;
    conn.connect(); //mysql 연결
    console.log(title);
    console.log(num);

    let sql = "select * from article where article_title=? and article_id=?";
    conn.query(sql, [title, num], function (err, row) {

        response.render("MID", {
            in_row : row
        })
    })

    conn.end();
})

router.get("/REI", function(request, response){
    response.render("REI", {

    });
})

router.get("/bookon", function(request, response){

    let id = request.query.id;
    let folder = request.query.folder;
    let target = request.query.target;

    //  conn.connect(); //mysql 연결
    // let keyword = "%" + sea + "%";

    //  let sql = "select * from article where article_title like ?";
    // conn.query(sql, [keyword], function (err, row) {
    //      // console.log(row);
    //     response.send(row);
    // })
    // conn.end();

})

router.post("/mark", function(request, response){
    let id=request.body.id;
    // console.log(`${id}`);
    conn.connect();

    let sql = "select * from folder where user_id = ?";
    conn.query(sql, [id], function(err,row){
        
            response.render("book_pop",{
                in_row: row
            })

        
    })
    conn.end();

});

router.get("/Logout", function(request, response){

    request.session.destroy(function(){
        request.session;
    })

    // response.render("ma2",{
    //     name : "no"
    // })
    response.redirect("http://127.0.0.1:5502/window_nodejs/public/main.html")

});

module.exports = router;