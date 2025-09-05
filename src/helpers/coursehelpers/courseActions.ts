import { Dispatch } from 'react';
import { addFavoriteCourse, removeFavoriteCourse } from '@/services/feature/courseSlice';
import { setUserData, UserData } from '@/services/feature/authSlice';
import { addCourseToUser, getUserProfile, removeCourseFromUser } from '@/services/courses/courseApi';

interface Params {
  courseId: string;
  course?: any; 
  isAuthenticated: boolean;
  dispatch: Dispatch<any>;
  setIsCourseAdded: (value: boolean) => void;
  setError: (error: string | null) => void;
}

export const handleAddCourse = async ({
  courseId,
  course,
  isAuthenticated,
  dispatch,
  setIsCourseAdded,
  setError,
}: Params) => {
  if (!isAuthenticated) {
    setError('User is not authenticated');
    return;
  }
  try {
    await dispatch(addFavoriteCourse(courseId));
    await addCourseToUser(courseId);
    const updatedUserData: UserData = await getUserProfile();
    dispatch(setUserData(updatedUserData));
    setIsCourseAdded(true);
    setError(null);
  } catch (error: any) {
    console.error("Error adding course:", error);
    setError(error.message || 'Failed to add course.');
  }
};

export const handleRemoveCourse = async ({
  courseId,
  dispatch,
  setIsCourseAdded,
  setError,
}: Omit<Params, 'course' | 'isAuthenticated'>) => {
  try {
    await dispatch(removeFavoriteCourse(courseId));
    await removeCourseFromUser(courseId);
    const updatedUserData: UserData = await getUserProfile();
    dispatch(setUserData(updatedUserData));
    setIsCourseAdded(false);
    setError(null);
  } catch (error: any) {
    console.error("Error removing course:", error);
    setError(error.message || 'Failed to remove course.');
  }
};