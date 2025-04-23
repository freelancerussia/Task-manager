import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore } from '../config/store.ts';
import { StateSchema } from '../config/StateSchema.ts';

interface StoreProviderProps {
    children: ReactNode
    initialState?: Partial<StateSchema>
}
export const StoreProvider = ({ children, initialState }: StoreProviderProps) => {
    const store = createReduxStore(initialState as StateSchema);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};