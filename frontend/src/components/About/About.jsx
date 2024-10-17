import React from 'react';
import styles from '../About/About.module.css';
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';
import {Link} from 'react-router-dom';
const About = () => {
  return (
    <section>
        <div className={styles.container}>
            <div className={styles.services}>
                <div className={styles.services__desc}>
                    <img src={aboutImg} alt=""/>
                    <div className={styles.services__img}>
                        <img src={aboutCardImg} alt=""/>
                    </div>
                </div>
                <div className={styles.services__content}>
                    <h2 className={styles.services__heading}>Pround to be one of the nations best</h2>
                    <p className={styles.services__text__para}>
                        For 30 years in a row, U.S. News World Report has recognized us as one of the best publics
                        hospitals in the Nation and #1 in Texas. Lorem ipsum dolor sit amet consectetur, adpisicing elit, Quas, nemo?
                    </p>
                    <p className={styles.services__text__para__plus}>
                        Our best is something we strive for each day, caring for our patients-not looking back at what we accomplished
                        but towards what we can do tomorrow. Providing the best. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, modi?
                    </p>
                    <Link to='/'><button className={styles.btn}>Learn more</button></Link>
                </div>
            </div>
        </div>

    </section>
    
  )
}

export default About;


