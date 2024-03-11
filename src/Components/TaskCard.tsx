import { useState } from "react";
import style from "./TaskCard.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDoneOutline } from "react-icons/md";
import Todo from "../models/Todo.td";
import { PiTrashSimple } from "react-icons/pi";

export const TaskCard = ({
  task,
  onEditTask,
  onDeleteTask,
  onCompleteTask,
}: Todo) => {
  const { Title, Description } = task;

  const [doneTodo, setDoneTodo] = useState<boolean>();

  const handleComplete = () => {
    setDoneTodo(true);
    const completedTodo = {
      id: task.id,
      Title: task.Title,
      Description: task.Description,
      completed: true,
    };
    console.log(completedTodo);
    onCompleteTask(completedTodo);
  };

  const onReOpenTask = () => {
    onEditTask(task);
    setDoneTodo(false);
  };

  const onDeleteTodo = () => {
    onDeleteTask(task);
  };

  return (
    <>
      <div className={style.CardContainer}>
        <h3>{Title}</h3>
        <p>{Description}</p>
        <p>{!doneTodo ? "❌" : "✅"}</p>
        <div className={style.buttonWrapper}>
          <button
            type="button"
            className={style.btn_btn_primary}
            onClick={handleComplete}
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
