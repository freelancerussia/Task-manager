import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Board} from "@entities/Boards";
import {Item} from "@entities/Item";
import {DragStateSchema} from '../types/DragStateSchema.ts'

const initialState: DragStateSchema = {
    currentBoard: null,
    currentItem: null,
};

export const dragStateSlice = createSlice({
    name: 'dragState',
    initialState,
    reducers: {
        setDragStart: (state, action: PayloadAction<{ board: Board; item: Item }>) => {
            state.currentBoard = action.payload.board;
            state.currentItem = action.payload.item;
        },
        setDragEnd: (state) => {
            state.currentBoard = null;
            state.currentItem = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: dragStateActions } = dragStateSlice;

export const { reducer: dragStateReducer } = dragStateSlice;