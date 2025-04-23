import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema.ts';
import {boardsReducer} from "@entities/Boards/model/slice/boardsSlice.ts";
import {dragStateReducer} from "@features/drag-card/model/slice/dragStateSlice.ts";

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            boards:boardsReducer,
            dragState:dragStateReducer
        },
        preloadedState: initialState
    });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];