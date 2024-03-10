import Task from "./Task.td";

interface TaskFunction  {
    task:Task,
    newTaskFunction: (arg:Task) => void;
    updatedTaskFunction: (arg:Task) => void;
  }
  
  export default TaskFunction;