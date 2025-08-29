'use client';

import { WorkoutType } from "@/app/services/courses/courseApi";
import { setCurrentWorkout } from "@/app/services/feature/courseSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import iconChecked from "../../../public/image/Circle.svg";
import styles from "@/components/workoutModal/workoutModal.module.css";
import Image from "next/image";

type Training= WorkoutType;

interface WorkoutsModalProps {
  isOpen?: boolean; 
  onClose: () => void;
   trainings?: Training[];
  loading?: boolean;
   _id: string;
}

export default function WorkoutModal({_id,onClose}:WorkoutsModalProps){
   console.log("WorkoutModal rendered");
    const router = useRouter();

const handleContinueClick = () => {
     router.push(`/workout?courseId=${_id}`); 
  };
  return (
  <div className={styles.workModalOverlay}>
      <div className={styles.workModalContent}>

        <h2 className={styles.modalTitle}>Выберите тренировку</h2>
        <div className={styles.scrollContainer}>
        <ul className={styles.workoutList}>
          <li className={styles.workoutItem}>
            <div className={styles.workoutLeft}>
               <input type="checkbox" name="workout" id="workout1"  className={styles.checkboxInput} />
              <label htmlFor="workout1" className={styles.workoutText}>
                <div className={styles.workouttextBox}>
                   <div className={styles.workoutName}>Утренняя практика</div>
                <div className={styles.workoutDescription}>Йога на каждый день / 1 день</div>
             </div> </label> 
            </div>
          </li>

          <li className={styles.workoutItem}>
            <div className={styles.workoutLeft}>
             <input type="checkbox" name="workout" id="workout2"  className={styles.checkboxInput}/>
              <label htmlFor="workout2" className={styles.workoutText}>
                <div className={styles.workouttextBox}>
                <div className={styles.workoutName}>Красота и здоровье</div>
                <div className={styles.workoutDescription}>Йога на каждый день / 2 день</div>
             </div> </label> 
            </div>
          </li>

          <li className={styles.workoutItem}>
            <div className={styles.workoutLeft}>
              <input type="checkbox" name="workout" id="workout3"  className={styles.checkboxInput}/>
              <label htmlFor="workout3" className={styles.workoutText}>
                <div className={styles.workouttextBox}>
                  <div className={styles.workoutName}>Асаны стоя</div>
                <div className={styles.workoutDescription}>Йога на каждый день / 3 день</div>
              </div> </label>
            </div>
          </li>

          <li className={styles.workoutItem}>
            <div className={styles.workoutLeft}>
              <input type="checkbox" name="workout" id="workout4" className={styles.checkboxInput} />
              <label htmlFor="workout4" className={styles.workoutText}>
                <div className={styles.workouttextBox}>
                   <div className={styles.workoutName}>Растягиваем мышцы бедра</div>
                <div className={styles.workoutDescription}>Йога на каждый день / 4 день</div>
             </div> </label>
            </div>
          </li>

          <li className={styles.workoutItem}>
            <div className={styles.workoutLeft}>
              <input type="checkbox" name="workout" id="workout5"  className={styles.checkboxInput}/>
              <label htmlFor="workout5" className={styles.workoutText}>
                 <div className={styles.workouttextBox}>
                  <div className={styles.workoutName}>Гибкость спины</div>
                <div className={styles.workoutDescription}>Йога на каждый день / 5 день</div>
              </div></label>
            </div>
          </li>
        </ul>
</div>
        <button className={styles.startButton} onClick={handleContinueClick}>
          Начать
        </button>
      </div>
    </div>
  );
};