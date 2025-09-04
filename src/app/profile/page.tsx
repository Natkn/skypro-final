"use client"
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import Image from "next/image";
import profile from "../../../public/image/profilephoto.svg";
import Card from '@/components/card/card';
import { Course } from '@/libs/fitness';
import { useRouter } from 'next/navigation'; 
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ModalProfileProps } from '@/components/modalProfile/modalprofile';
import { getCourseProgress, getCourses, getUserProfile } from '@/services/courses/courseApi';
import { clearUserData, setIsAuthenticated, setUserData } from '@/services/feature/authSlice';
import { setAllCourses } from '@/services/feature/courseSlice';


interface ProfileProps {
    onLogout: () => void; // Определение типа для onLogout
}

export function filterCoursesByIds(courses: Course[], courseId: string[]): Course[] {
  return courses.filter((course) => courseId.includes(course._id));
}
export default function Profile({}:ProfileProps) {
    const { allCourses } = useAppSelector((state) => state.courses);
   const { userData } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
 const router = useRouter(); 
    const selectedCourseIds = userData?.selectedCourses || [];
     const selectedCourses = allCourses && allCourses.length > 0 ? filterCoursesByIds(allCourses, selectedCourseIds) : [];


     const [isClient, setIsClient] = useState(false); 
useEffect(() => {
    setIsClient(true); 
  }, []);

useEffect(() => {
  setIsClient(true);
}, []);

useEffect(() => {
  if (!isClient) return; 
  async function loadUserData() {
    try {
      const data = await getUserProfile();
      dispatch(setUserData(data));
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  }

  async function loadCourses() {
    try {
      const courses = await getCourses();
      dispatch(setAllCourses(courses));
    } catch (error) {
      console.error('Failed to load courses:', error);
    }
  }

  loadUserData();
  loadCourses();
}, [dispatch, isClient]);

if (!isClient) {
  return <div>Loading...</div>;
}



    const handleContinueClick = (courseId: string) => {
        console.log(`Продолжить курс с ID: ${courseId}`);
    };


    
 const handleLogout = () => {
    localStorage.removeItem('authUser');
      localStorage.removeItem('userData');
  dispatch(setIsAuthenticated(false));
   dispatch(clearUserData());
   localStorage.clear();
    router.push('/home/main');
  };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileBox}>
                <div className={styles.profileBoxTitle}>Профиль</div>  
                <div className={styles.profile}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileInfoPhoto}>
                            <Image 
                               className={`${styles.desktopImage} ${styles.profileImage}`}
                            src={profile}
                             alt="profilephoto" 
                             width={197} 
                             height={197}
                              />
                             
                        </div>
                         {userData ? (
                        <div className={styles.profileData}>
                            <div className={styles.profileName}> {userData?.email ? userData.email.split('@')[0] : 'User'}</div>
                            <div className={styles.profileLogin}> Логин: {userData?.email || 'N/A'}</div>
                             <button className={styles.logOut} onClick={handleLogout}>Выйти</button> 
                        </div>
                         ) : (
            <div>Loading...</div> 
        )}
                    </div>
                </div>
            </div>

            <div className={styles.cardBox}>
                <div className={styles.profileBoxTitle}>Мои курсы</div>
                <section className={styles.cards}>
                    <div className={styles.cardsRow}>
                        {selectedCourses.length > 0 ? ( 
                            selectedCourses.map((course) => (
                                <Card
                                    height={649}
                                    key={course._id}
                                    _id={course._id}
                                    name={course.nameRU}
                                    nameEN={course.nameEN}
                                     nameRU={course.nameRU}
                                    durationInDays={course.durationInDays}
                                    dailyDurationInMinutes={course.dailyDurationInMinutes}
                                    complexity={course.complexity}
                                    order={course.order}           
                                    onContinueClick={handleContinueClick}
                                    showProgress={true}
                                />
                            ))
                        ) : (
                            <div>No courses added yet.</div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}