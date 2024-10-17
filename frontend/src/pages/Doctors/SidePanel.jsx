import {useState,useEffect} from 'react';
import styles from '../Doctors/DoctorDetails.module.css';
import convertTime from '../../utils/convertTime';
import { BASE_URL,token } from '../../config';
import {toast} from 'react-toastify';
const SidePanel =({doctorId,ticketPrice,timeSlots}) => {
  const bookingHandler = async()=>{
    debugger
    try {
      const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
        method:'post',
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const data = await res.json();  // Chuyển đổi phản hồi nhận được từ server sang JSON.
      // Kiểm tra nếu phản hồi không thành công (res.ok === false), ném lỗi.
      if(!res.ok){
        throw new Error(data.message + 'Please try again'); // Nếu yêu cầu không thành công, ném ra lỗi với nội dung message.
      }
      if(data.session.url){
        window.location.href = data.session.url
      }
    } catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <div className={styles.panel__container}>
      <div className={styles.panel__item}>
        <p className={styles.text__para__sk}>Ticket Price</p>
        <span className={styles.price__stuck}>{ticketPrice}</span>
      </div>
      <div className={styles.panel__subtitle}>
        <p className={styles.text__para__px}>
          Available Time Slots:
        </p>
        <ul>
          {timeSlots?.map((item,index)=>(
            <li key={index}className={styles.panel__mixed}>
              <p className={styles.panel__skeppermize}>
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
              </p>
              <p className={styles.panel__skeppermize}>
                {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={()=>bookingHandler()}className={styles.btn__appointment}>Book Appointment</button>
    </div>
  )
}

export default SidePanel;
