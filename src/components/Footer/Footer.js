// src/components/Footer.js
import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.ocean}></div>
      <div className={styles.shore}>
        <p className={styles.footerContent}>WELCOME TO TECHVOYAGE 2023 @IET CIPHER</p>
      </div>
    </footer>
  );
};

export default Footer;
