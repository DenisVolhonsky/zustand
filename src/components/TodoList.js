import React from "react";
import useTodoStore from "../store/todoStore";

const TodoList = () => {
    
  const todos = useTodoStore((state) => {
    if (state.filter === "all") {
      return state.todos;
    }
    if (state.filter === "completed") {
      return state.todos.filter((todo) => todo.comleted);
    }
    if (state.filter === "pending") {
      return state.todos.filter((todo) => !todo.completed);
    }
  });

  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  console.log(todos);
  return (
    <div>
      <h1>Task list:</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
