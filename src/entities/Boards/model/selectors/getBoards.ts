import { StateSchema } from 'app/providers/StoreProvider';

export const getBoards = (state: StateSchema) => state?.boards.boards;