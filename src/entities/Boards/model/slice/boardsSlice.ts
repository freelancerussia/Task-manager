import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BoardsSchema} from "@entities/Boards/model/types/BoardsSchema.ts";
import {Board} from "@entities/Boards";


const initialState: BoardsSchema = {
    boards:[
        // {
        //     id: 1,
        //     title: "Сделать",
        //     items: [{ id: 1, title: "Пойти в магазин" }, { id: 2, title: "Выкинуть мусор" }, { id: 3, title: "Купить молока" }]
        // },
        // {
        //     id: 2,
        //     title: "Проверить",
        //     items: [{ id: 4, title: "Код ревью" }, { id: 5, title: "Задача факториал" }, { id: 6, title: "Рабоота над ошибками" }]
        // },
        // {
        //     id: 3,
        //     title: "Сделано",
        //     items: [{ id: 7, title: "Снять видео" }, { id: 8, title: "Политьь цветы" }, { id: 9, title: "Приготовить ужин" }]
        // },
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
        addItem(state: BoardsSchema, action: PayloadAction<{boardId:number, title:string}>) {
            return {...state, boards:
                state.boards.map(b=>{
                    if (b.id === action.payload.boardId){
                        return {
                            ...b,
                            items:[
                                ...b.items,
                                {
                                    id: Number(new Date()),
                                    title:action.payload.title
                                }
                            ]
                        }
                    }
                    return b
                })
            };
        },
        deleteItem: (state, action: PayloadAction<{ boardId: number; itemId: number }>) => {
            const board = state.boards.find((b) => b.id === action.payload.boardId);
            if (board) {
                board.items = board.items.filter((item) => item.id !== action.payload.itemId);
            }
        },
        moveItem: (state, action: PayloadAction<{ sourceBoardId: number; destinationBoardId: number; itemId: number; destinationItemIndex: number }>) => {
            const sourceBoard = state.boards.find(b => b.id === action.payload.sourceBoardId);
            const destinationBoard = state.boards.find(b => b.id === action.payload.destinationBoardId);

            if (sourceBoard && destinationBoard) {
                const itemIndex = sourceBoard.items.findIndex(i => i.id === action.payload.itemId);
                if (itemIndex !== -1) {
                    const [movedItem] = sourceBoard.items.splice(itemIndex, 1);
                    destinationBoard.items.splice(action.payload.destinationItemIndex, 0, movedItem);
                }
            }
        },
    },

});

// Action creators are generated for each case reducer function
export const { actions: boardsActions } = boardsSlice;

export const { reducer: boardsReducer } = boardsSlice;