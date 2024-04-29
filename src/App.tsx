import { DragDropContext, Droppable, Draggable, DropResult, DragStart, ResponderProvided } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { addItemModalOpenState, currentDraggingState, toDoState } from "./atoms";
import Board from "./components/Board";
import { useEffect, useState } from "react";
import DeleteArea from "./components/DeleteBoard";
import AddNewItem from "./components/AddNewItem";
import { Button, Tooltip } from "@mui/material";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

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

const AddNewBoardBtn = styled(Button)`
  display: flex;
  align-items: center;
  padding: 10px !important;
  position: absolute !important;
  top: 10px;
  right: 10px;
  border-radius: 10px !important;
  border: none;
  background-color: white !important;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  cursor: pointer;
  > svg {
    width: 30px;
    height: 30px;
  }
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
      <Tooltip title="Add new board" arrow placement="left">
        <AddNewBoardBtn onClick={handleNewBoardClick}>
          <SquaresPlusIcon/>
        </AddNewBoardBtn>

      </Tooltip>

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

      {open && <AddNewItem/>}
    </DragDropContext>
  );
}

export default App;