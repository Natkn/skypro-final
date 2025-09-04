"use client";
import  { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "../../../public/image/logo.svg";
import Modal from '../../app/auth/signin/page'; 
import arrow from "../../../public/image/arrow.svg";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from "@/store/store";
import ModalProfile from "../modalProfile/modalprofile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { clearUserData, setUserData, UserData } from "@/services/feature/authSlice";
import { loadStateFromLocalStorage } from "@/services/feature/courseSlice";

interface User {
  username: string;
  email: string;
  
}


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
  const router = useRouter();
const { userData } = useAppSelector((state) => state.auth);
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.userData);
  const dispatch = useAppDispatch();

  // При монтировании компонента загружаем пользователя из localStorage в Redux
useEffect(() => {
  const storedUser = localStorage.getItem('authUser');
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      const userData: UserData = {
        _id: parsedUser._id || '',
        username: parsedUser.username || '',
        email: parsedUser.email || '',
        selectedCourses: parsedUser.selectedCourses || [],
      };
      dispatch(setUserData(userData));
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }
}, [dispatch]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

const handleUserRegistered = (userData: UserData) => {
  dispatch(setUserData(userData));
  closeModal();
};

const handleUserLoggedIn = (userData: UserData) => {
  dispatch(setUserData(userData));
  closeModal();
};

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    dispatch(clearUserData());
    closeProfileModal();
    localStorage.clear();
    router.push('/home/main');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
           <Link href="/home/main">
          <Image
            src={logo} 
            alt="Logo"
            width={220}
            height={35}
            /></Link>  
      <div className={styles.logoText}>Онлайн-тренировки для занятий дома</div> </div>
    <nav className={styles.nav}>
        {isAuthenticated && user ? (
          <div className={styles.userProfile}>
        
            <Image
             className={`${styles.desktopImage} ${styles.userIcon}`}
              src="/image/profilephoto.svg" 
              alt="User Icon"
              width={50}
              height={50}
            />
              <Image
             className={`${styles.mobileImage} ${styles.Iconmini}`}
              src="/image/ProfileMini.svg" 
              alt="User Icon"
              width={36}
              height={36}
            />
            <span className={styles.username}>{userData?.email ? userData.email.split('@')[0] : 'User'}</span>
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