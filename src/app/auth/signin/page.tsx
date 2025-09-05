"use client";

import { useState } from "react";
import styles from "./modal.module.css";
import { authUser } from "@/services/courses/authApi";
import { UserData } from "@/services/feature/authSlice";

interface LoginProps {
  onSwitchToRegister: () => void;
  onUserLoggedIn: (user: UserData) => void;
  onClose: () => void;
}

const SignIn: React.FC<LoginProps> = ({ onSwitchToRegister, onUserLoggedIn, onClose }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage("");
    setLoginError(null);
    setPasswordError(null);

    if (!login) {
      setLoginError("Пожалуйста, введите логин");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setPasswordError("Пожалуйста, введите пароль");
      setIsLoading(false);
      return;
    }

    try {
      const data = { email: login, password };
      const response = await authUser(data);

      localStorage.setItem("authToken", response.token);
      localStorage.setItem("refreshToken", response.refreshToken);

      onUserLoggedIn({
        _id: "",
        username: login.split("@")[0],
        email: login,
        selectedCourses: [],
      });

      onClose();
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

  return (
    <>
      <div className={styles.modalInput}>
        <input
          className={`${styles.modal__input} ${loginError ? styles.inputError : ""}`}
          type="text"
          placeholder="Логин"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            setLoginError(null);
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
      </div>
      <div className={styles.errorContainer}>
        {errorMessage} {loginError} {passwordError}
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.modal__btnSignupEnt} onClick={handleLogin} disabled={isLoading}>
          Войти
        </button>
        <button className={styles.modal__btnSigninEnt} onClick={onSwitchToRegister} disabled={isLoading}>
          Зарегистрироваться
        </button>
      </div>
    </>
  );
};

export default SignIn;