
'use client';
import{ useEffect, useState } from 'react';
import styles from './workout.module.css';
import Image from 'next/image';
import video from "../../../public/image/workout.svg";
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { getCourseWorkouts } from '../services/courses/courseApi';
import Progress from '../profile/progress';


interface Workout {
    _id: string;
    name: string;
    video: string;
    exercises: [];
     progress?: number;
      onClose: () => void;
}

interface ExerciseType {
    name: string; 
    progress: number; 
}

export default function WorkoutPage( {progress =0}) {

const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 const [courseName, setCourseName] = useState<string | null>(null);
 
  const [exercisesProgress, setExercisesProgress] = useState<{ [key: string]: number }>({});


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
         <div className={styles.workoutName}> {courseName || 'Загрузка названия курса...'} </div>
            {workouts.length > 0 ? (
                <div>
                    {workouts.map((workout, workoutIndex) => (
                        <div key={workout._id} style={{ marginBottom: '40px' }}>
                            <iframe
                                width="1160"
                                height="640"
                                src={workout.video}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>

                            <div className={styles.exercisesSectionContainer}> 
                                <h3 className={styles.sectionTitle}>Упражнения тренировки {workoutIndex + 1}</h3> 

                                {workout.exercises && workout.exercises.length > 0 ? (
                                    <div>
                                        {workout.exercises.map((exercise, exerciseIndex) => (
                                            <div key={exerciseIndex} className={styles.exerciseItem}>
                                                <div className={styles.exerciseName}>{exercise.name}</div>
                                                <div className={styles.progressGroup}>
                                <Progress value={progress} /> 
                                                    <span className={styles.progressValue}>{exercisesProgress[exercise.name] || 0}%</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Нет упражнений для этой тренировки.</p>
                                )}
                            </div> 
                        </div>
                    ))}
                    <div className={styles.fillProgressButtonContainer}>
                        <button className={styles.fillProgressButton} >
                            Заполнить свой прогресс
                        </button>
                    </div>
                </div>
            ) : (
                <div>No workouts found for this course.</div>
            )}
        </div>
  );
};






   
    