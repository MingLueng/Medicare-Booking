import React from 'react';
import styles from '../Doctors/Doctor.module.css';
import {Link} from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import startIcon from '../../assets/images/Star.png';

const DoctorCard = ({doctor}) =>{

     const {name, avgRating, totalRating, photo, specialization,experiences} = doctor;
    
    return (
        <div className={styles.doctor__card}>
            <div>
                <img src={photo} className={styles.doctor__img} alt=""/>
            </div>
           <h2 className={styles.doctor__item}>{name}</h2>
           <div className={styles.doctor__subjection}>
                <span className={styles.doctor__subtitle}>
                    {specialization}
                </span>
            <div className={styles.doctor__conception}>
                <span className={styles.doctor__viewers}>
                    <img src={startIcon} alt='' /> {avgRating}
                </span>
                <span className={styles.doctor__ranking}>{totalRating}</span>
            </div>
           </div>

           <div className={styles.doctor__info}>
                <div>
                    {/* <h3 className={styles.doctor__patients}>
                        + {totalPatients} patients
                    </h3> */}
                    <p className={styles.doctor__hospital}>
                        At {experiences && experiences[0]?.hospital}
                    </p>
                </div>
                <Link to={`/doctors/${doctor._id}`} className={styles.carosel_link}>
                          <BsArrowRight className={styles.group__carosel}/>
                </Link>
           </div>
        </div>
    )
}

export default DoctorCard;
