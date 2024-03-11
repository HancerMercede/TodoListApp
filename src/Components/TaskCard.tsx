import { useState } from "react";
import style from "./TaskCard.module.css";
import { FiEdit } from "react-icons/fi";
import { MdDoneOutline } from "react-icons/md";
import Todo from "../models/Todo.td";
import { PiTrashSimple } from "react-icons/pi";
import Swal from "sweetalert2";

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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your task has been completed",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => onCompleteTask(completedTodo));
  };

  const onReOpenTask = () => {
    onEditTask(task);
    setDoneTodo(false);
  };

  const onDeleteTodo = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "your task has been delete!",
          icon: "success",
        }).then(() => onDeleteTask(task));
      }
    });
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
