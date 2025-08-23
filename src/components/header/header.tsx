"use client";
import  { useState } from "react";
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "../../../public/image/logo.svg";
import Modal from '../../app/auth/signin/modal'; 

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Logo" width={220} height={35} />
      <div className={styles.logoText}>Онлайн-тренировки для занятий дома</div> </div>
      <nav className={styles.nav}>
        <button className={styles.loginButton} onClick={openModal}>
          Войти
        </button>
      </nav>

      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </header>
  );
};

export default Header;