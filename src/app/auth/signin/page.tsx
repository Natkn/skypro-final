 "use client"
import  { useState } from 'react';
import styles from './modal.module.css';
import Image from "next/image";
import logo from "../../../../public/image/logo.svg";
import { authUser, registerUser } from '@/services/courses/authApi';
import { UserData } from '@/services/feature/authSlice';
import { useAuthHandlers } from '@/helpers/authModal.ts/authModal';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
     onUserRegistered: (user: UserData) => void;
  onUserLoggedIn: (user: UserData) => void;
}

enum ModalMode {
  LOGIN,
  REGISTER,
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose,onUserRegistered,onUserLoggedIn }) => {
  if (!isOpen) return null;

console.log('Modal is open');
  const [modalMode, setModalMode] = useState(ModalMode.LOGIN);
const [activeButton, setActiveButton] = useState<'login' | 'register'>('login'); 
const [login, setLogin] = useState<string>('');
const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
   const [token, setToken] = useState('');
   

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
     setConfirmPasswordError(null);
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };
 
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

  const renderContent = () => {
    switch (modalMode) {
      case ModalMode.LOGIN:
        return (
          <>
          
            <Image src={logo} alt="Logo" width={220} height={35} />
             <div className={styles.modalInput}>
              <input
               className={`${styles.modal__input} ${loginError ? styles.inputError : ''}`}
              type="text"
              placeholder="Логин"
              value={login}
              onChange={onChangeLogin}
            />
            <input
                className={`${styles.modal__input} ${passwordError ? styles.inputError : ''}`}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={onChangePassword}
            /></div>
            <div className={styles.errorContainer}> {errorMessage} {loginError} {passwordError}</div>
            <div className={styles.btnContainer}>
             <button
              className={`${styles.modal__btnSignupEnt} ${activeButton === 'login' ? styles.active : ''}`}
              onClick={() => {
                handleLogin();
                setActiveButton('login');
              }}
              disabled={isLoading}
            >
              Войти
            </button>
             <button
              className={`${styles.modal__btnSigninEnt} ${activeButton === 'register' ? styles.active : ''}`}
              onClick={() => {
                setModalMode(ModalMode.REGISTER);
                setActiveButton('register');
              }}
              disabled={isLoading}
            >
              Зарегистрироваться
            </button> </div>
          </>
        );
      case ModalMode.REGISTER:
        return (
          <>
          
            <Image src={logo} alt="Logo" width={220} height={35} />
             <div className={styles.modalInput}>
            <input
                className={`${styles.modal__input} ${emailError ? styles.inputError : ''}`}
              type="email"
              placeholder="Эл. почта"
              value={email}
              onChange={onChangeEmail}
            />
            
            <input
               className={`${styles.modal__input} ${passwordError ? styles.inputError : ''}`}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={onChangePassword}
            />
            <input
              className={`${styles.modal__input} ${confirmPasswordError ? styles.inputError : ''}`}
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
            /></div>
            <div className={styles.errorContainer}>{errorMessage}{emailError}{passwordError} {confirmPasswordError}</div>
            <div className={styles.btnContainer}>
              <button
              className={`${styles.modal__btnSignupEnt} ${activeButton === 'register' ? styles.active : ''}`}
              onClick={() => {
                handleRegister();
                setActiveButton('register');
              }}
              disabled={isLoading}
            >
              Зарегистрироваться
            </button>
           <button
              className={`${styles.modal__btnSigninEnt} ${activeButton === 'login' ? styles.active : ''}`}
              onClick={() => {
                setModalMode(ModalMode.LOGIN);
                setActiveButton('login');
              }}
              disabled={isLoading}
            >
              Войти
            </button></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          &times;
        </button>
       
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;