'use client';
import { useEffect, useState } from 'react';
import styles from './workout.module.css';
import { useSearchParams } from 'next/navigation';
import { getCourseById, getCourseWorkouts, WorkoutType } from '../services/courses/courseApi';
import Progress from '../profile/progress';
import { Course } from '@/libs/fitness';
import ExerciseModal from '@/components/exerciseModal/page';
import SuccessModal from '@/components/modal/page';


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

export interface ExerciseType {
    name: string;
    quantity: number;
    _id: string;
    progress: number;
}

export default function WorkoutPage({ _id }: Workout) {

    const searchParams = useSearchParams();
    const courseId = searchParams.get('courseId');
    const selectedWorkoutsString = searchParams.get('selectedWorkouts');
    const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
    const [selectedWorkouts, setSelectedWorkouts] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   const [exercisesProgress, setExercisesProgress] = useState<{ [workoutId: string]: { [exerciseName: string]: number } }>({});
    const [courseName, setCourseName] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)
    const [isProgressFilled, setIsProgressFilled] = useState<{ [workoutId: string]: boolean }>({});
    const [selectedWorkoutId, setSelectedWorkoutId] = useState<string | null>(null);


 useEffect(() => {
    const fetchData = async () => {
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

            try {
                const courseData: Course = await getCourseById(courseId);
                setCourseName(courseData.nameRU);
            } catch (courseError) {
                console.error("Ошибка при получении данных о курсе: ", courseError);
                setError("Не удалось загрузить данные о курсе");
            }

            const workoutData = await getCourseWorkouts(courseId, token);
            setWorkouts(workoutData);
            setError(null);


             const storedProgress = localStorage.getItem(`exercisesProgress-${courseId}`);
                let initialProgress: { [workoutId: string]: { [exerciseName: string]: number } } = {};
                if (storedProgress) {
                    try {
                        initialProgress = JSON.parse(storedProgress);
                    } catch (e: any) {
                        console.error("Error parsing stored progress:", e);
                    }
                }

                setExercisesProgress(initialProgress);

                 // Load isProgressFilled from localStorage
                const storedIsProgressFilled = localStorage.getItem(`isProgressFilled-${courseId}`);
                if (storedIsProgressFilled) {
                    try {
                        setIsProgressFilled(JSON.parse(storedIsProgressFilled));
                    } catch (e: any) {
                        console.error("Error parsing isProgressFilled:", e);
                    }
                }

           

            workoutData.forEach(workout => {
                if (!initialProgress[workout._id]) {
                    initialProgress[workout._id] = {};
                }
                workout.exercises.forEach(exercise => {
                    if (initialProgress[workout._id][exercise.name] === undefined) {
                        initialProgress[workout._id][exercise.name] = 0;
                    }
                });
            });

            setExercisesProgress(initialProgress);

            if (selectedWorkoutsString) {
                try {
                    const decodedSelectedWorkouts = JSON.parse(decodeURIComponent(selectedWorkoutsString));
                    if (Array.isArray(decodedSelectedWorkouts)) {
                        setSelectedWorkouts(decodedSelectedWorkouts);
                    } else {
                        console.error("Invalid selectedWorkouts format in URL");
                    }
                } catch (parseError) {
                    console.error("Error parsing selectedWorkouts from URL:", parseError);
                }
            }


        } catch (fetchError: any) {
            setError(fetchError.message);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [courseId, selectedWorkoutsString]);



 


    if (loading) {
        return <div>Loading workouts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    const openModal = (workoutId: string) => {
        setSelectedWorkoutId(workoutId);
        setIsModalOpen(true);
    };

  const closeModal = (success: boolean, progressData?: number[]) => {
        setIsModalOpen(false);
        setShowSuccessMessage(true);

        if (success) {
         const newIsProgressFilled = { ...isProgressFilled, [selectedWorkoutId!]: true }; // Create new object

            setIsProgressFilled(newIsProgressFilled); // Set the new state

            localStorage.setItem(`isProgressFilled-${courseId}`, JSON.stringify(newIsProgressFilled));  // Update localStorage

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000);

            // Update progress in WorkoutPage after modal is closed
            const storedProgress = localStorage.getItem(`exercisesProgress-${courseId}`);
            let initialProgress: { [workoutId: string]: { [exerciseName: string]: number } } = {};
            if (storedProgress) {
                try {
                    initialProgress = JSON.parse(storedProgress);
                } catch (e: any) {
                    console.error("Error parsing stored progress:", e);
                }
            }

            setExercisesProgress(initialProgress);
        }
    };

    const handleCloseSuccess = () => {
        setShowSuccessMessage(false);
    };


    return (
        <div>
            <div className={styles.workoutName}> {courseName} </div>
            {workouts.length > 0 ? (
                <div>
                    {workouts
                        .filter(workout => selectedWorkouts.includes(String(workout._id)))
                        .map((workout, workoutIndex) => (
                            <div key={workout._id} style={{ marginBottom: '40px' }}>
                                <iframe
                                    width="1160"
                                    height="640"
                                    src={workout.video}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ borderRadius: '30px' }}
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
                                                                        <span className={styles.progressValue}> {exercisesProgress[workout._id]?.[exercise.name] || 0}%</span>
                                                                    </div>
                                                                    <div className={styles.progressGroup}>
                                                                        <Progress value={exercisesProgress[workout._id]?.[exercise.name] || 0} />

                                                                    </div>
                                                                </div>

                                                            ))}
                                                        </div>
                                                    );
                                                })} </div>
                                            <div className={styles.fillProgressButtonContainer}>
                                                <button
                                                    className={styles.fillProgressButton}
                                                    onClick={() => openModal(workout._id)}
                                                >
                                                    {isProgressFilled[workout._id] ? "Обновить свой прогресс" : "Заполнить свой прогресс"}
                                                </button>
                                                {isModalOpen && selectedWorkoutId === workout._id && (
                                                    <ExerciseModal
                                                        onClose={closeModal}
                                                        isOpen={isModalOpen}
                                                        courseId={courseId || ""}
                                                        workoutId={workout._id || ""}
                                                        _id={_id}

                                                    />
                                                )}
                                                {showSuccessMessage &&
                                                    <SuccessModal onClose={handleCloseSuccess} />
                                                }
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