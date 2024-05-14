import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../store/taskSlice";
import { addTask } from "../store/taskSlice";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleToggleCompletion = (taskId) => {
    dispatch(toggleTask(taskId));
    const updatedTasks = tasks.map((task) => ({
      ...task,
      completed: task.id === taskId ? !task.completed : task.completed,
    }));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    // Check if there are tasks in localStorage
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      // Dispatch an action to update the Redux store with the tasks from localStorage
      // If you don't have a specific action for this, you can use the existing addTask action
      if (!tasks.length) storedTasks.forEach((task) => dispatch(addTask(task)));
    }
  }, []);

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  if (!tasks.length) return null;

  return (
    <ul className="flex mx-auto bg-[#7c7f7c6c] px-2 max-w-[400px] border-x-white border backdrop-blur-sm rounded-lg flex-col items-center mt-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between w-full my-4 max-w-[400px]"
        >
          <div
            className={`capitalize w-[70%] break-words text-wrap font-semibold text-start ${
              task.completed ? "line-through  blur1" : ""
            }`}
          >
            {task.text}
          </div>
          <div className=" flex items-center justify-between w-[30%]">
            <input
              type="checkbox"
              className="w-4 h-4 flex-auto"
              title="mark as completed"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task.id)}
            />
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default TaskList;
