// src/components/card/card.tsx
'use client';
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import Image from 'next/image';
import profile from "../../../public/image/profilephoto.svg";
import { getAllCourses } from '@/libs/fitness';
import { Course } from '../home/main/page';
import Card from '@/components/card/card';




export default function Profile() {


    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadCourses = async () => {
        setLoading(true);
        try {
          const coursesData = await getAllCourses(); 
          setCourses(coursesData);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadCourses();
    }, []);
  

  
  
    const numCards = 3;
    const visibleCourses = courses.slice(0, numCards);

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
             <div className={styles.profileName}> Сергей</div>
           <div className={styles.profileLogin}> Логин: sergey.petrov96</div> 

            <button className={styles.logOut}>Выйти</button></div></div></div></div>
       
       
       
        <div className={styles.cardBox}>
           <section className={styles.cards}>
            <div className={styles.cardsRow}>
              {visibleCourses.map((course) => (
                <Card
                _id={course._id}
                  key={course._id}
                  image={course.image}
                  name={course.nameRU}
                  duration={course.duration}
                  complexity={course.complexity}
                />
              ))}
            </div>
          </section>
    </div></div>
  );
};






   
    