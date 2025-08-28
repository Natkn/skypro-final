
'use client';

import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { useRef, useEffect } from 'react';
import { AppDispatch } from './store'; 
import { setAllCourses } from '@/app/services/feature/courseSlice';
import { getCourses } from '@/app/services/courses/courseApi'; 

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

  useEffect(() => {
    const dispatch = store.dispatch as AppDispatch; 
    getCourses()
      .then((data) => {
        dispatch(setAllCourses(data));
      })
      .catch((error) => {
        console.error('Error loading courses:', error);
      });
  }, [store]);

  return <Provider store={store}>{children}</Provider>;
}