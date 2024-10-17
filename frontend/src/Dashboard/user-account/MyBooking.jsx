import React from 'react';
import useGetBooking from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import DoctorCard from '../../components/Doctors/DoctorCard';
import Loading from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import styles from '../../Dashboard/user-account/Myaccount.module.css';

const MyBooking = () => {
  const { data:doctors, loading, error } = useGetBooking(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      
      {loading && <Loading />}

    
      {error && <Error errMessage={error} />}

      {/* Display doctor cards if there are appointments */}
      {!loading && !error && doctors.length > 0 &&(
        <div className={styles.booking_appointment}>
          {doctors.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}

    
      {!loading && !error && doctors.length === 0 && (
        <h2 className={styles.text_booking}>You did not book any doctor yet!</h2>
      )}
    </div>
  );
};

export default MyBooking;

