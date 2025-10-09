import React from 'react';
import styles from './iconover.module.css';

interface IconOverProps {
  Icon: React.ReactNode;
}

const IconOver: React.FC<IconOverProps> = ({ Icon }) => {
  return <span className={styles.IconOver}>{Icon}</span>;
};

export default IconOver;