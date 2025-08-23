import React from 'react';
import styles from './card.module.css';

interface CardProps {
  _id: string; 
  image: string;
  name: string;
  duration: string;
  complexity: string;
}

const Card: React.FC<CardProps> = ({ image, name, duration, complexity }) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.cardImage} />
     <div className={styles.cardInfo}>
      <h3 className={styles.cardName}>{name}</h3>
      <div className={styles.cardDet}>
        <p className={styles.cardDetail}>{duration}</p>
        <p className={styles.cardDetail}>Сложность: {complexity}</p>
      </div></div> 
    </div>
  );
};

export default Card;