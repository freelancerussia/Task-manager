import {DragEvent, useCallback} from "react";
import {Item} from "@entities/Item";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "@app/providers/StoreProvider";
import {boardsActions} from "@entities/Boards/model/slice/boardsSlice.ts";
import {dragStateActions} from "@features/drag-card/model/slice/dragStateSlice.ts";
import {getCurrentBoard} from "@features/drag-card/model/selectors/getCurrentBoard.ts";
import {getCurrentItem} from "@features/drag-card/model/selectors/getCurrentItem.ts";
import {Board} from "@entities/Boards";

interface DropHandlers {
    onDropItem: (board: Board, item: Item) => void;
    onDropBoard: (board: Board) => void;
    onDragOver: (e: DragEvent<HTMLElement>) => void;
    onDragLeave: (e: DragEvent<HTMLElement>) => void;
}

export const useDropHandlers = (): DropHandlers => {

    // const boards = useSelector(getBoards)
const dispatch = useDispatch<AppDispatch>()
    const currentBoard = useSelector(getCurrentBoard);
    const currentItem = useSelector(getCurrentItem);

    const onDragOver = (e: DragEvent<HTMLElement>) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        if (target.className === 'item') {
            target.style.boxShadow = '0 2px 3px gray';
        }
    };

    const onDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
        const target = e.target as HTMLElement;
        target.style.boxShadow = 'none';
    }, []);

    const onDropItem = useCallback((board: Board, item: Item) => {
        if (!currentItem || !currentBoard) return;
        if (currentBoard.id === board.id && currentItem.id === item.id) return;

        dispatch(
            boardsActions.moveItem({
                sourceBoardId: currentBoard.id,
                destinationBoardId: board.id,
                itemId: currentItem.id,
                destinationItemIndex: board.items.findIndex(i => i.id === item.id),
            })
        );
        dispatch(dragStateActions.setDragEnd());

    }, [currentBoard, currentItem, dispatch ]);

    const onDropBoard = useCallback(
        (board: Board) => {
            if (!currentItem || !currentBoard) return;
            if (currentBoard.id === board.id && currentBoard.items.some(i => i.id === currentItem.id)) {
                return;
            }
            dispatch(
                boardsActions.moveItem({
                    sourceBoardId: currentBoard.id,
                    destinationBoardId: board.id,
                    itemId: currentItem.id,
                    destinationItemIndex: board.items.length,
                })
            );
            dispatch(dragStateActions.setDragEnd());
        },
        [currentItem, currentBoard, dispatch]
    );


    return {onDropItem, onDropBoard, onDragOver, onDragLeave};
};