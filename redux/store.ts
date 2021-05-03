import { configureStore } from '@reduxjs/toolkit';
import { IRootState } from './interface';
import meProducer from './meProducer';

const store = configureStore<IRootState>({
  reducer: {
    me: meProducer,
  },
});

export default store;
