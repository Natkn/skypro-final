"use client"
import React, { useEffect, useState } from 'react';
import styles from './course.module.css';
import star from '../../../../public/image/star.svg';
import maskImage from '../../../../public/image/Maskgroup.svg';
import masklineImage from '../../../../public/image/Maskgroupline.png';
import { useParams,useRouter } from 'next/navigation';
import Image from 'next/image';
import { addCourseToUser, getCourseById, getUserProfile, removeCourseFromUser } from '@/services/courses/courseApi';
import { getSkillCardImage } from '@/helpers/image';
import { Course } from '@/libs/fitness';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { addFavoriteCourse, removeFavoriteCourse } from '@/services/feature/courseSlice';
import {  setUserData } from '@/services/feature/authSlice';
import Modal from '@/app/auth/signin/page';

interface CourseDetailPageProps {
    params: { courseId?: string | string[] }
 }


export default function CourseDetailPage({}: CourseDetailPageProps) {
    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { courseId } = useParams();
    const dispatch = useAppDispatch();
    const {  isAuthenticated } = useAppSelector((state) => state.auth);
    const [isCourseAdded, setIsCourseAdded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

    const handleAddCourse = async () => {
    if (!isAuthenticated) {
      openModal(); 
      return;
    }
        try {
            if (courseId && typeof courseId === 'string' && course) {
                await dispatch(addFavoriteCourse(courseId));
                try {
                    await addCourseToUser(courseId);
                    try {
                        const updatedUserData = await getUserProfile();
                        dispatch(setUserData(updatedUserData));
                        setIsCourseAdded(true); 
                    } catch (userError: any) {
                        console.error("Error updating user data:", userError);
                        setError(userError.message || 'Failed to update user data.');
                    }
                } catch (serverError: any) {
                    console.error("Error adding course to user on server:", serverError);
                    setError(serverError.message || 'Failed to add course to user.');
                }
            } else {
                setError('Invalid course ID or course is null');
                console.error('Invalid course ID or course is null');
            }
        } catch (error: any) {
            setError(error.message);
            console.error("Error adding course:", error);
        }
    };

     const handleRemoveCourse = async () => {
        try {
            if (courseId && typeof courseId === 'string') {
                await dispatch(removeFavoriteCourse(courseId));
                try {
                    await removeCourseFromUser(courseId);
                    try {
                        const updatedUserData = await getUserProfile();
                        dispatch(setUserData(updatedUserData));
                        setIsCourseAdded(false); 
                    } catch (userError: any) {
                        console.error("Error updating user data:", userError);
                        setError(userError.message || 'Failed to update user data.');
                    }
                } catch (serverError: any) {
                    console.error("Error removing course from user on server:", serverError);
                    setError(serverError.message || 'Failed to remove course from user.');
                }
            }
        } catch (error: any) {
            setError(error.message || 'Failed to remove course.');
            console.error("Error removing course:", error);
        }
    };

    useEffect(() => {
        const loadCourse = async () => {
            setLoading(true);
            try {
                if (courseId && typeof courseId === 'string') {
                    const courseData = await getCourseById(courseId);
                    setCourse(courseData);
                } else {
                    setError('Invalid course ID');
                }
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        loadCourse();
    }, [courseId]);

    if (loading) {
        return <div>Loading course details...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!course) {
        return <div>Course not found.</div>;
    }

    const skillCardImage = courseId
        ? getSkillCardImage(Array.isArray(courseId) ? courseId[0] : courseId)
        : "/image/skillcard1.png";



 

 const getButtonText = () => {
    if (!isAuthenticated) {
      return "Войдите, чтобы добавить курс";
    } else {
      return isCourseAdded ? "Удалить курс" : "Добавить курс";
    }
  };

const handleButtonClick = () => {
  if (!isAuthenticated) {
    openModal();
  } else {
    isCourseAdded ? handleRemoveCourse() : handleAddCourse();
  }
};


    return (

        <>
            <div className={styles.descriptionBlock}>
                <Image
                    className={styles.courseImage}
                    src={skillCardImage}
                    alt="course"
                    width={1160}
                    height={310}
                />
 <div className={styles.suggestionsContainer}>
               <h2 className={styles.title}>Подойдет для вас, если:</h2>
                <div className={styles.suggestionsBlock}>
                    {course.fitting && course.fitting.map((text, index) => (
                        <div className={styles.suggestionOne} key={index}>
                            <div className={styles.suggestionNumber}>{index + 1}</div>
                            <div className={styles.suggestionText}>{text}</div>
                        </div>
           ))}
            </div>
             </div></div>
          <div className={styles.directionsBlock}>
    <h2 className={styles.title}>Направления</h2>
      <div className={styles.directionsBox}>
          {course.directions && course.directions.map((direction, index) => (
            <div className={styles.directions} key={index}>
                <Image
                    className={styles.courseImage}
                    src={star}
                    alt="star"
                    width={19.5}
                    height={19.5}
                />
                <p>{direction}</p>
            </div>
        ))}
    </div>
   
   
</div>
            <div className={styles.footerCourseDiscription}>
                <div className={styles.footerContent}>
                    <h2 className={styles.footerTitle}>Начните путь к новому телу</h2>
                    <ul className={styles.footerList}>
                        <li>проработка всех групп мышц</li>
                        <li>тренировка суставов</li>
                        <li>улучшение циркуляции крови</li>
                        <li>упражнения заряжают бодростью</li>
                        <li>помогают противостоять стрессам</li>
                    </ul>
                  <button className={styles.loginButton} onClick={handleButtonClick}>
                        {getButtonText()}
                    </button>
                </div>
                <div className={styles.footerImage}>
                    <Image
                        className={styles.maskImageWrapper}
                        src={maskImage}
                        alt="Mask"
                        width={543}
                        height={568}
                    />
                    <Image
                        className={styles.masklineImageWrapper}
                        src={masklineImage}
                        alt="Maskline"
                        width={1160}
                        height={540}
                    />
                </div>
            </div>
       

        </>
    );
}