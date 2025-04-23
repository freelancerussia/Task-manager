import { useState } from "react";
import {Board} from "entities/Boards";

interface UseBoardsResult {
    boards: Board[];
    setBoards: (boards: Board[]) => void;
    addBoard: (title: string) => void;
    updateBoard: (updatedBoard: Board) => void;
    deleteBoard: (boardId: number) => void;
    addItem: (boardId: number, title: string) => void;
    deleteItem: (boardId: number, itemId: number) => void;
    // Другие функции для работы с досками и элементами
}

export const useBoards = (): UseBoardsResult => {
    const [boards, setBoards] = useState<Board[]>([
        {
            id: 1,
            title: "Сделать",
            items: [{ id: 1, title: "Пойти в магазин" }, { id: 2, title: "Выкинуть мусор" }, { id: 3, title: "Купить молока" }]
        },
        {
            id: 2,
            title: "Проверить",
            items: [{ id: 4, title: "Код ревью" }, { id: 5, title: "Задача факториал" }, { id: 6, title: "Рабоота над ошибками" }]
        },
        {
            id: 3,
            title: "Сделано",
            items: [{ id: 7, title: "Снять видео" }, { id: 8, title: "Политьь цветы" }, { id: 9, title: "Приготовить ужин" }]
        },
    ]);
    const addBoard = (title: string) => {
        const newBoard: Board = { id: Date.now(), title, items: [] };
        setBoards(prevBoards => [...prevBoards, newBoard]);
    };

    const updateBoard = (updatedBoard: Board) => {
        setBoards(prevBoards =>
            prevBoards.map(board => board.id === updatedBoard.id ? updatedBoard : board)
        );
    };

    const deleteBoard = (boardId: number) => {
        setBoards(prevBoards => prevBoards.filter(board => board.id !== boardId));
    };

    const addItem = (boardId: number, title: string) => {
        setBoards(prevBoards =>
            prevBoards.map(board =>
                board.id === boardId
                    ? { ...board, items: [...board.items, { id: Date.now(), title }] }
                    : board
            )
        );
    };

    const deleteItem = (boardId: number, itemId: number) => {
        setBoards(prevBoards =>
            prevBoards.map(board =>
                board.id === boardId
                    ? { ...board, items: board.items.filter(item => item.id !== itemId) }
                    : board
            )
        );
    };

    return {
        boards,
        setBoards,
        addBoard,
        updateBoard,
        deleteBoard,
        addItem,
        deleteItem,
        // Другие возвращаемые значения
    };
};