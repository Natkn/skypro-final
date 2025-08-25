
"use client"
import React, { useEffect, useState } from 'react';
import styles from './course.module.css'; 
import yogaImage from '../../../../public/image/skillcard1 .png';
import CourseImage from '../../../../public/image/skillcourse.svg';
import maskImage from '../../../../public/image/Maskgroup.svg';
import masklineImage from '../../../../public/image/Maskgroupline.png';
import { useParams } from 'next/navigation';
import Pilates from '../../../../public/image/skillcard2.png'
import Image, { StaticImageData } from 'next/image'; 
import { getCourseById } from '@/app/services/courses/courseApi';

interface Course {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  workouts: string[];
 image: string; 
  duration: string;
  complexity: string;
}


const getImageForCourse = (courseName: string): StaticImageData => {
  switch (courseName) {
    case 'Йога':
      return yogaImage;
    case 'Стретчинг':
      return Pilates;
    default:
      return CourseImage;
  }
};


function CourseDetailPage() {
 
const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams(); // Получаем параметры маршрута

  const { courseId } = params;

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

   const courseImage: StaticImageData = getImageForCourse(course.nameRU);


  return (

    <>   
      <div className={styles.descriptionBlock}>
 <Image
          className={styles.courseImage}
          src={course.image} 
          alt="course.nameRU"
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

export default CourseDetailPage;