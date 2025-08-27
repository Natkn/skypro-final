import { BASE_URL } from '@/app/helpers/constant';
import axios from 'axios';
import { Course } from '@/libs/fitness';
import { CardProps } from '@/components/card/card';


type courseUserProp = {
  courseId: string;
};
type ApiError = {
  error?: string;
  message?: string;
};

interface WorkoutType {
    _id: string;
    name: string;
    video: string;
    exercises: [];
}

interface tokensType {
    token: string;
    refreshToken: string;
}



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
   
  ): Promise<CardProps> => {
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



export const getCourseWorkouts = async (
    courseId: string,
    token: tokensType,
): Promise<WorkoutType[]> => {
    try {
        const res = await axios.get(`${BASE_URL}/courses/${courseId}/workouts`, {
            headers: {
                'Content-Type': 'application/json', 
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
        throw new Error('An unknown error occurred'); // Всегда возвращайте сообщение об ошибке
    }
};
