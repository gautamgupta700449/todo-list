import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./app.css";

function App() {
  return (
    <div className="app min-h-screen text-teal-50 text-center sm:p-8">
      <h1 className="text-3xl py-8 font-bold">Simple To-Do App</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
}

export default App;
