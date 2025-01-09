import React, { useState } from "react";
import useTodoStore from "../store/todoStore";

const AddTodo = () => {
  const [task, setTask] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTodo(task);
      setTask("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddTodo;
