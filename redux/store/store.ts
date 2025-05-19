import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { beadApi } from '../api/beadApi';
import { userApi } from '../api/userApi';
import { threadApi } from '../api/thredApi';
import authReducer from '../slice/UserSlice';
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [beadApi.reducerPath]: beadApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [threadApi.reducerPath]: threadApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(
      beadApi.middleware,
      userApi.middleware,
      threadApi.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
