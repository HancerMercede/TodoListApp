import { SetStateAction, useState } from "react";
import style from "./NewTask.module.css";
import Task from "../models/Task.td";
import TaskFunction from "../models/TaskFunction.td";

let task: Task = {
  id: 0,
  Title: "",
  Description: "",
  completed: false,
};

export const NewTask = ({ newTaskFunction }: TaskFunction) => {
  const [Title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

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
      id: 0,
      Title: Title,
      Description: description,
      completed: false,
    };
    console.log(task);
    newTaskFunction(task);
    onClear();
  };

  return (
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
  );
};
