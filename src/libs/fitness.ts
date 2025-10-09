import { Difficulty } from "@/components/card/icon";


export interface Course {
  _id: string;
  nameRU: string;
  nameEN: string;
  description?: string; 
  directions?: string[]; 
  fitting?: string[]; 
  workouts?: string[];
  image?: string;   
  order: number;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  difficulty: string;
}

export interface CourseProgressResponse {
    courseId: string;
    courseCompleted: boolean;
    workoutsProgress: WorkoutProgress[];
}

export interface WorkoutProgress {
    workoutId: string;
    workoutCompleted: boolean;
    progressData: number[];
}

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

export interface CardProps {
  _id: string;
  name: string;
  nameRU: string;     
  nameEN: string;
  description?: string; 
  directions?: string[];
  fitting?: string[];   
  workouts?: string[]; 
  image?: string;
  durationInDays: number;
  dailyDurationInMinutes: {
    from: number;
    to: number;
  };
  difficulty: Difficulty;
  order: number;
  onContinueClick?: (_id: string, nameEN: string) => void;
  showProgress?: boolean;
  height?: number;
}

export interface ExerciseModalProps {
  _id: string;
  isOpen?: boolean;
  onClose: (success: boolean, progressData?: number[]) => void;
  courseId: string;
  workoutId: string;
}

export interface WorkoutDetails {
  _id: string;
  exercises: ExerciseType[];
}


export interface UserProfile {
    email: string;
    selectedCourses: string[];
    courseProgress: [];
    _id: string;
  username: string;
  
}

export interface CourseProgress {
    courseId: string;
    progress: number; 
}