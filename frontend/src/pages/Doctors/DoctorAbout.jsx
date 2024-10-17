import React from 'react';
import styles from '../Doctors/DoctorDetails.module.css';
import { formatDate } from '../../utils/formateDate';
const DoctorAbout = ({doctor}) => {
    const{name,about,qualifications,experiences} = doctor;
    return (
    <div>
        <div>
        <h3 className={styles.doctor__about}>
            About of
            <span className={styles.about__title}>
            {name}
            </span>
        </h3>
            <p className={styles.text__para}>
            {about}
            </p>
        </div>   
       <div className={styles.sweater__casper}>
            <h3 className={styles.sweater__cast}>
                Education
            </h3>
            <ul className={styles.sweater__elipper}>
                {qualifications?.map((item,index) => 
                <li key ={index} className={styles.lighter01__tab}>
                    <div>
                    <span className={styles.otawa__datetime}>
                    {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                    </span>
                    <p className={styles.panel__storm}>
                        {item.degree}
                    </p> 
                    </div> 
                    <p className={styles.panel__storm}>
                        {item.university}
                    </p>  
                </li>
                )}
            </ul>
       </div>
       <div className={styles.sweater__casper}>
            <h3 className={styles.sweater__cast}>
                Experience
            </h3>
            <ul className={styles.sweater__damaged}>
                {experiences?.map((item,index) =>
                <li key={index} className={styles.lighter__thunder}>
                    <div>
                    <span className={styles.otawa__datetime}>
                    {formatDate(item.startingDate)} - {formatDate(item.endingDate)}
                    </span>
                    <p className={styles.panel__storm}>
                        {item.position}
                    </p> 
                    </div> 
                    <p className={styles.panel__storm}>
                        {item.hospital}
                    </p>  
                </li>
                )}
            </ul>
       </div>
    </div>
    
    );
  };
  
  export default DoctorAbout;