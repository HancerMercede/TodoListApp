import { Header } from "./Components/Header";
import { TaskList } from "./Components/TaskList";

function App() {
  return (
    <>
      <Header name={"Frello"} slogan={"Making your work easy."} />
      <TaskList />
    </>
  );
}

export default App;
