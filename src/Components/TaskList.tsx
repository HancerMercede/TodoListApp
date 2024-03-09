import { useEffect, useState } from "react";
import Task from "../models/Task.td";
import { NewTask } from "./NewTask";
import { TaskCard } from "./TaskCard";
import style from "./TaskList.module.css";
import taskArray from "../Persistence/db";

export const TaskList = () => {
  const [todos, setTodos] = useState(taskArray);

  const todolist = JSON.parse(localStorage.getItem("todolist")!);

  if (!todolist) {
    localStorage.setItem("todolist", JSON.stringify(taskArray));
  }

  const onCreateNewTask = (task: Task) => {
    if (task.Title === "") return;

    task.id = todos?.length + 1;
    setTodos([task, ...todos]);
    localStorage.setItem("todolist", JSON.stringify([task, ...todos]));
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todolist")!));
  }, [setTodos]);

  return (
    <>
      <NewTask newTaskFunction={onCreateNewTask} />
      <div className={style.TaskListContainer}>
        <ul>
          {todos?.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </ul>
      </div>
    </>
  );
};
