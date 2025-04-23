import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema.ts';
import {boardsReducer} from "@entities/Boards/model/slice/boardsSlice.ts";

export function createReduxStore(initialState?: StateSchema) {
    return configureStore<StateSchema>({
        reducer: {
            boards:boardsReducer
        },
        preloadedState: initialState
    });
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];