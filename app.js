const express = require("express");
// import express from "express";
// 문법이 두 가지가 있음
const cors = require("cors");
const todosRouter = require("./routes/todos");

const app = express(); // app으로 변수를 담아서 사용

const port = 3010; // 3010은 임의로 지정한 포트번호. 변경할 수 있음

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// 위 두 줄은 상대방이 보낸 json 데이터를 받는 역할을 함

app.use(cors());
app.use("/todos", todosRouter);
// todosRouter를 사용하겠다는 의미

app.get("/", (req, res) => {
  return res.send("Hello, Express!");
});
// 서버가 열려있는지 확인하기 위한 코드

app.listen(port, () => {
  console.log(`🚀 Server is listening on port : ${port}`);
});
// app.listen() 함수를 사용하여 서버를 열어줌. 요청이 들어오나 확인하는 역할. console.log()는 서버가 열리면 출력되는 메시지
// 서버를 열기 위한 코드
