import { DragEvent, Dispatch, SetStateAction, useCallback} from "react";
import {Board} from "@entities/Board";
import {Item} from "@entities/Item";

interface DropHandlers {
    onDropItem: (board: Board, item: Item) => void;
    onDropBoard: (board: Board) => void;
    onDragOver: (e: DragEvent<HTMLElement>) => void;
    onDragLeave: (e: DragEvent<HTMLElement>) => void;
}

export const useDropHandlers = (boards: Board[], setBoards: Dispatch<SetStateAction<Board[]>>,currentBoard: Board | null,
                                currentItem: Item | null): DropHandlers => {

    // const {currentBoard, currentItem} = useDragState();

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
        // console.log('currentItem',currentItem)
        // console.log('currentBoard',currentBoard)
        if (!currentItem || !currentBoard) return;
        if (currentBoard.id === board.id && currentItem.id === item.id) return;

        const updatedBoards = [...boards];
        const sourceBoardIndex = updatedBoards.findIndex(b => b.id === currentBoard.id);
        const targetBoardIndex = updatedBoards.findIndex(b => b.id === board.id);

        if (sourceBoardIndex === -1 || targetBoardIndex === -1) return;

        const sourceBoard = updatedBoards[sourceBoardIndex];
        const targetBoard = updatedBoards[targetBoardIndex];

        const itemIndex = sourceBoard.items.findIndex(i => i.id === currentItem.id);
        if (itemIndex === -1) return;

        const [removedItem] = sourceBoard.items.splice(itemIndex, 1);
        const dropIndex = targetBoard.items.findIndex(i => i.id === item.id);
        targetBoard.items.splice(dropIndex, 0, removedItem);

        setBoards(updatedBoards);
    }, [boards, currentBoard, currentItem, setBoards]);

    const onDropBoard = useCallback((board: Board) => {
        if (!currentItem || !currentBoard) return;

        if (currentBoard.id === board.id &&
            currentBoard.items.some(i => i.id === currentItem.id)) { // Проверяем, есть ли элемент уже в этой доске
            return;
        }

        const updatedBoards = [...boards];
        const sourceBoardIndex = updatedBoards.findIndex(b => b.id === currentBoard.id);
        const targetBoardIndex = updatedBoards.findIndex(b => b.id === board.id);

        if (sourceBoardIndex === -1 || targetBoardIndex === -1) return;

        const sourceBoard = updatedBoards[sourceBoardIndex];
        const targetBoard = updatedBoards[targetBoardIndex];

        const itemIndex = sourceBoard.items.findIndex(i => i.id === currentItem.id);
        if (itemIndex === -1) return;

        const [removedItem] = sourceBoard.items.splice(itemIndex, 1);
        targetBoard.items.push(removedItem);

        setBoards(updatedBoards);
    }, [boards, currentBoard, currentItem, setBoards]);

    return { onDropItem, onDropBoard, onDragOver, onDragLeave };
};