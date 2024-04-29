import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
import { v4 as uuidv4 } from "uuid";

const { persistAtom } = recoilPersist();

export interface IToDo {
  id: string;
  text: string;
}

export interface IToDoItem {
  id: string; 
  toDos: IToDo[]; 
  description?: string 
}

export interface IToDoState {
  [key: string]: IToDoItem
}

export const toDoState  = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": { id: uuidv4(), description: "This is to do", toDos: [] },
    Doing: { id: uuidv4(), description: "This is doing", toDos: [] },
    Done: { id: uuidv4(), description: "This is done", toDos: [] }
  },
  effects_UNSTABLE: [persistAtom]
})

export const currentDraggingState = atom<boolean>({
  key: "dragging",
  default: false
});

export const addItemModalOpenState = atom<boolean>({
  key: "addIteModalOpen",
  default: false
});