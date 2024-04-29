import { DragDropContext, Droppable, Draggable, DropResult, DragStart, ResponderProvided } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addItemModalOpenState, currentDraggingState, toDoState } from "./atoms";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import DeleteArea from "./components/DeleteBoard";
import AddNewItem from "./components/AddNewItem";

const Wrapper = styled.div`
  display: flex;
  /* max-width: 1200px; */
  width: 90vw;
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
  gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

const AddNewBoardBtn = styled.button`
  display: flex;
  align-items: center;
  padding: 10px;
  position: absolute;
  top: 10px;
  right: 10px;
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const setDragging = useSetRecoilState(currentDraggingState)
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [open, setOpen] = useRecoilState(addItemModalOpenState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;

    if (!destination) return;

    if (destination.droppableId === "delete") {
      setToDos((allBoards) => {
        const boardCopy = {...allBoards[source.droppableId]};
        const boardToDosCopy = [...boardCopy.toDos];
        boardToDosCopy.splice(source.index, 1);

        return {...allBoards, [source.droppableId]: {...boardCopy, toDos: boardToDosCopy}};
      });

      setDragging(false);

      return;
    }

    if (destination?.droppableId === source.droppableId) { // same board movement
      setToDos((allBoards) => {
        const boardCopy = {...allBoards[source.droppableId]},
              toDosCopy = [...boardCopy.toDos],
              targetItem = toDosCopy[source.index];
        
        toDosCopy.splice(source.index, 1);
        toDosCopy.splice(destination?.index, 0, targetItem);

        return {...allBoards, [source.droppableId]: {...boardCopy, toDos: toDosCopy}};
      })
    } else { // cross board movement
      setToDos((allBoards) => {
        const destinationCopy = {...allBoards[destination.droppableId]};
        const destinationToDosCopy = [...destinationCopy.toDos];
        const sourceCopy = {...allBoards[source.droppableId]};
        const sourceToDosCopy = [...sourceCopy.toDos];
        const targetItem = sourceCopy.toDos[source.index];

        sourceToDosCopy.splice(source.index, 1);
        destinationToDosCopy.splice(destination?.index, 0, targetItem);

        return {
          ...allBoards, 
          [destination.droppableId]: {...destinationCopy, toDos: destinationToDosCopy}, 
          [source.droppableId]: {...sourceCopy, toDos: sourceToDosCopy}
        };
      });
    }
  };

  const handleNewBoardClick = () => {
    setOpen(true)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AddNewBoardBtn onClick={handleNewBoardClick}>
        <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"></path>
        </svg>
        <span>Create New Board</span>
      </AddNewBoardBtn>

      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId: string) => (
            <Board 
              key={boardId} 
              boardId={boardId}
              description={toDos[boardId].description}
              toDos={toDos[boardId].toDos}/>
          ))}
        </Boards>
        <DeleteArea/>
      </Wrapper>

      <AddNewItem/>
    </DragDropContext>
  );
}

export default App;