import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserData {
  id: number;
  username: string;
  email: string;
    selectedCourses: string[];
}

type initialStateType = {
  username: string;
  access: string;
  refresh: string;
  userData: UserData | null;
  isAuthenticated: boolean;
};

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: '',
  userData: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
      state.isAuthenticated = true;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem('access', action.payload);
      state.isAuthenticated = true;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      localStorage.setItem('refresh', action.payload);
      state.isAuthenticated = true;
    },
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.username = '';
      state.access = '';
      state.refresh = '';
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('email');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    },
  },
});

export const {
  setUsername,
  setAccessToken,
  setRefreshToken,
  setUserData,
  clearUserData,
} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;