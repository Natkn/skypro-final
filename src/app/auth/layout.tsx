"use client";

import { useState } from "react";
import styles from "./signin/modal.module.css";
import Image from "next/image";
import logo from "../../../public/image/logo.svg";
import { UserData } from "@/services/feature/authSlice";
import SignIn from "./signin/page";
import SignUp from "./signup/page";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserRegistered: (user: UserData) => void;
  onUserLoggedIn: (user: UserData) => void;
}

enum ModalMode {
  LOGIN,
  REGISTER,
}


const AuthModal: React.FC<AuthModalProps> = ({
  isOpen, 
  onClose,
  onUserRegistered,
  onUserLoggedIn,
}) => {
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.LOGIN);

  
  if (!isOpen) {
    return null;
  }

  
  const handleSwitchToRegister = () => setModalMode(ModalMode.REGISTER);
  const handleSwitchToLogin = () => setModalMode(ModalMode.LOGIN);


   if (!isOpen) {
    return null; 
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={onClose}>
        
        </button>
        <Image src={logo} alt="Logo" width={220} height={35} priority />
        {modalMode === ModalMode.LOGIN && (
          <SignIn
            onSwitchToRegister={handleSwitchToRegister}
            onUserLoggedIn={onUserLoggedIn}
            onClose={onClose}
          />
        )}
        {modalMode === ModalMode.REGISTER && (
          <SignUp
           onSwitchToLogin={handleSwitchToLogin}
            onUserRegistered={onUserRegistered}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default AuthModal;
