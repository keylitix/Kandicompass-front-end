import { createSlice } from '@reduxjs/toolkit';

interface InitialStateType {
  refecthNotification: boolean;
}

const initialState: InitialStateType = {
  refecthNotification: false,
};

console.log('initialState', initialState);

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setRefetchNotification: (state, action) => {
      state.refecthNotification = action.payload;
    },
  },
});

export const {setRefetchNotification} = notificationSlice.actions;
export default notificationSlice.reducer;
