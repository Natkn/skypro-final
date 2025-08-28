import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import { courseSliceReducer } from '../app/services/feature/courseSlice';
import { authSliceReducer } from '../app/services/feature/authSlice';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
      courses: courseSliceReducer,
      auth: authSliceReducer,
    }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;