
import React, { useEffect, useRef } from 'react';
import styles from './modalprofile.module.css';
import { useRouter } from 'next/navigation';

interface ModalProfileProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  email: string;
  onLogout: () => void; 
}

const ModalProfile: React.FC<ModalProfileProps> = ({ isOpen, onClose, username, email, onLogout }) => {
    const modalRef = useRef<HTMLDivElement>(null);
     const router = useRouter();


       const handleGoToProfile = () => {
        router.push('/profile'); 
        onClose();
    };
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

  return (
    <div className={styles.modalProfile}  ref={modalRef}>
      <div className={styles.modalprofileBox} onClick={(e) => e.stopPropagation()}>
           <div className={styles.profileName}> {username}</div>
           <div className={styles.profileLogin}> {email}</div>
          <button className={styles.profile} onClick={handleGoToProfile}>Мой профиль</button>
            <button className={styles.logOut} onClick={onLogout}>Выйти</button>
        </div></div>
  );
};

export default ModalProfile;

