import React from 'react';
import styles from '../Services/Services.module.css';
import {Link} from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
const ServicesCard = ({item,index}) =>{

    const {name, desc, bgColor, textColor} = item;
    
    return (
        <div className={styles.services__card}>
            <h2 className={styles.services__item}>{name}</h2>
            <p className={styles.services__desc}>{desc}</p>

            <div className={styles.services__bgColor}>
            <Link to='/doctors' className={styles.carosel_link_1}>
                <BsArrowRight className={styles.group__carosel} />
            </Link>
            <span className={styles.services__textColor} 
            style={{background:`${bgColor}`,color:`${textColor}`}}>
            {index + 1}
            </span>
            </div>
        </div>
    )
}
export default ServicesCard;

