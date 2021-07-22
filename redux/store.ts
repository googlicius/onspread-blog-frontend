import { RootState } from './interface';
import { configureStore } from '@reduxjs/toolkit';
import meProducer from './meProducer';
import socketIOReducer from './socketIOReducer';

const store = configureStore<RootState>({
  reducer: {
    me: meProducer,
    socket: socketIOReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }) as any,
});

export default store;
