import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  todos: [],
  filter: "all",
  notification: "",

  addTodo: (task) =>
    set(
      (state) => ({
        todos: [...state.todos, { id: Date.now(), task, completed: false }],
        notification: "Task created",
      }),
      false,
      "todo/addTodo"
    ),

  toggleTodo: (id) =>
    set(
      (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ),
        notification: "Status changed",
      }),
      false,
      "todo/toggleTodo"
    ),

  deleteTodo: (id) =>
    set(
      (state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
        notification: "Task deleted",
      }),
      false,
      "todo/deleteTodo"
    ),

  setFilter: (filter) => set({ filter }, false, "todo/setFilter"),

  resetNotification: () =>
    set({ notification: "" }, false, "todo/resetNotification"),

  fetchTodos: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    set(
      (state) => ({
        todos: [
          ...state.todos,
          ...data.map((todo) => ({
            id: todo.id,
            task: todo.title,
            completed: todo.completed,
          })),
        ],
      }),
      false,
      "todo/fetchTodos"
    );
  },
});

const useTodoStore = create(
  devtools(
    persist(store, {
      name: "todo-storage",
    })
  )
);

export default useTodoStore;
