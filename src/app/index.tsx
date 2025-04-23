import './styles/index.css'
import {useDragState} from "@features/drag-card/model/useDrag.ts";
import {useBoards} from "@features/boards-management/model/useBoards.ts";
import {AppRouter} from "@app/providers/router/ui/AppRouter.tsx";
import {BoardColumn} from "@entities/Boards";

function Index() {
    // const boards = useSelector(getBoards)
    const {boards,setBoards} = useBoards()
    const {currentItem,currentBoard,onDragEnd,onDragStart} = useDragState()
    return (
        <div className="app">
            {boards.map((board) => (
                <BoardColumn
                    key={board.id}
                    board={board}
                    boards={boards}
                    setBoards={setBoards}
                    onDragStart={onDragStart}
                    onDragEnd={(e)=>onDragEnd(e)}
                    currentBoard={currentBoard}
                    currentItem={currentItem}
                />
            ))}
            <AppRouter/>
        </div>
    )
}

export default Index
