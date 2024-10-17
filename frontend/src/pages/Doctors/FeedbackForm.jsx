import React,{useState} from 'react';
import styles from '../Doctors/DoctorDetails.module.css';
import { AiFillStar} from "react-icons/ai";
import {BASE_URL,token} from '../../config';
import {toast} from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { useParams } from 'react-router-dom';

const FeedbackForm = () => {
  const [rating, setRating] = useState(false);
  const [hover, setHover] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const {id} = useParams();

 const handleSubmitReview = async e => {
  e.preventDefault();
  setLoading(true);
  try {
    if(!rating || !reviewText){
      setLoading(false);
     return toast.error("Rating & Review field are required");
    }
      const res = await fetch(`${BASE_URL}/doctors/${id}/reviews/`,{
        method:'post',
        headers:{
          'Content-Type':'application/json', // Định dạng dữ liệu gửi đi là JSON.
          Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({rating,reviewText}) // Chuyển đổi dữ liệu form từ object sang chuỗi JSON.
      })
      const {message} = await res.json();  // Chuyển đổi phản hồi nhận được từ server sang JSON.
      // Kiểm tra nếu phản hồi không thành công (res.ok === false), ném lỗi.
      if(!res.ok){
        throw new Error(message); // Nếu yêu cầu không thành công, ném ra lỗi với nội dung message.
      }
      setLoading(false);  // Đặt trạng thái "loading" thành false khi quá trình đăng ký hoàn tất.
      toast.success(message); // Hiển thị thông báo thành công sử dụng toast.

      
    }
   catch (error) {
    toast.error(error.message);
    setLoading(false);
  }
 }

  const starButtons = [];
  for (let index = 1; index <= 5; index ++) {
    starButtons.push(
      <button
        key={index}
        type="button"
        className={`${index<= (hover || rating) ? styles.textYellow : styles.textGray} ${styles.starButton}`}
        onClick={() => setRating(index)}
        onMouseEnter={() => setHover(index)}
        onMouseLeave={() => setHover(rating)}>
        <span>
          <AiFillStar />
        </span>
      </button>
    );
  }
  return (
    <form action=''>
      <div>
      <h3 className={styles.headingform}>How would you rate the overall experience?*</h3>
      <div>
       {starButtons}
      </div>
    </div>
    <div className={styles.feedback__southernwal}>
      <h3 className={styles.headingform}>
        Share your feedback or suggestions*
      </h3>
      <textarea name="" id="" cols="30" rows= "10" placeholder="Write your message" className={styles.feedback__contributes} onChange ={e => setReviewText(e.target.value)}>
     
      </textarea>
    </div> 
    <button type="submit" className={styles.btn__recording} onClick={handleSubmitReview}>
    {loading ? <HashLoader size={35} color="#ffffff" /> : 'Submit Feedback'}
    </button>
    </form>
   
  )
}

export default FeedbackForm;
