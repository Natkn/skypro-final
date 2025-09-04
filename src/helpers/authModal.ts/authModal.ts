import { authUser, registerUser } from "@/services/courses/authApi";
import { useState } from "react";


interface AuthHandlersProps {
  onClose: () => void;
  onUserLoggedIn: (user: {
    _id: string;
    username: string;
    email: string;
    selectedCourses: any[];
  }) => void;
  onUserRegistered: (user: {
    _id: string;
    username: string;
    email: string;
    selectedCourses: any[];
  }) => void;
  setToken: (token: string) => void;
}
export const useAuthHandlers = (props: AuthHandlersProps) => {
  const {
    onClose,
    onUserLoggedIn,
    onUserRegistered,
    setToken,
  } = props;


  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
const [login, setLogin] = useState<string>('');
const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
        setIsLoading(true);
        setErrorMessage('');
        setLoginError(null);
        setPasswordError(null);

        try {
            if (!login) {
                setLoginError("Пожалуйста, введите логин");
                return;
            }
            if (!password) {
                setPasswordError("Пожалуйста, введите пароль");
                return;
            }

            const data = { email: login, password };
            const response = await authUser(data);
            setToken(response.token);
            onClose();


            localStorage.setItem('authToken', response.token);
            localStorage.setItem('refreshToken', response.refreshToken);
        onUserLoggedIn({
  _id: '', 
  username: login.split('@')[0],
  email: login,
  selectedCourses: [],
});
        } catch (error: any) {
            if (error.message === "Invalid credentials") {
                setLoginError("Неверный логин или пароль");
                setPasswordError("Неверный логин или пароль");
            } else {
                setErrorMessage(error.message || "Произошла ошибка при входе");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async () => {
        setIsLoading(true);
        setErrorMessage('');
        setEmailError(null);
        setPasswordError(null);
        setConfirmPasswordError(null);

        if (!email) {
            setEmailError("Пожалуйста, введите email");
            setIsLoading(false);
            return;
        }

        if (!password) {
            setPasswordError("Пожалуйста, введите пароль");
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("Пароли не совпадают");
            setIsLoading(false);
            return;
        }

        try {
            const data = { email, password };
            const response = await registerUser(data);
            setErrorMessage(response.message);
            onUserRegistered({
  _id: '', 
  username: login.split('@')[0],
  email: login,
  selectedCourses: [],
});
            onClose();
        } catch (error: any) {
            if (error.message === "Email already exists") {
                setEmailError("Данная почта уже используется. Попробуйте войти.");
            } else {
                setErrorMessage(error.message || "Произошла ошибка при регистрации");
            }
        } finally {
            setIsLoading(false);
        }
    };

     return {
    handleLogin,
    handleRegister,
    errorMessage,
    emailError,
    passwordError,
    confirmPasswordError,
    loginError,
    isLoading,
  };
};