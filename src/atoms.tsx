import { atom, selector } from "recoil";

export interface IToDo {
  id: number;
  text: string;
}

interface IToDoState {
  [key: string]: IToDo[]
}

export const toDoState  = atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [{id:1,text:"a"}],
    Doing: [{id:2,text:"b"}, {id:3,text:"c"}],
    Done: []
  }
})