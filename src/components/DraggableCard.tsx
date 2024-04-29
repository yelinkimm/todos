import { memo, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentDraggingState } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) => props.isDragging ? "#e4f2ff" : props.theme.cardColor};
  box-shadow: ${(props) => props.isDragging ? "0px 2px 5px rgba(0, 0, 0, 0.05)" : "none"};
`;

interface IDraggableCardProps {
  toDoId: string;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: IDraggableCardProps) {
  const setDragging = useSetRecoilState(currentDraggingState);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  useEffect(() => {
    setDragging(isDragging);
  }, [isDragging, setDragging])

  return (
    <>
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => {
        if (isDragging !== snapshot.isDragging) {
          setIsDragging((prev) => prev !== snapshot.isDragging ? snapshot.isDragging : prev)
        }
        return (
          <Card
            isDragging={snapshot.isDragging}
            ref={magic.innerRef}
            {...magic.dragHandleProps}
            {...magic.draggableProps}
          >
            {toDoText}
          </Card>
        )
      }}
  </Draggable>
    </>
  )
}

export default memo(DraggableCard); // prop이 변하지 않았다면 해당 component를 re-rendering 하는 걸 방지
