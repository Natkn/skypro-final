'use client';

import { WorkoutType } from "@/app/services/courses/courseApi";
import { setCurrentWorkout } from "@/app/services/feature/courseSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


type Training= WorkoutType;

interface WorkoutsModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainings: Training[];
  loading?: boolean;
}

export default function WorkoutModal(){
 



  return (
   

        <button
        
          onClick={}
        >
          Начать
        </button>

  );
}