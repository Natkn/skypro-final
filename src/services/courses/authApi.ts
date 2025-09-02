import axios from 'axios';
import { BASE_URL } from '../../helpers/constant';

type authUserProps = {
  email: string;
  password: string;
};

type authUserReturn = {
    token: string;
    refreshToken: string;
};


const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "Пароль должен содержать не менее 6 символов";
  }
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]*/g;
  if ((password.match(specialCharRegex) || []).length < 2) {
    return "Пароль должен содержать не менее 2 спецсимволов";
  }
  if (!/[A-Z]/.test(password)) {
    return "Пароль должен содержать как минимум одну заглавную букву";
  }
  return null;
};


export const authUser = async (
  data: authUserProps,
): Promise<authUserReturn> => {
  try {
    const response = await axios.post(BASE_URL + '/auth/login', data, {
      headers: {
          'Content-Type': 'text/plain',
      },
    });
    return response.data;
   } catch (error: any) {
    let message = 'Ошибка при аутентификации:';
    if (error.response) {
         message = error.response.data.message; 
    } else if (error.request) {
        message = 'Нет ответа от сервера';
    } else {
       message = error.message;
    }
    console.error(message, error);
    throw new Error(message); 
  }
};

type registerUserProps = {
  email: string;
  password: string;
};

type registerUserReturn = {
   message: string;
};

export const registerUser = async (
  data: registerUserProps,
): Promise<registerUserReturn> => {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      throw new Error("Введите корректный Email");
    }

    const passwordError = validatePassword(data.password);
    if (passwordError) {
      throw new Error(passwordError);
    }

    const response = await axios.post(BASE_URL + '/auth/register', data, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
    return response.data;
  } catch (error: any) {
    let message = 'Ошибка при регистрации:';
    if (error.response) {
      message = error.response.data.message; 
    } else if (error.request) {
      message = 'Нет ответа от сервера';
    } else {
      message = error.message;
    }
    console.error(message, error);
    throw new Error(message); 
  }
};
