const express = require("express");
// import express from "express"; 와 같음

const router = express.Router();
// express.Router() 함수를 사용하여 router를 만듦

let todoId = 1;
let todos = [{ id: 1, title: "청소하기", isDone: false }];
// 데이터베이스를 사용하지 않았기 때문에 대신 사용할 데이터. 메모리에 저장되는 데이터기 때문에 서버를 껐다 켜면 초기화됨

router.post("/", (req, res) => {
  const { title } = req.body;
  // body에 있는 title을 가져옴

  if (!title) {
    return res.status(400).json({
      message: "Not exist title.",
    });
  }
  // title이 없을 때 에러메시지를 보냄

  todoId++;
  // todoId = todoId + 1; todoId += 1; 와 같음. 증감연산자

  const newTodo = { id: todoId, title, isDone: false };
  // 새로운 todo를 만듦

  todos.push(newTodo);
  //  push() 함수를 사용하여 todos 배열에 newTodo를 넣음

  console.log(todos);

  return res.json({ todo: newTodo });
});

router.get("/", (req, res) => {
  return res.json({ todos });
});
//res.json() 함수를 사용하여 todos를 보냄

router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  // params는 url에 있는 데이터를 가져옴. 구조분해할당을 사용하여 todoId를 가져옴

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }
  // isNaN() 함수를 사용하여 숫자가 아닌지 확인하여 에러메시지를 보냄

  let existTodo;

  todos.map((v, i) => {
    if (v.id === +todoId) {
      existTodo = v;
    }
  });
  // map() 함수를 사용하여 todos 배열을 순회하면서 todoId와 일치하는 todo를 찾음

  if (!existTodo) {
    return res.status(400).json({
      message: "Not exist todo",
    });
  }
  // 존재하지 않는 todoId를 요청했을 때 에러메시지를 보냄. 존재하지 않는 todo

  return res.json({ todo: existTodo });
});

router.put("/:todoId/done", (req, res) => {
  const { todoId } = req.params;

  // params는 url에 있는 데이터를 가져옴. 구조분해할당을 사용하여 todoId를 가져옴

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }
  // isNaN() 함수를 사용하여 숫자가 아닌지 확인하여 에러메시지를 보냄

  let updateTodo;
  // 업데이트 된 todo를 담을 변수

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title: v.title, isDone: !v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });
  // map() 함수를 사용하여 todos 배열을 순회하면서 todoId와 일치하는 todo를 찾음

  if (!updateTodo) {
    return res.status(400).json({
      message: "Not exist todo.",
    });
  }
  // updateTodo가 없을 때 에러메시지를 보냄

  return res.json({ todo: updateTodo });
});
// 어떤 updateTodo를 보낼지 정해줌

router.put("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const { title } = req.body;
  // body에 있는 title을 가져옴

  if (isNaN(todoId) || !title) {
    return res.status(400).json({
      message: "Not exist data.",
    });
  }
  // isNaN() 함수를 사용하여 숫자가 아닌지, title이 없는지 확인하여 에러메시지를 보냄

  let updateTodo;
  // 업데이트 된 todo를 담을 변수

  todos = todos.map((v) => {
    if (v.id === +todoId) {
      updateTodo = { id: v.id, title, isDone: v.isDone };

      return updateTodo;
    } else {
      return v;
    }
  });
  // map() 함수를 사용하여 todos 배열을 순회하면서 todoId와 일치하는 todo를 찾음

  console.log(todos);

  return res.json({ todo: updateTodo });
});

router.delete("/:todoId", (req, res) => {
  const { todoId } = req.params;
  // params는 url에 있는 데이터를 가져옴. 구조분해할당을 사용하여 todoId를 가져옴

  if (isNaN(todoId)) {
    return res.status(400).json({
      message: "todoId is not a number.",
    });
  }

  todos = todos.filter((v) => {
    if (v.id !== +todoId) {
      return v;
    }
  });
  // filter() 함수를 사용하여 todos 배열을 순회하면서 todoId와 일치하지 않는 todo를 찾음

  console.log(todos);

  return res.json({ message: "Deleted todo." });
});
// todo가 삭제되었을 때 메시지를 보냄

module.exports = router;
// 리액트에서 export default router; 이런 식으로 쓰는 것과 같음
