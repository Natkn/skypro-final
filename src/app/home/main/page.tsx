
'use client';

import  { useState, useEffect } from 'react';
import styles from "@/app/home/main/page.module.css";
import Card from '@/components/card/card';
import headerpic from "../../../../public/image/headerpic.svg";
import Image from "next/image";
import { Course } from '@/libs/fitness'; 
import { useRouter } from 'next/navigation';
import { getCourses } from '@/app/services/courses/courseApi';



export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const router = useRouter();

useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const coursesData = await getCourses();
        // Сортируем курсы по полю order
        const sortedCourses = [...coursesData].sort((a, b) => a.order - b.order);
        setCourses(sortedCourses);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };



  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const numCards = 5;
  const visibleCourses = courses.slice(0, numCards);


    const handleCourseClick = (courseId: string) => {
    router.push(`/courses/${courseId}`); // Используем только ID курса
  };


  return (
    <>
      <div>
        
        <main className={styles.main}>
          <div className={styles.hero}>
            Начните заниматься спортом <br />и улучшите качество жизни
            <Image src={headerpic} alt="Логотип" width={288} height={120} />
          </div>
          <section className={styles.cards}>
            <div className={styles.cardsRow}>
              {visibleCourses.map((course) => (
                 <div key={course._id}  onClick={() => handleCourseClick(course._id)} > 
                <Card
                height={501}
                    _id={course._id}
                    name={course.nameRU}
                    nameEN={course.nameEN} 
                    durationInDays={course.durationInDays}
                    dailyDurationInMinutes={course.dailyDurationInMinutes}
                    complexity={course.complexity}
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