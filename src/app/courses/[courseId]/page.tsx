
"use client"
import React, { useEffect, useState } from 'react';
import styles from './course.module.css'; 
import CourseImage from '../../../../public/image/skillcourse.svg';
import maskImage from '../../../../public/image/Maskgroup.svg';
import masklineImage from '../../../../public/image/Maskgroupline.png';
import { useParams } from 'next/navigation';
import Image from 'next/image'; 
import { getCourseById } from '@/app/services/courses/courseApi';
import { getSkillCardImage } from '@/app/helpers/image';
import { Course } from '@/libs/fitness';

interface CourseDetailPageProps {
 params: { courseId?: string | string[] }
}


export default function CourseDetailPage({ }: CourseDetailPageProps) {
 
const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const { courseId } = useParams();

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

        <h2 className={styles.title}>Подойдет для вас, если:</h2>
        <div className={styles.suggestionsBlock}>
          <div className={styles.suggestionOne}>
            <div className={styles.suggestionNumber}>1</div>
            <div className={styles.suggestionText}>
              Давно хотели попробовать йогу,<br />но не решались начать
            </div>
          </div>
          <div className={styles.suggestionTwo}>
            <div className={styles.suggestionNumber}>2</div>
            <div className={styles.suggestiontextTwo}>
              Хотите укрепить позвоночник, избавиться<br />от болей в спине и суставах
            </div>
          </div>
          <div className={styles.suggestionThree}>
            <div className={styles.suggestionNumber}>3</div>
            <div className={styles.suggestionText}>
              Ищете активность, полезную для тела и души
            </div>
          </div>
        </div>
      </div>
      <div className={styles.directionsBlock}>
        <h2 className={styles.title}>Направления</h2>
     <Image
          className={styles.courseImage}
          src={CourseImage} 
          alt="Course"
          width={1160} 
          height={146} 
        />
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
          <button className={styles.loginButton}>Добавить курс</button>
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

