'use client';

import { useRouter } from "next/navigation";
import styles from "@/components/exerciseModal/exercisemodal.module.css";
import { useEffect, useState } from "react";
import { getWorkoutById, saveWorkoutProgress } from "@/app/services/courses/courseApi";
import { ExerciseType } from "@/app/workout/page";
import SuccessModal from "../modal/page";


interface ExerciseModalProps {
    _id: string;
    isOpen?: boolean;
     onClose: (success: boolean, progressData?: number[]) => void;
      courseId: string;
  workoutId: string;
}

interface WorkoutDetails {
  _id: string;
  exercises: ExerciseType[];
}

export default function ExerciseModal({ courseId, workoutId, isOpen, onClose }: ExerciseModalProps) {
    const [exerciseProgress, setExerciseProgress] = useState<{ [questionId: string]: number }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);

    const handleInputChange = (questionId: string, value: number) => {
        setExerciseProgress({ ...exerciseProgress, [questionId]: value });
    };

   const handleSaveProgress = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Необходимо войти в систему.");
      setLoading(false);
      return;
    }

    const progressData = exercises.map(exercise => exerciseProgress[exercise._id] || 0);

    try {
      await saveWorkoutProgress(
        courseId,
        workoutId,
        progressData,
        { token } 
      );
      console.log("Сохраняем progress на сервере:", courseId, workoutId, progressData);
   onClose(true, progressData);
   
    } catch (error: any) {
      setError(`Ошибка сохранения прогресса: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


    if (!isOpen) {
        return null;
    }


    useEffect(() => {
    const fetchExercises = async () => {
      if (!workoutId) { 
        setError('Workout ID is missing.');
        return;
      }

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
        const workoutData: WorkoutDetails = await getWorkoutById(workoutId, token);
        setExercises(workoutData.exercises);

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) { 
      fetchExercises();
    }
  }, [workoutId, isOpen]);




  
    return (
     <div className={styles.workModalOverlay}>
      <div className={styles.workModalContent}>
        <h2 className={styles.modalTitle}>Мой прогресс</h2>
        <div className={styles.scrollContainer}>
          {loading && <p>Сохранение прогресса...</p>}
          {error && <p>Ошибка: {error}</p>}
          {exercises.map((exercise) => (
            
            <div key={exercise._id} className={styles.exerciseItem}>
              <label htmlFor={`question-${exercise._id}`} className={styles.exerciseLabel}>
                {`Сколько раз вы сделали ${exercise.name.toLowerCase()}?`}
              </label>
              <input
                type="number"
                id={`question-${exercise._id}`}
                className={styles.exerciseInput}
                value={exerciseProgress[exercise._id] || ''}
                onChange={(e) => handleInputChange(exercise._id, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
 
                <button className={styles.startButton} onClick={handleSaveProgress} disabled={loading}>
                    Сохранить
                </button>
                
             </div>
        </div>
    );
}