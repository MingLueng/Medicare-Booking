import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../../src/pages/CheckOutSuccess.module.css';


const CheckOutSuccess = () => {
  return (
    <div className={styles.bg_checkout}>
      <div className={styles.bg_content__001}>
        <svg viewBox='0 0 24 24' className={styles.bg_seller__002}>
            <path fill="currentColor" d="M12,0A12,12,0,1,0,24,12,
            12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,
            1.001,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-
            1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
          <div className={styles.checkout__prc}>
          <h3 className={styles.bg_hammer_007}>
            Payment Done!
          </h3>
          <p className={styles.bg_quanrence}>
            Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className={styles.bg_newjoke}>
              <Link to="/home" className={styles.bg_universe}>Go Back To Home</Link>
            </div>
          </div>
      </div>
    </div>
  )
}

export default CheckOutSuccess;
