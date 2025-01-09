import AddTodo from "./components/AddTodo";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import useTodoStore from "./store/todoStore";

function App() {
  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  return (
    <div>
      <h1>Zustand examples</h1>
      <TodoFilter />
      <AddTodo />
      <TodoList />
      <button onClick={fetchTodos}>Fetch todos</button>
    </div>
  );
}

export default App;
