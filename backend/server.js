const express = require("express");

const db = require('./db');

const app = express();

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

// 클라이언트에서 입력한 값을 DB이 lists 테이블에 넣어주기
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