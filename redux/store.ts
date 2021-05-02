import { configureStore } from '@reduxjs/toolkit';
import meProducer from './meProducer';

const store = configureStore({
  reducer: {
    me: meProducer
  },
});

export default store;
