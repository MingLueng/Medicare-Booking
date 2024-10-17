import React, { useState} from 'react';
//import doctorImg from '../../assets/images/doctor-img02.png';
import styles from '../Doctors/DoctorDetails.module.css';
import starIcon from '../../assets/images/Star.png';
import DoctorAbout from "./DoctorAbout";
import Feedback from './Feedback';
import { useParams } from 'react-router-dom';
import SidePanel from './SidePanel';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import Loading  from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
const DoctorDetail = () => {
  debugger
  const [tab,setTab] = useState('about');

  //để truy cập các tham số từ URL trong một component. 
  //Nó trả về một đối tượng chứa các cặp key: value, 
  //nơi mỗi key tương ứng với một tên tham số mà bạn đã định 
  //nghĩa trong cấu hình route, và value là giá trị thực tế của 
  //tham số trong URL.
  const {id} = useParams();
  const {data:doctors,loading,error} = useFetchData(`${BASE_URL}/doctors/${id}`);
  const {
    name,
    qualifications,
    experiences,
    timeSlots,
    reviews,
    bio,
    about,
    averageRating,
    totalRating,
    specialization,
    ticketPrice,
    photo
  } = doctors;
  return (
    <section>
      <div className={styles.doctor__castle}>
      {loading && <Loading/>}
      {error && <Error/>}
      {!loading && !error &&(
        <div className={styles.doctor__wrapper}>
          <div className={styles.doctor__gratitude}>
            <div className={styles.doctor__item}>
              <figure className={styles.doctor__imgcast}>
                <img src={photo} alt ="" className={styles.filming}/>
              </figure>
              <div>
                  <span className={styles.jerk__title}>
                     {specialization}
                  </span>
                  <h3 className={styles.jerk__subtitle}>
                    {name}
                  </h3>
                  <div className={styles.jerk__league}>
                      <span className={styles.jerk__ranking}>
                        <img src={starIcon} alt="" /> {averageRating}
                      </span>
                      <span className={styles.jerk__lender}>({totalRating})</span>
                  </div>
                  <p className={styles.jerk__caption}>
                    {bio}
                  </p>
              </div>
            </div>
            <div className={styles.safety__name}>
            <button
                onClick={() => setTab('about')}
                className={`${tab === 'about' ? styles.safety__btn_tab : ''} ${styles.safety__btn} `}
              >
                About
              </button>
              <button
                onClick={() => setTab('feedback')}
                className={`${tab === 'feedback' ? styles.safety__btn_tab : ''} ${styles.safety__btn}`}
              >
                Feedback
              </button>
            </div>
            <div className={styles.safety__tabpage}>
              {
                tab ==='about' && <DoctorAbout doctor={doctors} />
              }
              {
                tab ==='feedback' && <Feedback reviews ={reviews} totalRating={totalRating}/>
              }
            </div>            
          </div>
          <div>
          <SidePanel doctorId={doctors._id} ticketPrice={ticketPrice} timeSlots ={timeSlots}/>
        </div>
        
        </div>
      )}
      </div>
    </section>
  )
}

export default DoctorDetail;
