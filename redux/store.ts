import { RootState } from './interface';
import { configureStore } from '@reduxjs/toolkit';
import meProducer from './meProducer';

const store = configureStore<RootState>({
  reducer: {
    me: meProducer,
  },
});

export default store;
