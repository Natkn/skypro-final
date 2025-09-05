
import  { useEffect, useState } from 'react';
import styles from './card.module.css';
import Image from "next/image";
import { getImagePath } from '@/helpers/image'; 
import IconOver from './iconover';
import { CalendarIcon,  ScaleIcon, TimeIcon } from '@/components/card/icon'; 
import Progress from '@/helpers/progress/progress';
import iconMinus from "../../../public/image/iconMinus.svg";
import { removeFavoriteCourse } from '@/services/feature/courseSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setUserData } from '@/services/feature/authSlice';
import { removeCourseFromUser, getCourseProgress } from '@/services/courses/courseApi';
import WorkoutModal from '../workoutModal/page';
import { CardProps, WorkoutProgress } from '@/libs/fitness';
import { roundProgress } from '@/utils/progressUtils';



const Card: React.FC<CardProps> = ({  _id,name, nameEN,difficulty,  durationInDays, dailyDurationInMinutes, showProgress = false,  height = 501}) => {
    const imageSrc = getImagePath(nameEN);
    const dispatch = useAppDispatch();
    const { userData } = useAppSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


const handleRemoveClick = async () => {
    dispatch(removeFavoriteCourse(_id)); 
    if (userData) { 
        dispatch(setUserData({
        ...userData,
        selectedCourses: userData.selectedCourses.filter(courseId => courseId !== _id),
      }));
      try {
      const response = await removeCourseFromUser(_id);
    } catch (error: any) {
      console.error('Error removing course from server:', error.message);
    }
    }
  };

    useEffect(() => {
        const fetchCourseProgress = async () => {
            setLoading(true);
            setError(null);
            try {
                const authToken = localStorage.getItem('authToken');
                const refreshToken = localStorage.getItem('refreshToken');

                if (!authToken || !refreshToken) {
                    throw new Error("No authentication tokens found");
                }

                const token = {
                    token: authToken,
                    refreshToken: refreshToken,
                };
                const courseProgressData = await getCourseProgress(_id, token);
               let totalProgress = 0;
if (courseProgressData.workoutsProgress && courseProgressData.workoutsProgress.length > 0) {
    let totalWorkoutProgress = 0; 
    const totalWorkouts = courseProgressData.workoutsProgress.length;

    courseProgressData.workoutsProgress.forEach((workout: WorkoutProgress) => {
        let workoutProgress = 0;
        if (workout.progressData && workout.progressData.length > 0) {
            workoutProgress = workout.progressData.reduce((sum, current) => sum + current, 0) / workout.progressData.length;
        }
        totalWorkoutProgress += workoutProgress; 
    });

    totalProgress = (totalWorkoutProgress / totalWorkouts); 
} else {
  
    totalProgress = 0;
}
                setProgress(totalProgress);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        if (showProgress) {
            fetchCourseProgress();
        }
    }, [_id, showProgress]);

   const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


     let buttonText = "Продолжить";
    if (progress === 0) {
        buttonText = "Начать тренировки";
    } else if (roundProgress(progress) === 100) {
        buttonText = "Начать заново";
    }

  return (
     <div className={styles.card} style={{ height: `${height}px` }}>
       <div className={styles.imageContainer}>
      <Image
        src={imageSrc}
        alt={name}
        width={300} 
        height={200} 
        className={styles.cardImage} 
        priority
      />
      {showProgress ? (
                  <div className={styles.imageContainer}>
        <Image
        src={iconMinus}
        alt={name}
        width={32} 
        height={32} 
        className={styles.cardminus} 
         onClick={handleRemoveClick}
        
         
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
       <ScaleIcon difficulty={difficulty} />

                <p className={styles.cardDetail}> 
                  Сложность </p>
            </div>
             {showProgress && (
<div className={styles.cardprofileProgress}>
 <div className={styles.cardProgress}>
                <p className={styles.cardProgressLabel}>Прогресс: {roundProgress(progress)}%</p>
                <Progress value={progress} /> 
            </div>
            <button className={styles.cardContinueButton} onClick={openModal}>{buttonText}</button> 
              {isModalOpen && <WorkoutModal onClose={closeModal}  _id={_id} />}
        </div> 
)}
</div>   
</div>
</div>
  );
};

export default Card;