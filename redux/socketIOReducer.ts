import { loadAsyncJs } from '@googlicius/load-assets';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, SocketState } from './interface';

const initialState: SocketState = {
  isLoaded: false,
  value: null,
};

export const loadSocketIOAsync = createAsyncThunk('socket/load', () =>
  loadAsyncJs('https://cdn.socket.io/4.1.2/socket.io.min.js'),
);

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket(state) {
      state.isLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadSocketIOAsync.fulfilled, (state) => {
      state.isLoaded = true;
      state.value = io(process.env.NEXT_PUBLIC_API_ENDPOINT);
    });
  },
});

export const { setSocket } = socketSlice.actions;

export const selectSocket = (state: RootState) => state.socket;

export default socketSlice.reducer;
