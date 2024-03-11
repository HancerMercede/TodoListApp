import { useEffect, useState } from "react";
import Task from "../models/Task.td";
import { NewTask } from "./NewTask";
import { TaskCard } from "./TaskCard";
import style from "./TaskList.module.css";
import taskArray from "../Persistence/db";
import { v4 as uuid4 } from "uuid";

export const TaskList = () => {
  const [todos, setTodos] = useState(taskArray);
  const [doneTask, setDoneTask] = useState(taskArray);
  const [todo, setTodo] = useState<null | Task>();

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todolist")!));
  }, [setTodos]);

  // Here i call the item todolist in the localstorage
  const todolist = JSON.parse(localStorage.getItem("todolist")!);

  // and here i knnow this key doesn't exist so i create it.
  if (!todolist) {
    localStorage.setItem("todolist", JSON.stringify(taskArray));
  }

  // Here i call the item todolist in the localstorage
  const CompletedTodoList = JSON.parse(
    localStorage.getItem("completedtodolist")!
  );

  if (!CompletedTodoList) {
    localStorage.setItem("completedtodolist", JSON.stringify(taskArray));
  }

  const onCreateNewTask = (task: Task) => {
    if (task.Title === "" || task.Description === "") return;

    task.id = uuid4();
    setTodos([task, ...todos]);
    localStorage.setItem("todolist", JSON.stringify([task, ...todos]));
  };

  const onEditTask = (task: Task) => {
    const todo = todos.filter((todo) => todo.id === task.id);

    todo.forEach((elTodo) => {
      setTodo(elTodo);
    });

    const newArray = todos.filter((todo) => todo.id !== task.id);
    setTodos(newArray);
    localStorage.setItem("todolist", JSON.stringify(newArray));
  };

  const onUpdatedTask = (task: Task) => {
    if (task.Title === "" || task.Description === "") return;

    task.id = uuid4();
    setTodos([task, ...todos]);
    localStorage.setItem("todolist", JSON.stringify([task, ...todos]));
    setTodo(null);
  };

  const onDeleteTask = (task: Task) => {
    console.log(task.id);
    const newArray = todos.filter((todo) => todo.id !== task.id);
    setTodos(newArray);
    localStorage.setItem("todolist", JSON.stringify(newArray));
  };

  const onCompleteTask = (task: Task) => {
    // Saving the completed todo in a constant variable
    const completedTodo = task;

    // Setting the completed todos state to manage that information.
    setDoneTask([completedTodo, ...doneTask]);

    // Setting the localstorage data to consume later
    localStorage.setItem(
      "completedtodolist",
      JSON.stringify([completedTodo, ...doneTask])
    );

    // and removing the todo from the main state
    const newArray = todos.filter((todo) => todo.id !== task.id);
    // Setting the new state in to the main localstorage.

    setTodos(newArray);
    localStorage.setItem("todolist", JSON.stringify(newArray));
  };
  console.log(JSON.parse(JSON.stringify(CompletedTodoList)));
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
            <TaskCard
              key={t.id}
              task={t}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onCompleteTask={onCompleteTask}
            />
          ))}
        </ul>
      </div>
    </>
  );
};
