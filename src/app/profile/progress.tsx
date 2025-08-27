// src/components/ui/Progress.tsx
import React from 'react';
import styles from './progress.module.css';

interface ProgressProps {
    value: number; // Значение прогресса (0-100)
}

const Progress: React.FC<ProgressProps> = ({ value }) => {
    const clampedValue = Math.min(Math.max(value, 40), 100); 

    return (
        <div className={styles.progressBar}>
            <div className={styles.progressBarFill} style={{ width: `${clampedValue}%` }}></div>
        </div>
    );
};

export default Progress;