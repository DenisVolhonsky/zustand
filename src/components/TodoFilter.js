import React from "react";
import useTodoStore from "../store/todoStore";

const TodoFilter = () => {
  const filter = useTodoStore((state) => state.filter);
  const setFilter = useTodoStore((state) => state.setFilter);

  return (
    <div>
      <button
        style={{ fontWeight: filter === "all" ? "bold" : "normal" }}
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button
        style={{ fontWeight: filter === "completed" ? "bold" : "normal" }}
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button
        style={{ fontWeight: filter === "pending" ? "bold" : "normal" }}
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
};

export default TodoFilter;
