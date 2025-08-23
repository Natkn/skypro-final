// src/components/Header.tsx
import React from "react";
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "../../../public/image/logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Logo" width={220} height={35} />
      <div className={styles.logoText}>Онлайн-тренировки для занятий дома</div> </div>
      <nav className={styles.nav}>
        <button className={styles.loginButton}>Войти</button>
      </nav>
    </header>
  );
};

export default Header;