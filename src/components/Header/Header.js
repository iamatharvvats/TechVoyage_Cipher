import React from 'react';
//import { useTypewriter, Cursor } from 'react-simple-typewriter';
import ReactTyped from 'react-typed';
import styles from './Header.module.css'; // Importing the CSS module

const Header = () => {
  return (
    <header className={styles.header}>
        <br></br><br></br>
      <div className={styles.content}>
         <ReactTyped strings={
            ["TECHVOYAGE 2023",
            "STORY CODEQUEST CHRONICLES",
        ]}
        typeSpeed={150}
        backSpeed={100}
        loop
        >

         </ReactTyped>
      </div>
    </header>
  );
};

export default Header;