// src/app/home/main/page.tsx
'use client';

import  { useState, useEffect } from 'react';
import styles from "@/app/home/main/page.module.css";
import Card from '@/components/card/card';
import headerpic from "../../../../public/image/headerpic.svg";
import Image from "next/image";
import Header from '@/components/header/header';
import { getAllCourses } from '@/libs/fitness'; // Импортируем функцию

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

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      try {
        const coursesData = await getAllCourses(); // Получаем данные из libs/fitness.ts
        setCourses(coursesData);
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