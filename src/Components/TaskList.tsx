import { useState } from "react";
import Task from "../models/Task.td";
import { NewTask } from "./NewTask";
import { TaskCard } from "./TaskCard";
import style from "./TaskList.module.css";
import taskArray from "../Persistence/db";

export const TaskList = () => {
  const [newTask, setNewTask] = useState(taskArray);

  const onCreateNewTask = (task: Task) => {
    if (task.Title === "") return;

    task.id = newTask?.length + 1;
    setNewTask([task, ...newTask]);
  };

  return (
    <>
      <NewTask newTaskFunction={onCreateNewTask} />
      <div className={style.TaskListContainer}>
        <ul>
          {newTask?.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </ul>
      </div>
    </>
  );
};
