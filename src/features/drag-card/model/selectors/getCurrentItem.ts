import { StateSchema } from 'app/providers/StoreProvider';

export const getCurrentItem = (state: StateSchema) => state?.dragState.currentItem;