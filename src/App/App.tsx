import React from 'react';
import { PaintMain } from '../features/paint/PaintMain';
import styles from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={styles.wrap}>
      <PaintMain />
    </div>
  );
};
