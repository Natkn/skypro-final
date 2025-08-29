
'use client';
import { useEffect, useState } from 'react';
import styles from './workout.module.css';
import { useSearchParams } from 'next/navigation';
import { getCourseById, getCourseWorkouts, WorkoutType } from '../services/courses/courseApi';
import Progress from '../profile/progress';
import { Course } from '@/libs/fitness';


export interface Workout {
    _id: string;
    name: string;
    video: string;
    exercises: ExerciseType[];
    progress?: number;
    onClose: () => void;
    workoutName: string;
    workoutDescription: string;
}

interface ExerciseType {
    name: string;
    quantity: number;
    _id: string;
    progress: number;
}

export default function WorkoutPage() {

    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const selectedWorkoutsString = searchParams.get('selectedWorkouts');
    const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
    const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [exercisesProgress, setExercisesProgress] = useState<{ [key: string]: number }>({});
 const [courseName, setCourseName] = useState<string | null>(null);

    useEffect(() => {
        if (selectedWorkoutsString) {
            try {
                const decodedSelectedWorkouts = JSON.parse(decodeURIComponent(selectedWorkoutsString));
                if (Array.isArray(decodedSelectedWorkouts)) {
                    setSelectedWorkouts(decodedSelectedWorkouts);
                } else {
                    console.error("Invalid selectedWorkouts format in URL");
                }
            } catch (error) {
                console.error("Error parsing selectedWorkouts from URL:", error);
            }
        }
    }, [selectedWorkoutsString]);


    useEffect(() => {
        const fetchWorkouts = async () => {
            if (!courseId) {
                setError('Course ID is missing.');
                setLoading(false);
                return;
            }

            setLoading(true);
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
                 try{

          const courseData: Course = await getCourseById(courseId); //  Тут нужен authToken, а не token объект
setCourseName(courseData.nameRU); 
        } catch (courseError){
           console.error("Ошибка при получении данных о курсе: ", courseError);
           setError("Не удалось загрузить данные о курсе");
        }

                const workoutData = await getCourseWorkouts(courseId, token);
                setWorkouts(workoutData);
                setError(null);

                const initialProgress: { [key: string]: number } = {};
                workoutData.forEach(workout => {

                });
                setExercisesProgress(initialProgress);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, [courseId]);


    if (loading) {
        return <div>Loading workouts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className={styles.workoutName}> {courseName} </div>
            {workouts.length > 0 ? (
                <div>
                    {workouts
                        .filter(workout => selectedWorkouts.includes (String(workout._id))) 
                        .map((workout, workoutIndex) => (
                            <div key={workout._id} style={{ marginBottom: '40px' }}>
                                <iframe
                                    width="1160"
                                    height="640"
                                    src={workout.video}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{borderRadius: '30px'  }}
                                ></iframe>

                                <div className={styles.exercisesSectionContainer}>
                                    <h3 className={styles.sectionTitle}>Упражнения тренировки {workoutIndex + 2}</h3>

                                   {workout.exercises && workout.exercises.length > 0 ? (
<div className={styles.exercisesSection}>
<div className={styles.exercisesBox}>
    {Array.from({ length: Math.ceil(workout.exercises.length / 3) }, (_, i) => {
      const startIndex = i * 3;
      const group = workout.exercises.slice(startIndex, startIndex + 3);

      return (
        <div key={i} className={styles.exerciseColumn}>
          {group.map((exercise, exerciseIndex) => (
            <div key={exerciseIndex} className={styles.exerciseItem}>
              <div className={styles.exerciseName}> {exercise.name}
    <span className={styles.progressValue}>  {exercisesProgress[workout.name] || 0}%</span>
  </div>
  <div className={styles.progressGroup}>
    <Progress value={0} />
                <span className={styles.progressValue}>{exercisesProgress[workout.name]}</span>
              </div>
            </div>
            
          ))}
        </div>
      );
    })} </div>
   <div className={styles.fillProgressButtonContainer}>
                        <button className={styles.fillProgressButton} >
                            Заполнить свой прогресс
                        </button>
                    </div>
  </div>
                                    ) : (
                                        <p>Нет упражнений для этой тренировки.</p>
                                    )}
                                </div>
                            </div>
                        ))}
                 
                </div>
                
            ) : (
                <div>No workouts found for this course.</div>
            )}
        </div>
    );
}