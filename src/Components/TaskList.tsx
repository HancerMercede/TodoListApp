import { useEffect, useState } from "react";
import Task from "../models/Task.td";
import { NewTask } from "./NewTask";
import { TaskCard } from "./TaskCard";
import style from "./TaskList.module.css";
import taskArray from "../Persistence/db";

export const TaskList = () => {
  const [todos, setTodos] = useState(taskArray);
  const [todo, setTodo] = useState<Task>();

  // Here i call the item todolist in the localstorage
  const todolist = JSON.parse(localStorage.getItem("todolist")!);

  // and here i knnow this key doesn't exist so i create it.
  if (!todolist) {
    localStorage.setItem("todolist", JSON.stringify(taskArray));
  }

  const onCreateNewTask = (task: Task) => {
    if (task.Title === "") return;

    task.id = todos?.length + 1;
    setTodos([task, ...todos]);
    localStorage.setItem("todolist", JSON.stringify([task, ...todos]));
  };

  const onEditTask = (task: Task) => {
    console.log(task);
    const todo = todos.filter((todo) => todo.id === task.id);

    todo.forEach((el) => {
      setTodo(el);
    });

    const newArray = todos.filter((todo) => todo.id !== task.id);
    setTodos(newArray);
    localStorage.setItem("todolist", JSON.stringify(newArray));
  };

  const onUpdatedTask = (task: Task) => {
    task.id = todos?.length + 1;
    setTodos([task, ...todos]);
    localStorage.setItem("todolist", JSON.stringify([task, ...todos]));
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todolist")!));
  }, [setTodos]);

  return (
    <>
      <NewTask
        newTaskFunction={onCreateNewTask}
        updatedTaskFunction={onUpdatedTask}
        task={todo!}
      />
      <div className={style.TaskListContainer}>
        <ul>
          {todos?.map((t) => (
            <TaskCard key={t.id} task={t} onEditTask={onEditTask} />
          ))}
        </ul>
      </div>
    </>
  );
};
