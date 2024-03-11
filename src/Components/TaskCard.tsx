import { useState } from "react";
import style from "./TaskCard.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDoneOutline } from "react-icons/md";
import Todo from "../models/Todo.td";
import { PiTrashSimple } from "react-icons/pi";

export const TaskCard = ({ task, onEditTask, onDeleteTask }: Todo) => {
  const { Title, Description, completed } = task;

  const [completeTask, setCompleteTask] = useState(completed);

  const onCompleteTask = () => {
    setCompleteTask(true);
  };

  const onReOpenTask = () => {
    onEditTask(task);
    setCompleteTask(false);
  };

  const onDeleteTodo = () => {
    onDeleteTask(task);
  };

  return (
    <>
      <div className={style.CardContainer}>
        <h3>{Title}</h3>
        <p>{Description}</p>
        <p>{!completeTask ? "❌" : "✅"}</p>
        <div className={style.buttonWrapper}>
          <button
            type="button"
            className={style.btn_btn_primary}
            onClick={onCompleteTask}
          >
            <MdDoneOutline size={20} />
          </button>
          <button
            type="button"
            className={style.btn_btn_secundary}
            onClick={onReOpenTask}
          >
            <FiEdit size={20} />
          </button>
          <button
            type="button"
            className={style.btn_btn_dander}
            onClick={onDeleteTodo}
          >
            <PiTrashSimple size={20} />
          </button>
        </div>
      </div>
    </>
  );
};
