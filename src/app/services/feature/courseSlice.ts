
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
 courseProgress: { // Прогресс по курсу (например, сколько процентов курса пройдено)
        [courseId: string]: number;
    };
    exerciseProgress: { // Прогресс по упражнениям в каждой тренировке
        [workoutId: string]: {
            [exerciseName: string]: number;
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
   exerciseProgress: {},
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
        (courseId) => courseId !== action.payload
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
                progress: number;
            }>
        ) => {
            state.courseProgress[action.payload.courseId] = action.payload.progress;
        },
    setExerciseProgress: (
            state,
            action: PayloadAction<{
                workoutId: string;
                exerciseName: string;
                progress: number;
            }>
        ) => {
            const { workoutId, exerciseName, progress } = action.payload;

            if (!state.exerciseProgress[workoutId]) {
                state.exerciseProgress[workoutId] = {};
            }

            state.exerciseProgress[workoutId][exerciseName] = progress;
        },
         loadStateFromLocalStorage: (state, action: PayloadAction<initialStateType>) => {
            return { ...state, ...action.payload };
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
  setExerciseProgress,
  loadStateFromLocalStorage
} = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;
export const selectExerciseProgress = (state: any) => state.courses.exerciseProgress;