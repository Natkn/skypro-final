'use client';
import styles from "@/components/exerciseModal/exercisemodal.module.css";
import { useEffect, useState } from "react";
import { getWorkoutById, saveWorkoutProgress } from "@/services/courses/courseApi";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setExerciseProgress, selectExerciseProgress } from "@/services/feature/courseSlice";  
import { ExerciseModalProps, ExerciseType, WorkoutDetails } from "@/libs/fitness";

export default function ExerciseModal({ courseId, workoutId, isOpen, onClose }: ExerciseModalProps) {
  const [exerciseProgress, setLocalExerciseProgress] = useState<{ [exerciseId: string]: number }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [exercises, setExercises] = useState<ExerciseType[]>([]);
  const dispatch = useAppDispatch();
  const progressFromStore = useAppSelector(selectExerciseProgress); 

  const handleInputChange = (exerciseId: string, value: number) => {
    setLocalExerciseProgress({ ...exerciseProgress, [exerciseId]: value });
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

       const storedProgress = localStorage.getItem(`exercisesProgress-${courseId}`);
            let initialProgress: { [workoutId: string]: { [exerciseName: string]: number } } = {};

            if (storedProgress) {
                try {
                    initialProgress = JSON.parse(storedProgress);
                } catch (e: any) {
                    console.error("Error parsing stored progress:", e);
                }
            }

            if (!initialProgress[workoutId]) {
                initialProgress[workoutId] = {};
            }

            exercises.forEach((exercise, index) => {
                initialProgress[workoutId][exercise.name] = progressData[index] || 0;
            });

            localStorage.setItem(`exercisesProgress-${courseId}`, JSON.stringify(initialProgress));

          
      exercises.forEach((exercise, index) => {
        const action = setExerciseProgress({
          workoutId: workoutId,
          exerciseName: exercise.name,
          progress: progressData[index],
        });
        dispatch(action);
      });

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
    if (workoutId && exercises.length > 0) {
      let initialProgress: { [exerciseId: string]: number } = {};
      exercises.forEach(exercise => {
          const progressInStore = progressFromStore[workoutId]?.[exercise.name]
          initialProgress[exercise._id] = progressInStore !== undefined ? progressInStore : 0;
      });

      setLocalExerciseProgress(initialProgress);
    }
  }, [workoutId, exercises, progressFromStore]);



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