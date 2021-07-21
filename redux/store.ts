import { RootState } from './interface';
import { configureStore } from '@reduxjs/toolkit';
import meProducer from './meProducer';
import socketReducer from './socketReducer';

const store = configureStore<RootState>({
  reducer: {
    me: meProducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }) as any,
});

export default store;
