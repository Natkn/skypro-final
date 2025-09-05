
import axios from 'axios';
import { CardProps, Course, CourseProgressResponse, ExerciseType, UserProfile } from '@/libs/fitness';
import { BASE_URL } from '@/helpers/constant';



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
    exercises:ExerciseType[];
}

export interface tokensType {
    token: string;
     refreshToken?: string; 
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

export const getWorkoutById = async (
    workoutId: string,
    token: tokensType,
): Promise<WorkoutType> => {
    try {
        const res = await axios.get(`${BASE_URL}/workouts/${workoutId}`, {
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
                    apiErr.error ?? apiErr.message ?? 'Ошибка загрузки данных тренировки',
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

export const saveWorkoutProgress = async (
  courseId: string,
  workoutId: string,
  progressData: number[],
  token: tokensType,
): Promise<void> => {
  try {
    await axios.patch(
      `${BASE_URL}/courses/${courseId}/workouts/${workoutId}`,
      { progressData },
      {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${token.token}`,
        },
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      if (axios.isAxiosError(error) && error.response) {
        const apiErr = error.response.data as ApiError;

        throw new Error(
          apiErr.error ?? apiErr.message ?? 'Ошибка сохранения прогресса тренировки',
        );
      }
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred');
  }
};

export const getCourseProgress = async (
    courseId: string,
    token: tokensType,
): Promise<CourseProgressResponse> => {
    try {
        const response = await axios.get<CourseProgressResponse>(
            `${BASE_URL}/users/me/progress?courseId=${courseId}`,
            {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            },
        );

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            if (axios.isAxiosError(error) && error.response) {
                const apiErr = error.response.data as ApiError;

                throw new Error(
                    apiErr.error ?? apiErr.message ?? 'Ошибка получения прогресса курса',
                );
            }
            throw new Error(error.message);
        }
        throw new Error('An unknown error occurred');
    }
};