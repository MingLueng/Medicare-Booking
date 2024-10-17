import React from 'react';
import {services} from '../../assets/data/services';
import ServicesCard from './ServicesCard';
import styles from '../Services/Services.module.css';
const ServicesList = () =>{
    return (
        <div className={styles.list__services}>
            {services.map((item,index)=>
                <ServicesCard item={item} index={index} key={index} />
            )}
        </div>
    )
}
export default ServicesList;
