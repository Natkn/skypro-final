"use client"
import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import Image from "next/image";
import profile from "../../../public/image/profilephoto.svg";
import Card from '@/components/card/card';
import { Course } from '@/libs/fitness';
import { getUserProfile } from '../services/courses/courseApi';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setUserData } from '../services/feature/authSlice';

export interface UserProfile {
    email: string;
    selectedCourses: string[];
    courseProgress: [];
    _id: string;
     id: number;
  username: string;
}

export function filterCoursesByIds(courses: Course[], courseId: string[]): Course[] {
  return courses.filter((course) => courseId.includes(course._id));
}
export default function Profile() {
    const { allCourses } = useAppSelector((state) => state.courses);
    const { userData } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    const selectedCourseIds = userData?.selectedCourses || [];

    const selectedCourses = filterCoursesByIds(allCourses, selectedCourseIds);

    useEffect(() => {
        if (!userData) {
            getUserProfile()
                .then((data) => {
                    dispatch(setUserData(data)); 
                })
                .catch((error) => {
                    console.error('Error loading user profile:', error);
                });
        }
    }, [dispatch, userData]);

    const handleContinueClick = (courseId: string) => {
        console.log(`Продолжить курс с ID: ${courseId}`);
    };

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileBox}>
                <div className={styles.profileBoxTitle}>Профиль</div>  
                <div className={styles.profile}>
                    <div className={styles.profileInfo}>
                        <div className={styles.profileInfoPhoto}>
                            <Image src={profile} alt="profilephoto" width={197} height={197} />
                        </div>
                        <div className={styles.profileData}>
                            <div className={styles.profileName}> {userData?.email ? userData.email.split('@')[0] : 'User'}</div>
                            <div className={styles.profileLogin}> Логин: {userData?.email || 'N/A'}</div>
                            <button className={styles.logOut}>Выйти</button>
                        </div>
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