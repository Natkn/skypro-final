

import React from 'react';
import Image from 'next/image';
import styles from './course.module.css'; 
import yogaImage from '../../../../public/image/skillcard1 .png';
import courseImage from '../../../../public/image/skillcourse.svg';
import maskImage from '../../../../public/image/Maskgroup.svg';
import masklineImage from '../../../../public/image/Maskgroupline.png';


function Home() {
 

  return (

    <>   
      <div className={styles.descriptionBlock}>
 <Image
          className={styles.courseImage}
          src={yogaImage} 
          alt="Yoga"
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
          src={courseImage} 
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

export default Home;