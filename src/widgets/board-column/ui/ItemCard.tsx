import React, {DragEvent} from "react";
import {Item} from "@entities/Item";
import {Board} from "@entities/Board";

interface ItemCardProps {
    item: Item;
    board: Board;
    onDragStart: (board: Board, item: Item) => void;
    onDragEnd: (e:DragEvent<HTMLDivElement>) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, board,onDragStart, onDragEnd }) => {

    return (
        <div
            onDragStart={() => onDragStart(board, item)}
            onDragEnd={onDragEnd}
            draggable={true}
            key={item.id}
            className="item"
        >
            {item.title}
        </div>
    );
};