"use client";

import { useState } from "react";
import styles from "./signin/modal.module.css";
import Image from "next/image";
import logo from "../../../public/image/logo.svg";
import { UserData } from "@/services/feature/authSlice";
import SignIn from "./signin/page";
import SignUp from "./signup/page";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  onUserRegistered: (user: UserData) => void;
  onUserLoggedIn: (user: UserData) => void;
}

enum ModalMode {
  LOGIN,
  REGISTER,
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isOpen,
  onClose,
  onUserRegistered,
  onUserLoggedIn,
}) => {
  const [modalMode, setModalMode] = useState<ModalMode>(ModalMode.LOGIN);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.modalCloseButton} onClick={onClose}>
          &times;
        </button>
        <Image src={logo} alt="Logo" width={220} height={35} priority />
        {modalMode === ModalMode.LOGIN && (
          <SignIn
            onSwitchToRegister={() => setModalMode(ModalMode.REGISTER)}
            onUserLoggedIn={onUserLoggedIn}
            onClose={onClose}
          />
        )}
        {modalMode === ModalMode.REGISTER && (
          <SignUp
            onSwitchToLogin={() => setModalMode(ModalMode.LOGIN)}
            onUserRegistered={onUserRegistered}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default ModalLayout;