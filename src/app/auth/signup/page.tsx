"use client";

import React, { useState } from "react";
import styles from "../signin/modal.module.css";
import { registerUser } from "@/services/courses/authApi";
import { UserData } from "@/services/feature/authSlice";
import { validateEmail, validatePassword } from "@/helpers/validation/authModal";

interface SignUpProps {
  onUserRegistered: (user: UserData) => void;
  onSwitchToLogin: () => void;
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onUserRegistered, onSwitchToLogin, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (!email) {
      setEmailError("Пожалуйста, введите email");
      setIsLoading(false);
      return;
    }

     if (!validateEmail(email)) {
    setEmailError("Введите корректный Email");
    setIsLoading(false);
    return;
  }

    if (!password) {
      setPasswordError("Пожалуйста, введите пароль");
      setIsLoading(false);
      return;
    }

     const passwordValidationError = validatePassword(password);
  if (passwordValidationError) {
    setPasswordError(passwordValidationError);
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

      onUserRegistered({
        _id: "",
        username: email.split("@")[0],
        email,
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

  return (
    <>
      <div className={styles.modalInput}>
        <input
          className={`${styles.modal__input} ${emailError ? styles.inputError : ""}`}
          type="email"
          placeholder="Эл. почта"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(null);
          }}
        />
        <input
          className={`${styles.modal__input} ${passwordError ? styles.inputError : ""}`}
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(null);
          }}
        />
        <input
          className={`${styles.modal__input} ${confirmPasswordError ? styles.inputError : ""}`}
          type="password"
          placeholder="Повторите пароль"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError(null);
          }}
        />
      </div>
      <div className={styles.errorContainer}>
        {errorMessage} {emailError} {passwordError} {confirmPasswordError}
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.modal__btnSignupEnt} onClick={handleRegister} disabled={isLoading}>
          Зарегистрироваться
        </button>
        <button className={styles.modal__btnSigninEnt} onClick={onSwitchToLogin} disabled={isLoading}>
          Войти
        </button>
      </div>
    </>
  );
};

export default SignUp;