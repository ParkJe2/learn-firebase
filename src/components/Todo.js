// components/Todo.js
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { query } from "firebase/firestore";
import { addDoc } from "firebase/firestore";

const Todo = () => {
  const [todos, setTodos] = useState([
    { text: "할 일 1", isDone: false, id: 1 },
    { text: "할 일 2", isDone: true, id: 2 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "todos"));
      const querySnapshot = await getDocs(q);

      const initialTodos = [];

      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.id,
          ...doc.data(),
        };
        console.log("data", data);
        initialTodos.push(data);
      });

      setTodos(initialTodos);
    };
    fetchData();
  }, []);

  const [text, setText] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "text") {
      setText(value);
    }
  };

  const addTodo = async (event) => {
    event.preventDefault();
    const newTodo = { text: text, isDone: false };
    setTodos((prev) => {
      return [...todos, newTodo];
    });
    setText("");
    const collectionRef = collection(db, "todos");

    await addDoc(collectionRef, newTodo);
  };

  return (
    <div>
      <h2>할 일 컴포넌트</h2>
      <form>
        <div>
          <label>할 일 : </label>
          <input type="text" value={text} name="text" onChange={onChange} required></input>
          <button onClick={addTodo}>추가</button>
        </div>
      </form>
      <h3>Working</h3>
      {todos
        .filter((todo) => !todo.isDone)
        .map((todo) => {
          return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
      <h3>Done</h3>
      {todos
        .filter((todo) => todo.isDone)
        .map((todo) => {
          return <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />;
        })}
    </div>
  );
};

export default Todo;
