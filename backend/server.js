/* 벡엔드의, 시작점이 되는 파일 */

// 필요한 모듈 가져오기
const express = require("express");

// export한 poo을 server.js에서 불러옵니다. db.js 파일 안에 pool이 들어 있기 때문에,
// db.js 파일을 가져오면 pool을 가져오게 된다.
const db = require('./db');

// 익스프레스 서버 생성
const app = express();

// JSON 형태로 전달되는 요청의 본문을 해석할 수 있게 등록
app.use(express.json());

app.listen(5000, () => {
    console.log("애플리케이션이 5000번 포트에서 시작됐습니다.");
})

// DB의 lists 테이블에 있는 모든 데이터를 FE 서버로 보내주기
app.get('/api/values', function (req, res) {
    //DB에서 모든 정보 가져오기
    db.pool.query('SELECT * FROM lists;',
    (err, results, fileds) => {
        if (err)
            return res.status(500).send(err);
        else
            // FE에 DB에서 가져온 정보를 json 형식으로 보낸다.
            return res.json(results); 
    })
})

// 클라이언트에서 입력한 값을 DB의 lists 테이블에 넣어주기
app.post('/api/value', function (req, res, next) {
    // 데이터베이스에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, results, fileds) => {
        if (err)
            return res.status(500).send(err);
        else
            return res.json({ success: true, value: req.body.value });
    })
})