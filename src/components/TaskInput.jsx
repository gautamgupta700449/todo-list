import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

const TaskInput = () => {
  const [task, setTask] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      // Dispatch the addTask action
      dispatch(addTask({ id: Date.now(), text: task, completed: false }));

      // Update localStorage with the new tasks array
      const currentTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const newTasks = [
        ...currentTasks,
        { id: Date.now(), text: task, completed: false },
      ];
      localStorage.setItem("tasks", JSON.stringify(newTasks));

      // Optionally, clear the task input after submission
      setTask("");
    } else {
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={`relative max-w-[500px] mx-auto ${
          task.completed ? "line-through" : ""
        }`}
      >
        <input
          className="p-2 m-2 rounded-md text-slate-900 outline-none "
          type="text"
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            setError(false);
          }}
          placeholder="Add a task"
        />

        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add Task
        </button>
        {error && (
          <p className="text-red-500 absolute bottom-[-12px] sm:left-[23%] left-[13%]">
            Please enter a task
          </p>
        )}
      </div>
    </form>
  );
};

export default TaskInput;
