import React, { useState } from 'react';
import styles from './modal.module.css';
import Image from "next/image";
import logo from "../../../../public/image/logo.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают");
      setIsLoading(false);
      return;
    }

    // Отправка данных на сервер (замените на ваш код)
    try {
      // const response = await fetch('/api/register', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ username, email, password }),
      // });

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   setErrorMessage(errorData.message || "Ошибка регистрации");
      // } else {
      //   onClose(); // Закрываем модальное окно после успешной регистрации
      // }
    } catch (error: any) {
      setErrorMessage(error.message || "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          &times;
        </button>
        <Image src={logo} alt="Logo" width={220} height={35} />
        <input
          className={styles.modal__input}
          type="text"
          name="username"
          placeholder="Имя пользователя"
          value={username}
          onChange={onChangeUsername}
        />
        <input
          className={styles.modal__input}
          type="email"
          name="email"
          placeholder="Почта"
          value={email}
          onChange={onChangeEmail}
        />
        <input
          className={styles.modal__input}
          type="password"
          name="password"
          placeholder="Пароль"
          value={password}
          onChange={onChangePassword}
        />
        <input
          className={styles.modal__input}
          type="password"
          name="confirmPassword"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
        />
        <div className={styles.errorContainer}>{errorMessage}</div>
        <button
          className={styles.modal__btnSignupEnt}
          onClick={onSubmit}
          disabled={isLoading}
        >
          Войти
        </button>
         <button
          className={styles.modal__btnSigninEnt}
          onClick={onSubmit}
          disabled={isLoading}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default Modal;