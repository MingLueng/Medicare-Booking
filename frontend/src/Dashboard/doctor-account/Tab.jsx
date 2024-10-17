import {useContext} from 'react';
import styles from '../../../src/Dashboard/doctor-account/dashboard.module.css';
import {Link,useNavigate} from 'react-router-dom';
import { authContext } from '../../context/authContext';
import {BiMenu} from 'react-icons/bi';
const Tab = ({tab,setTab}) => {

  const {dispatch} = useContext(authContext);
  const navigate = useNavigate();
  const handleLogout = ()=>{
    dispatch({type:'LOGOUT'});
    navigate('/');
  }
  return (
    <div>
      <span className="lg:hidden">
        <BiMenu className={styles.tab__scroll}></BiMenu>
      </span>
      <div className={styles.tab__overview}>
        <button onClick ={()=>setTab('overview')} className={`${tab === 'overview' ? styles.tab__indigo:''} : ${styles.tab__viewpoints} ${styles.tab__viewheaders}`}>Overview</button>
        <button onClick ={()=>setTab('appointments')} className={`${tab === 'appointments' ? styles.tab__indigo:''} : ${styles.tab__viewpoints} ${styles.tab__viewheaders}`}>Appointments</button>
        <button onClick ={()=>setTab('settings')} className={`${tab === 'settings' ? styles.tab__indigo:''} : ${styles.tab__viewpoints} ${styles.tab__viewheaders}`}>Profile</button>
        <div className={styles.myaccount_profile}>
            <button onClick={handleLogout} className={styles.myaccount_malisa}> 
              Logout
            </button>
            <button className={styles.myaccount_kepper}> 
              Delete account
            </button>
        </div>
      </div>
      
    </div>
  )
}

export default Tab;
