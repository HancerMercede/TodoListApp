import { SetStateAction, useEffect, useState } from "react";
import style from "./NewTask.module.css";
import TaskFunction from "../models/TaskFunction.td";
import Task from "../models/Task.td";

export const NewTask = ({
  newTaskFunction,
  updatedTaskFunction,
  task,
}: TaskFunction) => {
  const [Title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [todo, setTodo] = useState<Task>(task || null);

  useEffect(() => {
    setTodo(task);
  }, [setTodo, task]);

  function onInputChange(ev: { target: { value: SetStateAction<string> } }) {
    setTitle(ev.target.value);
  }

  const onInput2Change = (ev: {
    target: { value: SetStateAction<string> };
  }) => {
    setDescription(ev.target.value);
  };

  const onClear = () => {
    setTitle("");
    setDescription("");
    setTodo(null);
  };

  const onCreateTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    task = {
      id: 0,
      Title: Title,
      Description: description,
      completed: false,
    };
    newTaskFunction(task);
    onClear();
  };

  const onEditTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const UpdatedTask: Task = {
      id: 0,
      Title: todo.Title,
      Description: todo.Description,
      completed: false,
    };

    console.log(UpdatedTask);
    updatedTaskFunction(UpdatedTask);
    onClear();
  };

  return (
    <>
      {task ? (
        <div className={style.container}>
          <form className={style.form} onSubmit={onEditTask}>
            <input
              type="text"
              placeholder="Title..."
              value={todo?.Title || ""}
              onChange={(ev) => setTodo({ ...todo!, Title: ev.target.value })}
            />
            <textarea
              placeholder="Description..."
              maxLength={200}
              value={todo?.Description || ""}
              onChange={(ev) =>
                setTodo({ ...todo!, Description: ev.target.value })
              }
            ></textarea>
            <button type="submit" className={style.btn_btn_primary}>
              Edit
            </button>
          </form>
        </div>
      ) : (
        <div className={style.container}>
          <form className={style.form} onSubmit={onCreateTask}>
            <input
              type="text"
              placeholder="Title..."
              value={Title}
              onChange={onInputChange}
            />
            <textarea
              placeholder="Description..."
              maxLength={200}
              value={description}
              onChange={onInput2Change}
            ></textarea>
            <button type="submit" className={style.btn_btn_primary}>
              Save
            </button>
          </form>
        </div>
      )}
    </>
  );
};
