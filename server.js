/*
http 모듈보다 훨씬 기능이 많고 개선된 express 모듈로 서버를 구축하자!!
express 모듈은  특히 미들웨어라 불리는 함수가 지원되므로, 필요한 기능이
있을때마다 이 미들웨어를 연결만 하면 된다!!
*/
var express = require("express"); //외부 모듈이므로 설치 요구됨
var multer = require("multer"); //파일업로드 처리 모듈!!
var path = require("path");//파일의 경로 정보를 반환준다,확장자까지
var mysql = require("mysql");  //external module
var ejs = require("ejs"); //서버측에서 해석 및 실행되는 동적 뷰파일
var fs = require("fs");


//mysql 접속문자열 선언 
var conStr = {
    host:"localhost",
    user:"root",
    password:"1234",
    database:"ios"
}

var app = express(); //express 객체 생성

//정적자원까지 라우팅을 하면 너무나 많은 자원에 대한 요청연결 작업을 해야함
//해결책) 정적 자원의 경로를 등록하면, 알아서 자동으로 전송한다!!
app.use(express.static(__dirname));

//멀터 객체 생성 
var upload = multer({
    storage:multer.diskStorage({
        destination: function(request, file, cb){
            cb(null, "./data"); //업로드 경로 지정
        },
        filename:function(request, file, cb){
            //cb(null, file.originalname); //유일성이 없기 때문에 
            //서버에 이미 존재하는 다른 이미지와 충돌..
            //20201234564.jpg
            cb(null, new Date().valueOf()+path.extname(file.originalname));
        }
    })
});

//업로드 요청 처리 (post)
//파일이 여러개인 경우 upload.array("myFile")

app.post("/regist", upload.array("myFile") , function(request, response){
    console.log("제목 파라미터 값: ",  request.body);
    console.log("파일정보: ",  request.files);
    var filename = request.files[0].filename

    //데이터 베이스에 넣기!!
    var con = mysql.createConnection(conStr);
    con.connect();//open
    
    var sql ="insert into gallery(title , filename) values(?,?)";
    
    con.query(sql, [ request.body.title , filename ] , function(error, result, fields){
        if(error){
            console.log(error);
        }else{
            //결과 처리 
            response.redirect("/list.html");
        }
    });

    con.end();//close
});

//목록요청 처리 
//이 요청은 클라이언트의 종류가 스마트폰이건, 브라우저이건 상관없이 
//공통의 요청이 되려면, 데이터만 보내자..View롤 보여주려고 하지말자
//뷰에 대한 책임은 데이터를 가져간 클라이언트가 알아서 하는 거다..
app.get("/list", function(request, response){
    //select  query 
    var con = mysql.createConnection(conStr);
    con.connect();
    var sql="select * from gallery";

    con.query(sql, function(err, result, fields){
        console.log("결과집합은 ",  result);
        if(err){
            console.log(err);
        }else{
            //클라이언트의 유형을 알수없기 때문에 
            //결과만 전송하자!! 제이슨 형식으로 보내야 클라이언트가 제대로
            //동작한다!!!
            var obj={
                "list" : result    
            }
            response.writeHead(200,{"Content-Type":"text/json;charset=utf-8"});
            response.end(JSON.stringify(obj));
        }
    });
    con.end();
});


app.get("/", function(request, response){
    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    response.end("This is content from server");
});

app.listen(8888, function(){
    console.log("Express Server is running at 8888 port...");
});

