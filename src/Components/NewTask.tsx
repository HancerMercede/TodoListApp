import { SetStateAction, useEffect, useState } from "react";
import style from "./NewTask.module.css";
import TaskFunction from "../models/TaskFunction.td";
import Task from "../models/Task.td";

const myTodo: Task = {
  id: "",
  Title: "",
  Description: "",
  completed: false,
};
export const NewTask = ({
  newTaskFunction,
  updatedTaskFunction,
  task,
}: TaskFunction) => {
  const [Title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [EditTodo, setEditTodo] = useState<Task>(myTodo);

  useEffect(() => {
    setEditTodo(task);
  }, [task]);

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
  };

  const onCreateTask = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    task = {
      id: "",
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
      id: EditTodo.id,
      Title: EditTodo.Title,
      Description: EditTodo.Description,
      completed: false,
    };
    console.log(UpdatedTask);
    updatedTaskFunction(UpdatedTask);
    onClear();
  };

  return (
    <>
      {EditTodo ? (
        <div className={style.container}>
          <form className={style.form} onSubmit={onEditTask}>
            <input
              type="text"
              placeholder="Title..."
              value={EditTodo?.Title || ""}
              onChange={(ev) =>
                setEditTodo({ ...EditTodo!, Title: ev.target.value })
              }
            />
            <textarea
              placeholder="Description..."
              maxLength={200}
              value={EditTodo?.Description || ""}
              onChange={(ev) =>
                setEditTodo({ ...EditTodo!, Description: ev.target.value })
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
