"use client";
import  { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/header/header.module.css";
import logo from "../../../public/image/logo.svg";
import Modal from '../../app/auth/signin/page'; 
import arrow from "../../../public/image/arrow.svg";
import ModalProfile from "@/components/modalProfile/modalprofile";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useAppSelector } from "@/store/store";

export interface User {
  username: string;
  email: string;
}


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [user, setUser] = useState<User | null>(null);
 const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); 
  const router = useRouter();
  
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser)); 
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
       
      }
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
    localStorage.setItem('authUser', JSON.stringify(userData)); 
    closeModal();
  };

  const handleUserLoggedIn = (userData: User) => {
    setUser(userData);
    localStorage.setItem('authUser', JSON.stringify(userData)); 
    closeModal();
  }

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

 const handleLogout = () => {
    localStorage.removeItem('authUser');
    setUser(null); 
    closeProfileModal()
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
        onLogout={handleLogout}
        username={user?.username || ''} 
        email={user?.email || ''}
      />
    </header>
  );
};

export default Header;