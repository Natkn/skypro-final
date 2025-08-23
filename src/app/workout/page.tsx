// src/components/card/card.tsx
'use client';
import{ useEffect, useState } from 'react';
import styles from './workout.module.css';
import Image from 'next/image';
import video from "../../../public/image/workout.svg";


export default function Workout() {


  

  return (
     <div className={styles.profileContainer}>
       <div className={styles.profileBox}>
        Йога
         <div className={styles.profile}>
           <div className={styles.profileInfo}>
            <div className={styles.profileInfoPhoto}>       
               <Image src={video} alt="
            workoutvid" width={1160} height={639} /></div>
             <div className={styles.profileData}> 
             <div className={styles.profileName}> Сергей</div>
           <div className={styles.profileLogin}> Логин: sergey.petrov96</div> 

            <button className={styles.logOut}>Выйти</button></div></div></div></div>
       
       
       
       
    </div>
  );
};






   
    