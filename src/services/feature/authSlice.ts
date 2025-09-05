import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserData {
   _id: string; 
  username: string;
  email: string;
    selectedCourses: string[] ;
}

type initialStateType = {
  username: string;
  access: string;
  refresh: string;
  userData: UserData | null;
  isAuthenticated: boolean;
};

const loadFromLocalStorage = (): initialStateType => {
  try {
    const userDataRaw = localStorage.getItem('userData');
    const access = localStorage.getItem('access') || '';
    const refresh = localStorage.getItem('refresh') || '';
    const username = localStorage.getItem('username') || '';

    let userData: UserData | null = null;

    if (userDataRaw) {
      const parsed = JSON.parse(userDataRaw);
      userData = {
        _id: parsed._id || '',
        username: parsed.username || username,
        email: parsed.email || '',
        selectedCourses: parsed.selectedCourses || [],
      };
    }

    return {
      username,
      access,
      refresh,
      userData,
      isAuthenticated: !!userData && !!access && !!refresh,
    };
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return {
      username: '',
      access: '',
      refresh: '',
      userData: null,
      isAuthenticated: false,
    };
  }
};

const initialState: initialStateType = loadFromLocalStorage();

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
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
  state.isAuthenticated = action.payload;
},
   setUserData: (state, action: PayloadAction<UserData>) => {
  state.userData = action.payload;
  state.isAuthenticated = true;
  localStorage.setItem('userData', JSON.stringify(action.payload));

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
       localStorage.removeItem('userData');
    },
  },
});

export const {
  setUsername,
  setAccessToken,
  setRefreshToken,
  setUserData,
  clearUserData,
  setIsAuthenticated
} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;