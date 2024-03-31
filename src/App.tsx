import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";

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
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;

    if (!destination) return;
    if (destination?.droppableId === source.droppableId) { // same board movement
      const droppableId = destination?.droppableId;

      setToDos((allBoards) => {
        const boardCopy = [...allBoards[droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId)
        return {...allBoards, [droppableId]: boardCopy};
      })
    } else { // cross board movement
      setToDos((allBoards) => {
        const destinationCopy = [...allBoards[destination.droppableId]];
        const sourceCopy = [...allBoards[source.droppableId]];

        sourceCopy.splice(source.index, 1);
        destinationCopy.splice(destination?.index, 0, draggableId)

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
      </Wrapper>
    </DragDropContext>
  );
}

export default App;