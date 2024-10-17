import React from 'react';
//import {doctors} from '../../assets/data/doctors';
import styles from '../Doctors/Doctor.module.css';
import DoctorCard from './DoctorCard';
import useFetchData from "../../hooks/useFetchData";
import {BASE_URL} from '../../config';
import Loading  from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
const DoctorList = () => {

  const {data:doctors,loading,error} = useFetchData(`${BASE_URL}/doctors`)
  debugger
  return (
    <> 
    {loading && <Loading/>}
    {error && <Error/>}
    {!loading && !error && doctors.length > 0 &&
      <div className={styles.list__doctor}>
       {doctors.map(doctor => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))
       }
    </div>
    }
    </>
  );
};


export default DoctorList;
