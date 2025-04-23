import './styles/index.css'
import {AppRouter} from "@app/providers/router/ui/AppRouter.tsx";
import {Board, BoardColumn, getBoards} from "@entities/Boards";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@app/providers/StoreProvider";
import {Item} from "@entities/Item";
import {dragStateActions} from "@features/drag-card/model/slice/dragStateSlice.ts";

function Index() {
    const boards = useSelector(getBoards)
    // const {onDragEnd,onDragStart} = useDragState()
    const dispatch = useDispatch<AppDispatch>();

    const onDragStartHandler = (board: Board, item: Item) => {
        dispatch(dragStateActions.setDragStart({ board, item }));
    };

    const onDragEndHandler = () => {
        dispatch(dragStateActions.setDragEnd());
    };
    return (
        <div className="app">
            {boards.map((board) => (
                <BoardColumn
                    key={board.id}
                    board={board}
                    onDragStart={onDragStartHandler}
                    onDragEnd={onDragEndHandler}

                />
            ))}
            <AppRouter/>
        </div>
    )
}

export default Index
