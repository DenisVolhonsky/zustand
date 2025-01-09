import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  todos: [],
  filter: "all",
  notification: "",

  addTodo: (task) =>
    set((state) => ({
      todos: [...state.todos, { id: Date.now(), task, completed: false }],
      notification: "Task created",
    })),

  toggleTodo: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
      notification: "Status changed",
    })),

  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
      notification: "Task deleted",
    })),

  setFilter: (filter) => set({ filter }),

  resetNotification: () => set({ notification: "" }),

  fetchTodos: async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    set((state) => ({
      todos: [
        ...state.todos,
        ...data.map((todo) => ({
          id: todo.id,
          task: todo.title,
          completed: todo.completed,
        })),
      ],
    }));
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
