import { useState } from "react";
import Task from "../models/Task.td";
import style from "./TaskCard.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDoneOutline } from "react-icons/md";

export const TaskCard = (props: { task: Task }) => {
  const [completeTask, setCompleteTask] = useState(props.task.completed);

  const onCompleteTask = () => {
    setCompleteTask(true);
  };

  const onReOpenTask = () => {
    setCompleteTask(false);
  };

  return (
    <>
      <div className={style.CardContainer}>
        <h3>{props.task.Title}</h3>
        <p>{props.task.Description}</p>
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
        </div>
      </div>
    </>
  );
};
