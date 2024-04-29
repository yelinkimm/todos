import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IToDo, IToDoItem, IToDoState, toDoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
  description?: string;
}

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  max-width: 300px;
  background-color: ${(props) => props.theme.boardColor};
  min-height: 300px;
  overflow: hidden;
  border-radius: 10px;
  border-top: 5px solid;
  border-image: linear-gradient(to right,#E033FE,#3FA1F9) 1 0 0 0;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h2`
  margin-bottom: 10px;
  padding: 10px 10px 0 10px;
  font-weight: 600;
  font-size: 18px;
  color: #333D9B;
`;

const Description = styled.span`
  padding: 0 10px;
  font-size: 13px;
  color: grey;
`;

interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean
}

const Area = styled.div<IArea>`
  flex-grow: 1;
  background-color: ${prop => prop.isDraggingOver ? "#dfe6e9" : prop.isDraggingFromThis ? "#b2bec3" : "transparent"};
  padding: 20px 10px 0 10px;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  background-color: white;
  input {
    width: 100%;
    background: none;
    border: none;
  }
`;

const AddCardBtn = styled.button`
  min-width: 20px;
  min-height: 20px;
  border-radius: 50%;
  border: none;
  background-color: #3fa2f97d;
`;

function Board({ toDos, boardId, description }: IBoardProps) {
  const setToDo = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDo((allBoards) => {
      const newToDo = { id: uuidv4(), text: toDo }
      const currentBoard: IToDoItem = allBoards[boardId];

      const newCard: IToDoState = {
         ...allBoards,
        [boardId]: {...currentBoard, toDos: [...currentBoard.toDos, newToDo]}
      }

      return newCard;
    })
    setValue("toDo", "");
    
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      {description && <Description>{description}</Description>}
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef} 
            {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index}/>
            ))}
            {/* placeholder: 내부 컴포넌트를 옮겨도 board의 크기를 유지시켜줌 */}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>

      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`}/>
        <AddCardBtn type="submit">+</AddCardBtn>
      </Form>
    </Wrapper>
  )
}

export default Board;
