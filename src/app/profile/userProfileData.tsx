// src/components/profile/Profile.tsx
import React from 'react';
import styles from './Profile.module.css';

interface ProfileProps {
  username: string;
  avatarUrl: string;
}

const Profile: React.FC<ProfileProps> = ({ username, avatarUrl }) => {
  return (
    <div className={styles.profileContainer}>
      <img src={avatarUrl} alt={`Avatar of ${username}`} className={styles.avatar} />
      <p className={styles.username}>{username}</p>
    </div>
  );
};

export default Profile;