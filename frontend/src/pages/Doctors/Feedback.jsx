import React, { useState} from 'react';
import styles from '../Doctors/DoctorDetails.module.css';
import avatar from '../../assets/images/avatar-icon.png';
import { formatDate } from '../../utils/formateDate';
import { AiFillStar} from 'react-icons/ai';
import FeedbackForm from './FeedbackForm';
const Feedback = ({reviews,totalRating}) => {
  const [showFeedbackForm, setshowFeedbackForm] = useState(false);
  return ( 
    <div>
      <div className={styles.feedback__caseoul}>
        <h4 className={styles.all_reviewer}>
            All reviews ({totalRating})
        </h4>
        {reviews?.map((item,index)=>(<div className={styles.content__mart}>
            <div key={index} className={styles.wrap__mart}>
              <figure className={styles.little_view}>
                <img className={styles.feedback__image} src={item?.user?.photo} alt="" />
              </figure>
                <div>
              <h5 className={styles.panel__storm}>
              {item?.user?.name}
                </h5>
                <p className={styles.otawa__datetime}>
                    {formatDate(item?.createdAt)}
                </p>
                <p className={styles.text__para}>
                  {item.reviewText}
                </p>
                </div>
            </div>
            <div className={styles.feedback__ranking}>
              {[...Array(item?.rating).keys()].map((_, index) => (//sử dụng cú pháp spread (...) để chuyển mảng này thành một mảng chứa 5
                <AiFillStar key={index} className={styles.over__star} />
              ))}

            </div>
          
    </div>))}
</div>
{!showFeedbackForm && (
        <div className={styles.central}>
          <button className={styles.btn__recording} onClick={() => setshowFeedbackForm(true)}>
            Give Feedback
          </button>
        </div>
      )}
{showFeedbackForm && <FeedbackForm/>}
</div>

    );
  };
  
  export default Feedback;