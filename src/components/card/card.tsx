
import React from 'react';
import styles from './card.module.css';
import Image from "next/image";
import { getImagePath } from '@/app/helpers/image'; 
import IconOver from './iconover';
import { CalendarIcon, IconOverPic, ScaleIcon, TimeIcon } from '@/components/card/icon'; 
import Progress from '@/app/profile/progress';
import iconMinus from "../../../public/image/iconMinus.svg";
import { useRouter } from 'next/navigation';

export interface CardProps {
  _id: string;
  name: string;
  nameEN: string;
  durationInDays: number
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  complexity: string;
    order: number;
     progress?: number;
     onContinueClick?: (_id: string) => void;
      showProgress?: boolean;
        height?: number; 
}

const Card: React.FC<CardProps> = ({  _id,name, nameEN, durationInDays, dailyDurationInMinutes, complexity, progress = 0,onContinueClick, showProgress = false,  height = 501}) => {
  const imageSrc = getImagePath(nameEN);
  const router = useRouter();

    const handleContinueClick = () => {
        router.push(`/workout?courseId=${_id}`); 
    };

  return (
     <div className={styles.card} style={{ height: `${height}px` }}>
       <div className={styles.imageContainer}>
      <Image
        src={imageSrc}
        alt={name}
        width={300} 
        height={200} 
        className={styles.cardImage} 
      />
      {showProgress ? (
                  <div className={styles.imageContainer}>
        <Image
        src={iconMinus}
        alt={name}
        width={32} 
        height={32} 
        className={styles.cardminus} 
        
         
      /></div>
    ) : (
        <IconOver Icon={
            <svg width="26" height="26" viewBox="0 0 28 28" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14 27.3333C21.3638 27.3333 27.3334 21.3638 27.3334 14C27.3334 6.63616 21.3638 0.666626 14 0.666626C6.63622 0.666626 0.666687 6.63616 0.666687 14C0.666687 21.3638 6.63622 27.3333 14 27.3333ZM12.6667 12.6666V7.33329H15.3334V12.6666H20.6667V15.3333H15.3334V20.6666H12.6667V15.3333H7.33335V12.6666H12.6667Z"
                      fill="white"/>
            </svg>
        } />
    )}
   </div>
           <div className={styles.cardInfo}>
      <h3 className={styles.cardName}>{name}</h3>
      <div className={styles.cardDet}>
            
          <div className={styles.cardDetailItem}>
                <CalendarIcon />
                <p className={styles.cardDetail}>{durationInDays} дней</p>
            </div>
                    <div className={styles.cardDetailItem}>
                <TimeIcon />
                <p className={styles.cardDetail}>{dailyDurationInMinutes?.from}-{dailyDurationInMinutes?.to} мин/день</p>
            </div>
     <div className={styles.cardDetailItem}>
         <ScaleIcon/> 
                <p className={styles.cardDetail}> 
                  Сложность {complexity}</p>
            </div>
             {showProgress && (
<div className={styles.cardprofileProgress}>
 <div className={styles.cardProgress}>
                <p className={styles.cardProgressLabel}>Прогресс: {progress}%</p>
                <Progress value={progress} /> 
            </div>
            <button className={styles.cardContinueButton} onClick={handleContinueClick} >Продолжить</button> 
            </div> 
)}
</div>   
</div>
</div>
  );
};

export default Card;