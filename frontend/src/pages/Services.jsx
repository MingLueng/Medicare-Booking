import React from 'react';
import ServicesCard from '../components/Services/ServicesCard';
import {services} from '../assets/data/services';
import styles from '../../src/css/main.module.css';

const Services = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.services__details}>
            {services.map((item, index)=>(
              <ServicesCard item={item} index={index} key={index} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default Services;
