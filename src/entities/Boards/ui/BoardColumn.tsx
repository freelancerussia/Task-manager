import React, {DragEvent} from "react";
import {Board} from "entities/Boards";
import {useDropHandlers} from "@features/drag-card/model/useDrop.ts";
import {BoardTitle} from "@shared/ui/BoardTitle/BoardTitle.tsx";
import {Item} from "@entities/Item";
import {useBoards} from "@features/boards-management/model/useBoards.ts";
import {ItemCard} from "@entities/Item/ui/ItemCard.tsx";

interface BoardColumnProps {
    board: Board;
    boards: Board[];
    setBoards: (boards: Board[]) => void;
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
    const {addItem} = useBoards()

    return (
        <div
            onDragOver={onDragOver}
            onDrop={() => onDropBoard(board)}
            key={board.id}
            className="board"
        >
            <BoardTitle title={board.title} addItem={()=>addItem(board.id,'qwe')}/>
            {board.items.length === 0 ? 'Задач нет' : board.items.map((item) => (
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