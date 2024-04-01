import { DragDropContext, Droppable, Draggable, DropResult, DragStart, ResponderProvided } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { currentDraggingState, toDoState } from "./atoms";
import Board from "./components/Board";
import { useEffect } from "react";
import DeleteArea from "./components/DeleteBoard";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  grid-template-columns: repeat(3, 1fr);
`;

function App() {
  const setDragging = useSetRecoilState(currentDraggingState)
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    if (destination.droppableId === "delete") {
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        return {...allBoards, [source.droppableId]: boardCopy};
      });

      setDragging(false);

      return;
    }

    if (destination?.droppableId === source.droppableId) { // same board movement
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const targetItem = boardCopy[source.index];

        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, targetItem);
        return {...allBoards, [source.droppableId]: boardCopy};
      })
    } else { // cross board movement
      setToDos((allBoards) => {
        const destinationCopy = [...allBoards[destination.droppableId]];
        const sourceCopy = [...allBoards[source.droppableId]];
        const targetItem = sourceCopy[source.index];

        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination?.index, 0, targetItem)

        return {...allBoards, [destination.droppableId]: destinationCopy, [source.droppableId]: sourceCopy};
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId: string) => <Board key={boardId} boardId={boardId} toDos={toDos[boardId]}/>)}
        </Boards>
        <DeleteArea/>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;