import {useState} from 'react';
import styles from '../../../src/Dashboard/doctor-account/dashboard.module.css';
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';
import starIcon from '../../assets/images/Star.png';
import Tabs from './Tab';
import DoctorAbout from '../../pages/Doctors/DoctorAbout';
import Profile from '../../Dashboard/doctor-account/Profile';
import Appointment from'../../Dashboard/doctor-account/Appointment';
const Dashboard = () => {
  debugger
  const {data,loading,error} = useGetProfile(`${BASE_URL}/doctors/profile/me`);
  const [tab,setTab] = useState('overview');
  return (
    <section>
    <div className={styles.dashboard__container}>
        {loading && !error && <Loader/>}

        {!loading && error && <Error/>} 

        {!loading && !error && (<div className={styles.dashboard__treatment}>
              <Tabs tab={tab} setTab = {setTab}  />
              <div className={styles.dashboard__fildesk}>
                  {data.isApproved === "pending" && (
                    <div className={styles.acrift__approved}>
                      <svg
                      aria-hidden="true"
                      className={styles.svg__viewBox}
                      fill ="currentColor"
                      viewBox='0 0 20 20'
                      xmlns="http://www.w3.org/2000/svg"
                      >
                      <path 
                        fillRule='evenodd'
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRute='evenodd'
                      ></path>
                      </svg>
                      <span className='sr-only'>Info</span>
                      <div className={styles.text__seed}>
                        To get approval please complete your profile. 
                        We&apos;ll review manually and approve within 3 days. 
                      </div>
                    </div>
                  )} 

                  <div className={styles.desc__overtime}>
                    {tab === 'overview' && (
                    <div>
                      <div className={styles.ds_overview}>
                        <figure className={styles.figure__view} >
                          <img src={data.photo} alt="" className={styles.avatar__view}/>
                        </figure>
                        <div>
                              <span className={styles.rs__spec}>
                              {data.specialization}
                              </span>
                              <h3 className={styles.kp_context}>{data.name}</h3>
                            <div className={styles.rp_concept}>
                                  <span className={styles.ranking__star}>
                                    <img src={starIcon} alt=""/>
                                    {data.averageRating}
                                  </span>
                                  <span className={styles.review__ass}> 
                                    {data.totalRating}
                                  </span>
                            </div>
                          <p className={styles.doctor__paratext}>{data.bio}</p>
                        </div>
                      </div>
                      <DoctorAbout doctor={data}/>
                    </div>
                    )}
                     {tab === 'appointments' && <Appointment appointments={data.appointments} />}
                     {tab === 'settings' && <Profile doctorData={data} /> }
                  </div>
              </div>
          </div>
        )}
    </div>
    </section>
  );
};

export default Dashboard;
