"use client";
import  { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "../../../public/image/logo.svg";
import Modal from '../../app/auth/signin/modal'; 
import arrow from "../../../public/image/arrow.svg";
import ModalProfile from "@/app/profile/modalprofile";

interface User {
  username: string;
  email: string;
}


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [user, setUser] = useState<User | null>(null);
 const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 

    useEffect(() => {
    const storedUsername = localStorage.getItem('authUsername');
    const storedEmail = localStorage.getItem('authEmail');

    if (storedUsername && storedEmail) {
      setUser({ username: storedUsername, email: storedEmail });
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    const handleUserRegistered = (userData: User) => {
    setUser(userData);
    closeModal();
  };

    const handleUserLoggedIn = (userData: User) => {
      setUser(userData);
      closeModal();
  }

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUsername');
    localStorage.removeItem('authEmail');
    setUser(null); 
    closeProfileModal();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image src={logo} alt="Logo" width={220} height={35} />
      <div className={styles.logoText}>Онлайн-тренировки для занятий дома</div> </div>
    <nav className={styles.nav}>
        {user ? ( 
          <div className={styles.userProfile}>
            <Image
              src="/image/profilephoto.svg" 
              alt="User Icon"
              width={50}
              height={50}
              className={styles.userIcon}
            />
            <span className={styles.username}>{user.username}</span>
            <span className={styles.profileArrow} onClick={openProfileModal}>
                <Image src={arrow} alt="arrow" width={8} height={8} /></span> 
          </div>
        ) : ( 
          <button className={styles.loginButton} onClick={openModal}>
            Войти
          </button>
        )}
      </nav>

      <Modal
       isOpen={isModalOpen} 
      onClose={closeModal} 
      onUserRegistered={handleUserRegistered}
       onUserLoggedIn={handleUserLoggedIn} />

        <ModalProfile
        isOpen={isProfileModalOpen}
        onClose={closeProfileModal}
        username={user?.username || ''} 
        email={user?.email || ''}
        onLogout={handleLogout}
      />
    </header>
  );
};

export default Header;