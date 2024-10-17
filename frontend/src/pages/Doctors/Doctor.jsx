import {useState,useEffect} from 'react';
import DoctorCard from '../../components/Doctors/DoctorCard';
//import {doctors} from '../../assets/data/doctors';
import Testimonial from '../../components/Testimonial/Testimonial';
import btnStyles from '../Doctors/DoctorDetails.module.css';
import styles from '../Home/Home.module.css';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Loading  from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
const Doctor = () => {
const [query, setQuery] = useState('');
const [debounceQuery,setDebounceQuery] = useState('');
const handleSearch=()=>{
  setQuery(query.trim());
}
useEffect(()=>{
  const timeout = setTimeout(()=>{
  setDebounceQuery(query)},700);
    
  return () =>clearTimeout(timeout)
}, [query]);

  const {data:doctors, loading,error} = useFetchData(`${BASE_URL}/doctors?query=${debounceQuery}`);
  return (
    <>
       <section className={btnStyles.doctor__details}>
      <div className={btnStyles.container}>
        <h2 className={btnStyles.heading}>
          Find a Doctor
        </h2>
        <div className={btnStyles.doctor__search}>
          <input type="search" className={btnStyles.search__input} 
          placeholder='Search doctor by name or specification'
          value={query}
          onChange ={e => setQuery(e.target.value)}/>
          <button className={btnStyles.attack__button }
          onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </section>
    <section>
        <div className={styles.container}>
        {loading && <Loading/>}
    {error && <Error/>}
    {!loading && !error && doctors.length > 0 &&
      <div className={styles.list__doctor}>
       {doctors.map(doctor => (
          <DoctorCard key={doctor._id} doctor={doctor} />
        ))
       }
    </div>}
        </div>
    </section>
    <section>
        <div className={styles.container}>
            <div className={styles.testimonial__package}>
            <h2 className={styles.patients__title}>Our medical services</h2>
                <p className={styles.text__patients}>
                World-class care for everyone. Our health System offers unmatched,
                                expert health care.
                </p>
            </div>
            <Testimonial />
        </div>
    </section>
    </>
   
  
  );
};

export default Doctor;
