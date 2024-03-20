import { atom, selector } from "recoil";

export enum Categories {
  TO_DO = "TO_DO", 
  DOING = "DOING", 
  DONE = "DONE"
}

export interface IToDo {
  id: number;
  text: string;
  category: Categories | string;
}
export interface ICustomCategory {
  id: number;
  text: string;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO
});

export const customCategoryState = atom<ICustomCategory[]>({
  key: "customCategories",
  default: []
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: []
});

// atom으로부터 ouput 변형할 수 있음
export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({get}) => {
    const toDos = get(toDoState); // selector의 내부로 atom을 가지고 올 수 있음
    const category =  get(categoryState);
    return toDos.filter(toDo => toDo.category === category);
  }
});