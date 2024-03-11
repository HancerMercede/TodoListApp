import Task from "./Task.td";

interface Todo {
    task:Task,
    onEditTask:(arg:Task) => void;
    onDeleteTask:(arg:Task) => void;
}

export default Todo;