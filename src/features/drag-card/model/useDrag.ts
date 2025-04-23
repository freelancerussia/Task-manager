import { useState,DragEvent } from "react";
import {Board} from "entities/Boards";
import {Item} from "@entities/Item";


export const useDragState = () => {
    const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
    const [currentItem, setCurrentItem] = useState<Item | null>(null);
    const onDragStart = (board: Board, item: Item) => {
        setCurrentBoard(board);
        setCurrentItem(item);
    };

    const onDragEnd = (e:DragEvent<HTMLDivElement>) => {
        const target = e.target as HTMLElement;
            target.style.boxShadow = 'none'
        setCurrentBoard(null);
        setCurrentItem(null);
    };

    return { currentBoard, currentItem, onDragStart, onDragEnd };
};