import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: IToDo["category"]) => {
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex(toDo => toDo.id === id);
      const newToDo = {text, id, category: newCategory};
      
      return [...prevToDos.slice(0, targetIndex), newToDo, ...prevToDos.slice(targetIndex+1)];
    })
  };

  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" && <button onClick={() => onClick("DOING")}>Doing</button>}
      {category !== "TO_DO" && <button onClick={() => onClick("TO_DO")}>To do</button>}
      {category !== "DONE" && <button onClick={() => onClick("DONE")}>Done</button>}
    </li>
  )
}

export default ToDo;
