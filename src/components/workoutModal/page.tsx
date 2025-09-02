'use client';

import { getWorkoutById, WorkoutType } from "@/services/courses/courseApi";
import { useRouter } from "next/navigation";
import styles from "@/components/workoutModal/workoutModal.module.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "@/helpers/constant";
import { Workout } from "@/libs/fitness";

type Training= WorkoutType;

interface WorkoutsModalProps {
  isOpen?: boolean; 
  onClose: () => void;
   trainings?: Training[];
  loading?: boolean;
   _id: string;
}


export default function WorkoutModal({_id,onClose}:WorkoutsModalProps){
const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
  const router = useRouter();
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);

const handleContinueClick = () => {
   const selectedWorkoutsString = JSON.stringify(selectedWorkouts);
     router.push(`/workout?courseId=${_id}&selectedWorkouts=${encodeURIComponent(selectedWorkoutsString)}`);
  };

   const handleWorkoutSelect = (workoutId: string) => {
        setSelectedWorkouts(prevSelected => {
            if (prevSelected.includes(workoutId)) {
                return prevSelected.filter(id => id !== workoutId);
            } else {
                return [...prevSelected, workoutId];
            }
        });
    };

  useEffect(() => {
    const fetchWorkoutData = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken');
      if (!token) {
        setError("Необходимо войти в систему для просмотра тренировок.");
        setLoading(false);
        return;
      }

      try {
        const workoutsResponse = await fetch(`${BASE_URL}/courses/${_id}/workouts`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain',
          },
        });
        if (!workoutsResponse.ok) {
          if (workoutsResponse.status === 401) {
            setError("Ваша сессия истекла. Пожалуйста, войдите снова.");
          } else {
            throw new Error(`Error fetching workouts: ${workoutsResponse.statusText}`);
          }
        }
        const workoutsData: Workout[] = await workoutsResponse.json();
        const workoutsWithExercises: Workout[] = await Promise.all(
          workoutsData.map(async (workout) => {
            try {
              const workoutDetails = await getWorkoutById(workout._id, { token: token }); 
              return { ...workout, exercises: workoutDetails.exercises }; 
            } catch (exerciseError: any) {
              console.error(`Error fetching exercises for workout ${workout._id}:`, exerciseError);
              return workout; 
            }
          })
        );

        setWorkouts(workoutsWithExercises);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutData();
  }, [_id]);


return (
  <div className={styles.workModalOverlay}>
    <div className={styles.workModalContent}>
      <h2 className={styles.modalTitle}>Выберите тренировку</h2>
      <div className={styles.scrollContainer}>
        {loading && <p>Загрузка тренировок...</p>}
        {error && <p>Ошибка: {error}</p>}
        {!loading && !error && (
          workouts.length === 0 ? (
            <p>Нет доступных тренировок для этого курса.</p>
          ) : (
            <ul className={styles.workoutList}>
              {workouts.map((workout) => {
                const nameParts = workout.name.split(" / ");
                const workoutName = nameParts[0] || workout.name;
                const workoutDescription = nameParts.length > 1 ? nameParts.slice(1, nameParts.length -1).join(" / ") : "";

                return (
                  <li key={workout._id} className={styles.workoutItem}>
                    <div className={styles.workoutLeft}>
                      <input type="checkbox" 
                      name="workout" 
                      id={`workout-${workout._id}`} 
                      className={styles.checkboxInput}
                      checked={selectedWorkouts.includes(workout._id)}
                      onChange={() => handleWorkoutSelect(workout._id)}
                      />
                      <label htmlFor={`workout-${workout._id}`} className={styles.workoutText}>
                        <div className={styles.workouttextBox}>
                          <div className={styles.workoutName}>{workoutName}</div>
                          {workoutDescription && (
                            <div className={styles.workoutDescription}>{workoutDescription}</div>
                          )}
                        </div>
                      </label>
                    </div>
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>

      <button className={styles.startButton} onClick={handleContinueClick}>
        Начать
      </button>
    </div>
  </div>
);
};