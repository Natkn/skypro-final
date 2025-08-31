
import { useEffect } from 'react';
import styles from './succesModal.module.css'; 
import Image from "next/image";
import sucess from "../../../public/image/sucess.svg";

interface SuccessModalProps {
  onClose: () => void; 
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  useEffect(() => {
  
    const timer = setTimeout(() => {
      onClose(); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, [onClose]);

return (
    <div className={styles.successModal}>
        <div className={styles.successmodalBox}>
      <p>Ваш прогресс засчитан!</p>
       <Image src={sucess} alt="sucess" width={56} height={56} />
 </div>   </div>
  );
}
