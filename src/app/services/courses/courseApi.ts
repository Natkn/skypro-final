import { BASE_URL } from '@/app/helpers/constant';
import axios from 'axios';
import { Course } from '@/libs/fitness';
import { CardProps } from '@/components/card/card';
import { UserProfile } from '@/app/profile/page';


type courseUserProp = {
  courseId: string;
};
type ApiError = {
  error?: string;
  message?: string;
};

export interface WorkoutType {
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
        throw new Error('An unknown error occurred'); 
    }
};

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
 
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found.');
    }

    const response = await axios.get(`${BASE_URL}/users/me`, 
      {
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
 console.log('API Response:', response);
     return response.data.user;
  } catch (error: any) {
    console.error('Error fetching user profile:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch user profile.');
  }
};

const getAuthToken = () => localStorage.getItem('authToken');

export const addCourseToUser = async (courseId: string) => {
  try {
    const token = getAuthToken();

    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await axios.post(`${BASE_URL}/users/me/courses`, 
      { courseId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'text/plain',
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('Error adding course to user:', error);
    throw new Error(error.response?.data?.message || 'Failed to add course.');
  }
};

export const removeCourseFromUser = async (courseId: string) => {
  try {
    const token = getAuthToken();

    if (!token) {
      throw new Error('No authentication token found.');
    }

    const response = await axios.delete(`${BASE_URL}/users/me/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain', 
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error removing course from user:', error);
    throw new Error(error.response?.data?.message || 'Failed to remove course.');
  }
};