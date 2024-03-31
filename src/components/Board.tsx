import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";

interface IBoardProps {
  toDos: string[];
  boardId: string;
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

function Board({ toDos, boardId }: IBoardProps) {
  return (
    <Wrapper>
      <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area 
            isDraggingOver={info.isDraggingOver}
            isDraggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef} 
            {...magic.droppableProps}>
            {toDos.map((toDo, index) => (
              <DraggableCard key={toDo} toDo={toDo} index={index}/>
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
