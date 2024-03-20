import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, customCategoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import CreateCustomCategory from "./CreateCustomCategory";


function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const customCategories = useRecoilValue(customCategoryState);

  const [category, setCategory] = useRecoilState<Categories>(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any); // FIX ME
  }
  return (
    <div>
      <h1>To Dos</h1>
      <br />
      <CreateCustomCategory/>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
        {
          customCategories?.map(customCategory => {
            return (
              <option 
                key={customCategory.id} 
                value={customCategory.text}>
                  {customCategory.text}
                </option>
            )
          })
        }
      </select>
      <CreateToDo/>

      <ul>
        {toDos.map(toDo => <ToDo key={toDo.id} {...toDo}/>)}
      </ul>

    </div>
  );
}

export default ToDoList;
