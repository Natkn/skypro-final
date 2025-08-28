
import { Course } from '@/libs/fitness';
import { PayloadAction,createSlice } from '@reduxjs/toolkit';
import { WorkoutType } from '../courses/courseApi';

export type initialStateType = {
  currentCourse: Course | null;
  allCourses: Course[];
  favoriteCourses: string[];
  fetchError: string | null;
  fetchIsLoading: boolean;
  currentWorkout: WorkoutType | null;
  courseProgress: {
    [courseId: string]: {
      workouts?: {
        workoutId: string;
        workoutCompleted: boolean;
      }[];
      progress: number;
    };
  };
};

const initialState: initialStateType = {
  currentCourse: null,
  allCourses: [],
  favoriteCourses: [],
  fetchError: null,
  fetchIsLoading: true,
  currentWorkout: null,
  courseProgress: {},
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setAllCourses: (state, action: PayloadAction<Course[]>) => {
      state.allCourses = action.payload;
    },
    setFavoriteCourses: (state, action: PayloadAction<string[]>) => {
      state.favoriteCourses = action.payload;
    },
    addFavoriteCourse: (state, action: PayloadAction<string>) => {
      state.favoriteCourses = [...state.favoriteCourses, action.payload];
    },
    removeFavoriteCourse: (state, action: PayloadAction<string>) => {
      state.favoriteCourses = state.favoriteCourses.filter(
        (id) => id !== action.payload,
      );
    },
    setCurrentWorkout(state, action: PayloadAction<WorkoutType>) {
      state.currentWorkout = action.payload;
    },
    setCurrentCourse(state, action: PayloadAction<Course>) {
      state.currentCourse = action.payload;
    },
    clearCurrentWorkout(state) {
      state.currentWorkout = null;
    },

    setCourseProgress: (
      state,
      action: PayloadAction<{
        courseId: string;
        workouts?: {
          workoutId: string;
          workoutCompleted: boolean;
        }[];
        progress: number;
      }>
    ) => {
      state.courseProgress[action.payload.courseId] = {
        workouts: action.payload.workouts,
        progress: action.payload.progress,
      };
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setAllCourses,
  setFavoriteCourses,
  addFavoriteCourse,
  removeFavoriteCourse,
  setFetchError,
  setFetchIsLoading,
  setCurrentWorkout,
  clearCurrentWorkout,
  setCurrentCourse,
  setCourseProgress,
} = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;