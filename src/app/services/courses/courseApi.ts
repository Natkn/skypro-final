import { BASE_URL, RoutesApp } from '@/app/helpers/constant';
import axios from 'axios';
import { CourseCardType } from '@/app/api/fitness/courses/[courseId]/routes';
import { WorkoutType,ApiResponseCourseProgressType  } from '@/types/courseType';
import { Course } from '@/libs/fitness';
//import { tokensType } from './auth';

type courseUserProp = {
  courseId: string;
};
type ApiError = {
  error?: string;
  message?: string;
};


export const getCourses = async (): Promise<Course[]> => {
  try {
    const res = await axios.get(BASE_URL + '/courses');
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(
          apiErr.error ?? apiErr.message ?? 'Ошибка загрузки курсов',
        );
      }
      throw new Error(error.message);
    }
  }
  throw new Error();
};

export const getCourseById = async (
    id: string,
   
  ): Promise<CourseCardType> => {
    try {
      const res = await axios.get(`${BASE_URL}/courses/${id}`, {
        headers: {
          'Content-Type': 'text/plain',
         
        },
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const apiErr = error.response.data as ApiError;
  
          throw new Error(
            apiErr.error ?? apiErr.message ?? 'Ошибка загрузки списка тренировок',
          );
        }
        throw new Error(error.message);
      }
    }
    throw new Error();
  };



//   Проверить! API не работает- функция не проверена
export const addUserCourse = async (
  { courseId }: courseUserProp,
  token: tokensType,
): Promise<CourseCardType[]> => {
  try {
    const res = await axios.post(BASE_URL + RoutesApp.addUserCourse, {courseId:courseId}, {
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${token.token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(
          apiErr.error ?? apiErr.message ?? 'Ошибка загрузки курсов',
        );
      }
      throw new Error(error.message);
    }
  }
  throw new Error();
};



export const getUserCourse = async (
    token: tokensType,
  ): Promise<CourseCardType[]> => {
    try {
      const res = await axios.get(BASE_URL + RoutesApp.addUserCourse, {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${token.token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const apiErr = error.response.data as ApiError;
  
          throw new Error(
            apiErr.error ?? apiErr.message ?? 'Ошибка загрузки курсов',
          );
        }
        throw new Error(error.message);
      }
    }
    throw new Error();
  };



export const getCourseWorkout = async (
  id: string,
  token: tokensType,
): Promise<WorkoutType> => {
  try {
    const res = await axios.get(`${BASE_URL}/workouts/${id}`, {
      headers: {
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${token.token}`,
      },
    });
    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(
          apiErr.error ?? apiErr.message ?? 'Ошибка загрузки списка тренировок',
        );
      }
      throw new Error(error.message);
    }
  }
  throw new Error();
};


///api/fitness/users/me/progress?courseId={courseId}

export const getCourseProgress = async (
    id: string,
    token: tokensType,
  ): Promise<ApiResponseCourseProgressType > => {
    try {
      const res = await axios.get(`${BASE_URL}${RoutesApp.getCourseProgress}${id}`, {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${token.token}`,
        },
      });
      return res.data;
    } catch (error) {
      if (error instanceof Error) {
        if (axios.isAxiosError(error) && error.response) {
          const apiErr = error.response.data as ApiError;
  
          throw new Error(
            apiErr.error ?? apiErr.message ?? 'Ошибка загрузки прогресса по курсу',
          );
        }
        throw new Error(error.message);
      }
    }
    throw new Error();
  };