
'use client';

import  { useState, useEffect } from 'react';
import styles from "@/app/home/main/page.module.css";
import Card from '@/components/card/card';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getCourses } from '@/services/courses/courseApi';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setAllCourses } from '@/services/feature/courseSlice';
import { Difficulty } from '@/components/card/icon';



export default function Home() {
const router = useRouter();
 const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { allCourses } = useAppSelector((state) => state.courses);
const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

useEffect(() => {
  const loadCourses = async () => {
    try {
      const coursesData = await getCourses();
      const sortedCourses = [...coursesData].sort((a, b) => a.order - b.order);
      dispatch(setAllCourses(sortedCourses)); 
    } catch (error) {
      console.error("Failed to load courses:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  loadCourses();
}, [dispatch, isAuthenticated]);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const numCards = 5;
  const visibleCourses = allCourses.slice(0, numCards);

    const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`);
  };


  return (
    <>
      <div>
        
        <main className={styles.main}>
          <div className={styles.hero}>
               <div className={styles.heroBox}>
            Начните заниматься спортом и улучшите качество жизни</div>
            <Image 
             className={styles.headerpic} 
               src="/image/headerpic.svg" 
              alt="Логотип" 
              width={288}
               height={120}
                 />
          </div>
          <section className={styles.cards}>
            <div className={styles.cardsRow}>
              {visibleCourses.map((course) => (
                 <div key={course._id}  onClick={() => handleCourseClick(course._id)} className={styles.cardsBox}> 
                <Card
                height={501}
                    _id={course._id}
                    name={course.nameRU}
                    nameEN={course.nameEN} 
                     nameRU={course.nameRU} 
                    durationInDays={course.durationInDays}
                    dailyDurationInMinutes={course.dailyDurationInMinutes}
                    difficulty={course.difficulty as Difficulty}
                    order={course.order}
                  />
                </div>
              ))}
            </div>
          </section>
          <div className={styles.topButton}>
            <button className={styles.scrollToTopButton} onClick={scrollToTop}>
              Наверх ↑
            </button>
          </div>
        </main>
      </div>
    </>
  );
}