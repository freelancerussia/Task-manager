import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoardsSchema} from "@entities/Boards/model/types/BoardsSchema.ts";
import {Board} from "@entities/Boards";


const initialState: BoardsSchema = {
    boards:[
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
    ]
};

export const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addBoard(state: BoardsSchema, action: PayloadAction<Board>) {
            return {...state, boards: [...state.boards, action.payload]};
        },
        removeBoard(state: BoardsSchema, action: PayloadAction<number>) {
            return {...state, boards: state.boards.filter(board => board.id !== action.payload) };
        },
        addItem(state: BoardsSchema, action: PayloadAction<string>) {
            return {...state, boards: [...state.boards,{id: state.boards.length +1, title:action.payload, items:[]} ]};
        }
    },

});

// Action creators are generated for each case reducer function
export const { actions: boardsActions } = boardsSlice;

export const { reducer: boardsReducer } = boardsSlice;