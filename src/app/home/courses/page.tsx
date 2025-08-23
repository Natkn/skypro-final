// src/app/home/main/page.tsx

import React from 'react';
import Image from 'next/image';
import styles from './course.module.css'; // Стили для секции Course
import yogaImage from '../../../../public/image/skillcard1 .png';
import Header from '@/components/header/header';
import courseImage from '../../../../public/image/skillcourse.svg';
import maskImage from '../../../../public/image/Maskgroup.svg';
import masklineImage from '../../../../public/image/Maskgroupline.png';


function Home() {
  const srcIcon = '/Sparcle.svg'; // Путь относительно папки public

  return (

    <>   
      <div className={styles.descriptionBlock}>
 <Image
          className={styles.courseImage}
          src={yogaImage} // Используем импортированное изображение
          alt="Yoga"
          width={1160} // Укажите подходящую ширину
          height={310} // Укажите подходящую высоту
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
          src={courseImage} // Используем импортированное изображение
          alt="Course"
          width={1160} // Укажите подходящую ширину
          height={146} // Укажите подходящую высоту
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
          src={maskImage} // Используем импортированное изображение
          alt="Mask"
          width={543} // Укажите подходящую ширину
          height={568} // Укажите подходящую высоту
        />
            <Image
          className={styles.masklineImageWrapper}
          src={masklineImage} // Используем импортированное изображение
          alt="Maskline"
          width={1160} // Укажите подходящую ширину
          height={540} // Укажите подходящую высоту
        />
        </div>
      </div>
    </>
  );
}

export default Home;