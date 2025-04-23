import React, {DragEvent} from "react";
import {Board} from "entities/Boards";
import {useDropHandlers} from "@features/drag-card/ui/useDrop.ts";
import {BoardTitle} from "@shared/ui/BoardTitle/BoardTitle.tsx";
import {Item} from "@entities/Item";
import {ItemCard} from "@entities/Item/ui/ItemCard.tsx";


interface BoardColumnProps {
    board: Board;
    onDragStart: (board: Board, item: Item) => void;
    onDragEnd: (e:DragEvent<HTMLDivElement>) => void;
}

export const BoardColumn: React.FC<BoardColumnProps> = ({
                                                            board,
                                                            onDragStart,
                                                            onDragEnd,
                                                        }) => {
    const { onDropItem, onDropBoard, onDragOver, onDragLeave } = useDropHandlers();
    // const dispatch = useDispatch<AppDispatch>();
    return (
        <div
            onDragOver={onDragOver}
            onDrop={() => onDropBoard(board)}
            key={board.id}
            className="board"
        >
            <BoardTitle title={board.title} addItem={()=>{}}/>
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