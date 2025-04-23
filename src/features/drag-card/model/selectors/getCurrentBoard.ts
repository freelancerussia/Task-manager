import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrentBoard = (state: StateSchema) => state?.dragState.currentBoard;