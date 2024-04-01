import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

interface IBoardProps {
  toDos: IToDo[];
  boardId: string;
}

interface IForm {
  toDo: string;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;

interface IArea {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean
}

const Area = styled.div<IArea>`
  flex-grow: 1;
  background-color: ${prop => prop.isDraggingOver ? "#dfe6e9" : prop.isDraggingFromThis ? "#b2bec3" : "transparent"};
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
`;

function Board({ toDos, boardId }: IBoardProps) {
  const setToDo = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    setToDo((allBoards) => {
      const newToDo = { id: Date.now(), text: toDo }
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newToDo]
      };
    })
    setValue("toDo", "");
    
  }
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {required: true})} type="text" placeholder={`Add task on ${boardId}`}/>
      </Form>
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
    </Wrapper>
  )
}

export default Board;
