import React from 'react';
import styles from './styles/style-components/sidebar.module.css';
const Sidebar = () => {
  return (
        <aside className={styles.sidebar}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
        <nav className={styles.nav}>
           <a href="/">
                <button className={styles.button}>
                <span>
                    <i className={`material-symbols-outlined ${styles.i}`}> home </i>
                    <span className={styles.span}>
                        Home
                    </span>
                </span>
            </button>
        </a>
            <a href="   ">
                <button className={styles.button}>
                    <span className={styles.span}>
                        <i className={`material-symbols-outlined ${styles.i}`}> Groups </i>
                        <span className={styles.span}>
                            Matérias
                        </span>
                    </span>
                </button>
            </a>
                <a href="#">
                    <button className={styles.button}>
                    <span className={styles.span}>
                        <i className={`material-symbols-outlined ${styles.i}`}> Backpack </i>
                        <span className={styles.span}>
                            Trabalhos
                        </span>
                    </span>
                    </button>
                </a>        
            <a href="#">
                <button className={styles.button}>
                    <span className={styles.span}>
                        <i className={`material-symbols-outlined ${styles.i}`}> Leaderboard </i>
                        <span className={styles.span}>
                            Notas
                        </span>
                    </span>
                </button>
            </a>
        </nav>
    </aside>
  );
};

export default Sidebar;