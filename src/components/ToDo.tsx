import { useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, IToDo, customCategoryState, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
  const customCategories = useRecoilValue(customCategoryState);
  const categories = [...Object.values(Categories), ...customCategories.map(cate => cate.text)];
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (newCategory: Categories | string) => {
    setToDos((prevToDos) => {
      const targetIndex = prevToDos.findIndex(toDo => toDo.id === id);
      const newToDo = {text, id, category: newCategory};
      
      return [...prevToDos.slice(0, targetIndex), newToDo, ...prevToDos.slice(targetIndex+1)];
    })
  };

  return (
    <li>
      <span>{text} / {category}</span>
      {categories.map(categoryItem => {
        if (category !== categoryItem) {
          return (
            <button onClick={() => onClick(categoryItem)}>{categoryItem}</button>
          );
        }
      })}
    </li>
  )
}

export default ToDo;
