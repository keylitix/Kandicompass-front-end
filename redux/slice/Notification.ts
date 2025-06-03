import { InitialStateType } from '@/app/types/notification';
import { createSlice } from '@reduxjs/toolkit';
import { stat } from 'fs';

const initialState: InitialStateType = {
  refecthNotification: false,
  beadRequestRes: {
    isOpen: false,
    reqId: '',
    beadId: '',
    buyerID: '',
    offerPrice: 0,
    message: '',
    threadName: '',
    status: '',
    threadId: '',
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setRefetchNotification: (state, action) => {
      state.refecthNotification = action.payload;
    },
    setBeadRequestRes: (state, action) => {
      state.beadRequestRes.isOpen = action.payload.isOpen;
      state.beadRequestRes.reqId = action.payload.reqId;
      state.beadRequestRes.beadId = action.payload.beadId || '';
      state.beadRequestRes.buyerID = action.payload.buyerID || '';
      state.beadRequestRes.offerPrice = action.payload.offerPrice || 0;
      state.beadRequestRes.message = action.payload.message || '';
      state.beadRequestRes.threadName = action.payload.threadName || '';
      state.beadRequestRes.status = action.payload.status || '';
      state.beadRequestRes.threadId = action.payload.threadId || '';
    },
  },
});

export const { setRefetchNotification, setBeadRequestRes } =
  notificationSlice.actions;
export default notificationSlice.reducer;
