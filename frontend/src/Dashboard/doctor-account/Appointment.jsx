import React from 'react';
import styles from '../../../src/Dashboard/doctor-account/dashboard.module.css';
import { formatDate } from '../../utils/formateDate';
const Appointment = ({appointments}) => {
debugger
  return (
    <div>
      <table className={styles.table__views}>
          <thead className={styles.table__container}>
              <tr>
                <th scope="col" className={styles.table__stack}>
                  Name
                </th>
                <th scope="col" className={styles.table__stack}>
                  Gender
                </th>
                <th scope="col" className={styles.table__stack}>
                  Payment
                </th>
                <th scope="col" className={styles.table__stack}>
                  Price
                </th>
                <th scope="col" className={styles.table__stack}>
                  BookedOn
                </th>
              </tr>
          </thead>
          <tbody>
            {appointments?.map(item => (
            <tr key={item._id}>
                <th score="row" className={styles.table__item}>
                  <img src={item.user?.photo} alt="" className={styles.table__img}/>
                  <div className={styles.pg__wrap}>
                    <div className={styles.pg__path}>
                        {item.user?.name}
                    </div>
                    <div className={styles.pg__path__001}>
                        {item.user?.email}
                    </div>
                  </div>
                </th>
                <td className={styles.pg__ultimate}>{item.user?.gender}</td>
                <td className={styles.pg__ultimate}>
                  {item?.isPaid && (
                    <div className={styles.pg__field}>
                        <div class={styles.pg__paid}>
                          Paid
                      </div>
                    </div>
                  )}
                  
                  {!item?.isPaid && (
                    <div className={styles.pg__field}>
                        <div class={styles.pg__paid__002}>
                          UnPaid
                      </div>
                    </div>
                  )}
                </td>
                <td className={styles.pg__ultimate}>{item?.ticketPrice}</td>
                <td className={styles.pg__ultimate}>{formatDate(item.createdAt)}</td>
            </tr>))}
          </tbody>

      </table>
    </div>
  )
}

export default Appointment
