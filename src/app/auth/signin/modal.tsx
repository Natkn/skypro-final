// src/components/modal/modal.tsx
import React, { useState } from 'react';
import styles from './modal.module.css';
import Image from "next/image";
import logo from "../../../../public/image/logo.svg";
import { authUser, registerUser } from '@/app/services/courses/authApi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
   onUserRegistered: (user: { username: string; email: string }) => void; 
    onUserLoggedIn: (user: { username: string; email: string }) => void;
}

enum ModalMode {
  LOGIN,
  REGISTER,
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose,onUserRegistered,onUserLoggedIn }) => {
  if (!isOpen) return null;


  const [modalMode, setModalMode] = useState(ModalMode.LOGIN);
const [activeButton, setActiveButton] = useState<'login' | 'register'>('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [login, setLogin] = useState('');
   const [token, setToken] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

 const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const data = { email: login, password };
      const response = await authUser(data);
      setToken(response.token); // Save the token
      onClose(); // Close the modal after successful login

      // Store the token in local storage or cookies as needed
      localStorage.setItem('authToken', response.token); 
      localStorage.setItem('refreshToken', response.refreshToken);
       onUserLoggedIn({ username: login.split('@')[0], email: login });// Example using localStorage
    } catch (error: any) {
      setErrorMessage(error.message || "Произошла ошибка при входе");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    try {
      const data = { email, password };
      const response = await registerUser(data);
      setErrorMessage(response.message);
       onUserRegistered({ username: email.split('@')[0], email });
      onClose();
    } catch (error: any) {
      setErrorMessage(error.message || "Произошла ошибка при регистрации");
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
              className={styles.modal__input}
              type="text"
              placeholder="Логин"
              value={login}
              onChange={onChangeLogin}
            />
            <input
              className={styles.modal__input}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={onChangePassword}
            /></div>
            <div className={styles.errorContainer}>{errorMessage}</div>
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
              className={styles.modal__input}
              type="email"
              placeholder="Эл. почта"
              value={email}
              onChange={onChangeEmail}
            />
            <input
              className={styles.modal__input}
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={onChangePassword}
            />
            <input
              className={styles.modal__input}
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={onChangeConfirmPassword}
            /></div>
            <div className={styles.errorContainer}>{errorMessage}</div>
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