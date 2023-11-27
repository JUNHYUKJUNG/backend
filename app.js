const express = require("express");
// import express from "express";
// 문법이 두 가지가 있음
const todosRouter = require("./routes/todos");

const app = express();

const port = 3010;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todos", todosRouter);

app.get("/", (req, res) => {
  return res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log(`🚀 Server is listening on port : ${port}`);
});
