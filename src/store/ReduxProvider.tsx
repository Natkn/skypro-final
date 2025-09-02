
'use client';

import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { useRef, useEffect } from 'react';
import { AppDispatch } from './store'; 
import { setAllCourses } from '@/services/feature/courseSlice';
import { getCourses } from '@/services/courses/courseApi'; 

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const store = storeRef.current;



  return <Provider store={store}>{children}</Provider>;
}