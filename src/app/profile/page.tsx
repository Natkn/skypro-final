
'use client';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import Image from 'next/image';
import profile from "../../../public/image/profilephoto.svg";
import Card from '@/components/card/card';
import { getCourses } from '../services/courses/courseApi';
import { Course } from '@/libs/fitness';
import { getUserProfile } from './userProfileData';

interface UserProfile {
  email: string;
  selectedCourses: string[];
}


export default function Profile() {
const [courses, setCourses] = useState<Course[]>([]);
 const [loadingCourses, setLoadingCourses] = useState(true);
  const [errorCourses, setErrorCourses] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [errorProfile, setErrorProfile] = useState<string | null>(null);
   const [progress, setProgress] = useState<{ [courseId: string]: number }>({});


   useEffect(() => {
    const loadCourses = async () => {
      setLoadingCourses(true);
      try {
        const coursesData = await getCourses();
        const sortedCourses = [...coursesData].sort((a, b) => a.order - b.order);
        setCourses(sortedCourses);
      } catch (error: any) {
        setErrorCourses(error.message);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);
  

   useEffect(() => {
    const loadUserProfile = async () => {
      setLoadingProfile(true);
      try {
        const profileData = await getUserProfile();
        setUserProfile(profileData);
      } catch (error: any) {
        setErrorProfile(error.message);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadUserProfile();
  }, []);
  
    const numCards = 3;
    const visibleCourses = courses.slice(0, numCards);


    if (loadingProfile) {
    return <div>Loading profile data...</div>;
  }

  if (errorProfile) {
    return <div>Error loading profile: {errorProfile}</div>;
  }

  const username = userProfile?.email ? userProfile.email.split('@')[0] : 'User';


  const handleContinueClick = (courseId: string) => {
    console.log(`Продолжить курс с ID: ${courseId}`);
  };

  return (
     <div className={styles.profileContainer}>
       <div className={styles.profileBox}>
        Профиль
         <div className={styles.profile}>
           <div className={styles.profileInfo}>
            <div className={styles.profileInfoPhoto}>       
               <Image src={profile} alt="
            profilephoto" width={197} height={197} /></div>
             <div className={styles.profileData}> 
             <div className={styles.profileName}> {username}</div>
           <div className={styles.profileLogin}> Логин: {userProfile?.email || 'N/A'}</div> 
            <button className={styles.logOut}>Выйти</button></div></div></div></div>
       
       
       
        <div className={styles.cardBox}>
           <section className={styles.cards}>
            <div className={styles.cardsRow}>
              {visibleCourses.map((course) => (
               <Card
                 height={649} 
                key={course._id} 
                    _id={course._id}
                    name={course.nameRU}
                    nameEN={course.nameEN} 
                    durationInDays={course.durationInDays}
                    dailyDurationInMinutes={course.dailyDurationInMinutes}
                    complexity={course.complexity}
                    order={course.order}
                    progress={progress[course._id] || 0}
                    onContinueClick={handleContinueClick}
                      showProgress={true}
                  />
              ))}
            </div>
          </section>
    </div></div>
  );
};






   
    