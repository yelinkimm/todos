import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: Categories) => {
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex(toDo => toDo.id === id);
      const newToDo = {text, id, category: newCategory};
      
      return [...prevToDos.slice(0, targetIndex), newToDo, ...prevToDos.slice(targetIndex+1)];
    })
  };

  return (
    <li>
      <span>{text}</span>
      {
        category !== Categories.DOING && (
          <button 
            name={Categories.DOING} 
            onClick={() => onClick(Categories.DOING)}>
              Doing
          </button>
        )
      }
      {
        category !== Categories.TO_DO && (
          <button 
            name={Categories.TO_DO} 
            onClick={() => onClick(Categories.TO_DO)}>
              To do
          </button>
        )
      }
      {
        category !== Categories.DONE && (
          <button 
            name={Categories.DONE} 
            onClick={() => onClick(Categories.DONE)}>
              Done
          </button>
        )
      }
    </li>
  )
}

export default ToDo;
