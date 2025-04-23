import React, {Dispatch, DragEvent, SetStateAction} from "react";
import {Board} from "@entities/Board";
import {useDropHandlers} from "@features/drag-card/model/useDrop.ts";
import {BoardTitle} from "@shared/ui/BoardTitle/BoardTitle.tsx";
import {ItemCard} from "./ui/ItemCard.tsx";
import {Item} from "@entities/Item";

interface BoardColumnProps {
    board: Board;
    boards: Board[];
    setBoards: Dispatch<SetStateAction<Board[]>>;
    onDragStart: (board: Board, item: Item) => void;
    onDragEnd: (e:DragEvent<HTMLDivElement>) => void;
    currentBoard: Board | null;
    currentItem: Item | null;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
                                                            board,
                                                            boards,
                                                            setBoards ,
                                                            onDragStart,
                                                            onDragEnd,
                                                            currentBoard,
                                                            currentItem,
}) => {
    const { onDropItem, onDropBoard, onDragOver, onDragLeave } = useDropHandlers(boards, setBoards,currentBoard, currentItem);

    return (
        <div
            onDragOver={onDragOver}
            onDrop={() => onDropBoard(board)}
            key={board.id}
            className="board"
        >
            <BoardTitle title={board.title} />
            {board.items.map((item) => (
                <div
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={() => onDropItem(board, item)}
                    key={item.id}
                    draggable={true}
                >
                    <ItemCard
                        item={item}
                        board={board}
                        onDragStart={onDragStart}
                        onDragEnd={(e)=>onDragEnd(e)}
                    />
                </div>
            ))}
        </div>
    );
};