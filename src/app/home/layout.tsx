
import { ReactNode } from 'react';
import styles from './layout.module.css';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  

  
  return (
    <div className={styles.wrapper}>    
      <div className={styles.container}> 
        <main className={styles.main}>
          {children} 
        </main>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}