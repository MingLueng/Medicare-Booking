import {useState,useContext} from 'react';
import styles from '../../Dashboard/user-account/Myaccount.module.css';
import { authContext } from '../../context/authContext';
import MyBooking from './MyBooking';
import Profile from '../user-account/Profile.jsx';
import Loading  from '../../components/Loader/Loading';
import Error from '../../components/Error/Error';
import useGetProfile from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';

const Myaccount = () => {
debugger
  const {dispatch} = useContext(authContext);
  const [tab,setTab] = useState('bookings');

  const {data: userData,loading,error} = useGetProfile(`${BASE_URL}/users/profile/me`);
  //console.log(userData,"userdata");

  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'});
  }
  return (
    
    <section>
      <div className={styles.myaccount_spiner}>
      {loading && !error && <Loading/>}

      {error && !loading && <Error errMessage={error}/>}
        
        {!loading && !error && (
              <div className={styles.myaccount_container}>
              <div className={styles.myaccount_fillpew}>
                <div className={styles.myaccount_items}>
                    <figure className={styles.myaccount_img}>
                        <img src={userData?.photo} alt="" className={styles.myaccount_score} />
                    </figure>
  
                </div>
                <div className={styles.myaccount_capt}>
                <h3 className={styles.name_hash}>
                     {userData?.name}
                </h3>
                    <p className={styles.emailcast}>
                      {userData?.email}
                    </p>
                    <p className={styles.emailcast}>
                      Blood Type: <span className={styles.blood_type}>
                       {userData?.bloodType}
                      </span>
                    </p>
                </div>
                <div className={styles.myaccount_profile}>
                  <button onClick={handleLogout} className={styles.myaccount_malisa}> 
                    Logout
                  </button>
                  <button className={styles.myaccount_kepper}> 
                    Delete account
                  </button>
                </div>
              </div>
              <div className={styles.booking_ellipis}>
                <div>
                  <button onClick={()=> setTab('bookings')} 
                  className={`${tab === 'bookings' ? styles.empty_form : ''} ${styles.mybooking_form}`}>
                    My Bookings
                  </button>
                  <button onClick={()=> setTab('settings')} 
                  className={`${tab === 'settings' ? styles.empty_form : ''} ${styles.mybooking_form}`}>       
                    Profile Settings
                  </button>
                </div>
                {
                    tab ==='bookings' && <MyBooking />
                }
                {
                    tab ==='settings' && <Profile user={userData}/>
                }
              </div>
          </div>
            )
        }
    </div>
    </section>
  )
}

export default Myaccount

