import Header from './components/Header'
import Sidebar from './components/Sidebar'
import React from 'react';
import styles from './components/Styles/equipes.module.css';
const Equipes = () => {
    const titulo = "Equipe"
    return(
        <div className={styles.MainConteiner}>
            <Header titulo={titulo}/>
            <Sidebar/>
            <div className={styles.conteinerEquipes}>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
                <div className={styles.equipe}>
                    <a href="">
                        <img src="" alt="imagemEquipe" className={styles.img}/>
                        <span className={styles.equipe}></span>
                    </a>  
                </div>
            </div>
        </div>
    )
}

export default Equipes;