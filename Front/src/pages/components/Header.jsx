import React from 'react';
import styles from './Styles/style-components/header.module.css'

const Header = ({ titulo }) => {

    return (
        <header className={styles.header}>
            <div className={styles.perfil}>Perfil</div>
            <div className={styles.titleContainer}>
                <h1>{ titulo }</h1>
            </div>
        </header>
    );
};
export default Header