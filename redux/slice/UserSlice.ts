import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@/app/types/UserType';
import { AppDispatch } from '../store/store';

interface InitialStateType {
  token: any;
  user: UserType;
  isLocationEnabled: boolean;
  coordinates: { latitude: number; longitude: number } | null;
  locationDenied: boolean;
  shouldRefetchUser: boolean;
}

const initialState: InitialStateType = {
  user: {} as UserType,
  token: undefined,
  isLocationEnabled: false,
  coordinates: null,
  locationDenied: false,
  shouldRefetchUser: false,
};

export const enableLocation = () => async (dispatch: AppDispatch) => {
  if (!navigator.geolocation) {
    dispatch(setLocationDenied());
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      dispatch(
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }),
      );
    },
    (error) => {
      console.error('Geolocation error:', error.message);
      alert(
        'Location access denied.\n\nClick the lock ⓘ icon near the address bar.\nFind "Location" and allow access.\nThen reload the page.',
      );
      dispatch(setLocationDenied());
    },
  );
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      fetch('/api/auth/logout', { method: 'POST' }).then(() => {
        window.location.href = '/';
      });
      state.user = {} as UserType;
    },
    setCoordinates: (
      state,
      action: PayloadAction<{ latitude: number; longitude: number }>,
    ) => {
      state.coordinates = action.payload;
      state.isLocationEnabled = true;
      state.locationDenied = false;
    },
    setLocationDenied: (state) => {
      state.coordinates = null;
      state.locationDenied = true;
      state.isLocationEnabled = false;
    },
    disableLocation: (state) => {
      state.isLocationEnabled = false;
      state.coordinates = null;
      state.locationDenied = false;
    },
    setRefetchUser: (state) => {
      state.shouldRefetchUser = !state.shouldRefetchUser;
    },
  },
});

export const {
  setUser,
  logout,
  setCoordinates,
  setLocationDenied,
  disableLocation,
  setRefetchUser
} = authSlice.actions;
export default authSlice.reducer;
