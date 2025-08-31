import { ExerciseType } from "@/app/workout/page";

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
  complexity: string;
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