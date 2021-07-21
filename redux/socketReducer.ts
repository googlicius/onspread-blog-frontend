import { loadAsyncJS } from '@/utils/load-async-js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, SocketState } from './interface';

const initialState: SocketState = {
  isLoaded: false,
  value: null,
};

export const loadSocketAsync = createAsyncThunk('socket/load', async () => {
  await loadAsyncJS('https://cdn.socket.io/3.1.3/socket.io.min.js');
  return;
});

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state) {
      state.isLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSocketAsync.fulfilled, (state) => {
      state.isLoaded = true;
      state.value = io(process.env.NEXT_PUBLIC_API_ENDPOINT);
    });
  },
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;
