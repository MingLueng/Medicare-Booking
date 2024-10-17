import {useState,useEffect} from 'react';
import styles from '../../../src/Dashboard/doctor-account/dashboard.module.css';
import {toast} from 'react-toastify';
import uploadImageToCloudinary from '../../../src/utils/uploadCloudinary';
import {BASE_URL,token} from '../../config';
import {AiOutlineDelete} from 'react-icons/ai';
import {Link,useNavigate} from 'react-router-dom';
const Profile = ({doctorData}) => {
    const [formData, setFormData ] = useState({
        name:'',
        email:'',
        phone:'',
        bio:'',
        gender:'',
        specialization:'',
        ticketPrice:0,
        qualifications:[{startingDate:"",endingDate:"", degree:"", university:""},],
        experiences:[{startingDate:"",endingDate:"", position:"", hospital:""},],
        timeSlots:[{day:"",startingTime:"",endingTime:""},],
        about:"",
        photo:null,
      });
      const navigate = useNavigate();

      useEffect(()=>{
        setFormData({name:doctorData?.name,
          email:doctorData?.email,
          phone:doctorData?.phone,
          bio:doctorData?.bio,
          gender:doctorData?.gender,
          specialization:doctorData?.specialization,
          ticketPrice:doctorData?.ticketPrice,
          qualifications:doctorData?.qualifications,
          experiences:doctorData?.experiences,
          timeSlots:doctorData?.timeSlots,
          about:doctorData?.about,
          photo:doctorData?.photo,
        });
      },[doctorData]);
      const [selectedFile,setSelectedFile] = useState(null);
      const [loading, setLoading] = useState(false);

      
      const handleInputChange = e =>{
  
        setFormData({...formData,[e.target.name]:e.target.value});
      };

      const handleFileInputChange = async (event) =>{
            const file = event.target.files[0];
            if(!file){
              toast.error("Failed to upload image.");
            }
            try {
              const data = await uploadImageToCloudinary(file);
              setSelectedFile(data.url);
              setFormData({...formData,photo:data.url});
              toast.success("Image uploaded successfully");
            } 
            catch (error) 
            {
              toast.error("Failed to upload image.");
            }

      };
      const updateProfileHandler = async e =>{
        e.preventDefault();
        setLoading(true);
        if(!formData.photo){
          toast.error("Please upload a profile picture.");
          setLoading(false);
          return; 
        }
        try {
          const res = await fetch (`${BASE_URL}/doctors/${doctorData._id}`,{
              method:'put',
              headers:{
                'Content-Type':'application/json',
                 Authorization:`Bearer ${token}`
              },
              body:JSON.stringify(formData) 
          })
          const {message} = await res.json();  // Chuyển đổi phản hồi nhận được từ server sang JSON.
          // Kiểm tra nếu phản hồi không thành công (res.ok === false), ném lỗi.
          if(!res.ok){
            throw new Error(message); // Nếu yêu cầu không thành công, ném ra lỗi với nội dung message.
          }
          //setData(message.dt);
          setLoading(false);  // Đặt trạng thái "loading" thành false khi quá trình đăng ký hoàn tất.
          toast.success(message); // Hiển thị thông báo thành công sử dụng toast.
  
          navigate('/doctors/profile/me');
        } catch (error) {
          toast.error(error.message);
          setLoading(false);
        }

      };
      //key: Tên của trường dữ liệu (ví dụ: qualifications, experiences).
      //item: Là đối tượng mới được thêm vào mảng dữ liệu (ví dụ: một bằng cấp mới trong qualifications).
      //reusable function for adding item
      const addItem = (key, item) =>{
          setFormData(prevFormData =>({
            ...prevFormData,[key]:[...prevFormData[key], item]}))
      };
      //reusable input change function
      const handleReusableInputChangeFunc=(key,index,event)=>{

            const {name, value} = event.target;
            setFormData(prevFormData=>{
              const updateItems = [...prevFormData[key]]
              updateItems[index][name] = value
              //prevFormData[key]: Lấy mảng tương ứng với key (ví dụ: qualifications).
              //updateItems[item][name] = value: Cập nhật mục tại vị trí 
              //item trong mảng, thay đổi trường có
              //tên là name thành giá trị mới value. 
              return{
                ...prevFormData,
                [key]:updateItems
              }
            })

      }
      //reusable function for deleting item
      const deleteItem = (key,index)=> {
        setFormData(prevFormData => ({...prevFormData,[key]:prevFormData[key].filter((_,i)=> i !== index)}))
      }
      const addQualification = (e) =>{
        e.preventDefault();

        addItem("qualifications", {
            startingDate:"",
            endingDate:"",
            degree:"",
            university:""
        });
      }

      const handleQualificationChange = (event, index) =>{
        handleReusableInputChangeFunc("qualifications",index,event);
      }
      const deleteQualification = (e,index) =>{
        e.preventDefault();
        deleteItem("qualifications",index);
      };
      
      const addExperience = (e) =>{
        e.preventDefault();

        addItem("experiences", {
            startingDate:"",
            endingDate:"",
            position:"",
            hospital:""
        });

        
      }

      const handleExperienceChange = (event, index) =>{
        handleReusableInputChangeFunc("experiences",index,event);
      }
      const deleteExperience = (e,index) =>{
        e.preventDefault();
        deleteItem("experiences",index);
      };

      const addTimeSlots = (e) =>{
        e.preventDefault();

        addItem("timeSlots", {
            day:"",
            startingTime:"",
            endingTime:"",
        });
        
      }

      const handleTimeSlotsChange = (event, index) =>{
        handleReusableInputChangeFunc("timeSlots",index,event);
      }
      const deleteTimeSlots = (e,index) =>{
        e.preventDefault();
        deleteItem("timeSlots",index);
      };
  return (
    <div>
      <h2 className={styles.profile__container}>Profile Informations</h2>
      <form onSubmit={updateProfileHandler}>
        <div className={styles.profile__form}>
            <p className={styles.form__label}>Name*</p>
            <input type="text" name="name" 
                value={formData.name} 
                onChange={handleInputChange}
                placeholder='Full Name'
                className={styles.form__input} />
        </div>
        <div className={styles.profile__form}>
            <p className={styles.form__label}>Email*</p>
            <input type="email" name="email" 
                value={formData.email} 
                onChange={handleInputChange}
                placeholder='Email'
                className={styles.form__input}
                readOnly
                aria-readonly
                disabled='true'/>
        </div>
        <div className={styles.profile__form}>
            <p className={styles.form__label}>Phone*</p>
            <input type="number" name="phone" 
                value={formData.phone} 
                onChange={handleInputChange}
                placeholder='Phone number'
                className={styles.form__input} />
        </div>
        <div className={styles.profile__form}>
            <p className={styles.form__label}>Bio*</p>
            <input type="text" name="bio" 
                value={formData.bio} 
                onChange={handleInputChange}
                placeholder='Bio'
                className={styles.form__input}
                maxLength={100} />
        </div>
        <div className={styles.profile__form}>
             <div className={styles.profile__gender}>
                <div>
                    <p className={styles.form__label}>Gender*</p>
                    <select name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={styles.form__input}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                    <p className={styles.form__label}>Specialization*</p>
                    <select name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className={styles.form__input}>
                    <option value="">Select</option>
                    <option value="surgeon">Surgeon</option>
                    <option value="neurologist">Neurologist</option>
                    <option value="dermatologist">Dermatologist</option>
                  </select>
                </div>
                <div className={styles.profile__form}>
                    <p className={styles.form__label}>Ticket Price*</p>
                    <input type="number" name="ticketPrice" 
                        value={formData.ticketPrice} 
                        onChange={handleInputChange}
                        className={styles.form__input}
                        placeholder="100" />
                </div>
             </div>   
        </div>
        <div className={styles.profile__form}>
        <p className={styles.form__label}>Qualifications*</p> 
        {formData.qualifications?.map((item, index)=> (
        <div key={index}>
            <div>
                <div className={styles.profile__date}>
                    <div>
                    <p className={styles.form__label}>Starting Date*</p>
                    <input 
                    type="date" 
                    onChange={e => handleQualificationChange(e, index)}
                    name="startingDate" 
                    value={item.startingDate}
                    className={styles.form__input} />
                    </div>
                    <div>
                    <p className={styles.form__label}>Ending Date*</p>
                    <input type="date" 
                    name="endingDate" 
                    onChange={e => handleQualificationChange(e, index)}
                    value={item.endingDate}
                    className={styles.form__input} />
                    </div>
                </div>
                <div className={styles.profile__date}>
                    <div>
                    <p className={styles.form__label}>Degree*</p>
                    <input 
                    type="text"
                    placeholder='Degree'
                    onChange={e => handleQualificationChange(e, index)}
                    name="degree" 
                    value={item.degree}
                    className={styles.form__input} />
                    </div>
                    <div>
                    <p className={styles.form__label}>University*</p>
                    <input type="text" 
                    placeholder='University'
                    onChange={e => handleQualificationChange(e, index)}
                    name="university" 
                    value={item.university}
                    className={styles.form__input} />
                    </div>
                </div>
                <button onClick={e => deleteQualification(e, index)} className={styles.profile__del}>
                  <AiOutlineDelete />
                </button>
                </div>
              </div>
                ))}
                <button onClick={e => addQualification(e)} className={styles.profile__smlgr}>
                  Add Qualification
                </button>
        </div>
        <div className={styles.profile__form}>
        <p className={styles.form__label}>Experences*</p> 
        {formData.experiences?.map((item, index)=> (
        <div key={index}>
            <div>
                <div className={styles.profile__date}>
                    <div>
                    <p className={styles.form__label}>Starting Date*</p>
                    <input 
                    type="date" 
                    name="startingDate" 
                    onChange={e => handleExperienceChange(e, index)}
                    value={item.startingDate}
                    className={styles.form__input} />
                    </div>
                    <div>
                    <p className={styles.form__label}>Ending Date*</p>
                    <input type="date" 
                    name="endingDate" 
                    onChange={e => handleExperienceChange(e, index)}
                    value={item.endingDate}
                    className={styles.form__input} />
                    </div>
                </div>
                <div className={styles.profile__date}>
                    <div>
                    <p className={styles.form__label}>Position*</p>
                    <input 
                    type="text"
                    placeholder='Position'
                    name="position" 
                    onChange={e => handleExperienceChange(e, index)}
                    value={item.position}
                    className={styles.form__input} />
                    </div>
                    <div>
                    <p className={styles.form__label}>Hospital*</p>
                    <input type="text" 
                    placeholder='Hospital'
                    name="hospital" 
                    onChange={e => handleExperienceChange(e, index)}
                    value={item.hospital}
                    className={styles.form__input} />
                    </div>
                </div>
                <button onClick={e => deleteExperience(e, index)} className={styles.profile__del}>
                  <AiOutlineDelete />
                </button>
                </div>
              </div>
                ))}
                <button onClick={e => addExperience(e)} className={styles.profile__smlgr}>
                  Add Experences
                </button>
        </div>
        <div className={styles.profile__form}>
        <p className={styles.form__label}>Time Slots*</p> 
        {formData.timeSlots?.map((item, index)=> (
        <div key={index}>
            <div>
                <div className={styles.profile__slots}>
                    <div>
                    <p className={styles.form__label}>Day*</p>
                      <select name="day"
                            value={item.day}
                            onChange={e => handleTimeSlotsChange(e, index)}
                            className={styles.form__input}>
                        <option value="">Select</option>
                        <option value="saturday">Saturday</option>
                        <option value="sunday">Sunday</option>
                        <option value="monday">Monday</option>
                        <option value="tuesday">Tuesday</option>
                        <option value="wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="friday">Friday</option>
                      </select>
                    </div>
                    <div>
                    <p className={styles.form__label}>Starting Time*</p>
                    <input type="time" 
                    name="startingTime" 
                    onChange={e => handleTimeSlotsChange(e, index)}
                    value={item.startingTime}
                    className={styles.form__input} />
                    </div>
                    <div>
                    <p className={styles.form__label}>Endting Time*</p>
                    <input type="time" 
                    name="endingTime" 
                    onChange={e => handleTimeSlotsChange(e, index)}
                    value={item.endingTime}
                    className={styles.form__input} />
                    </div>
                    <div className={styles.button__line}>
                    <button onClick={e => deleteTimeSlots(e, index)} className={styles.profile__del}>
                    <AiOutlineDelete />
                    </button> 
                    </div>
                </div>
        
               
                </div>
              </div>
                ))}
                <button onClick={e => addTimeSlots(e)} className={styles.profile__smlgr}>
                  Add TimeSlots
                </button>
      </div>
      <div className={styles.profile__form}>
        <p className={styles.form__label}>
            About*      
        </p>
        <textarea name="about" 
        rows ={5} 
        value={formData.about} 
        placeholder="Write about you" 
        onChange={handleInputChange} 
        className={styles.form__input}>  
        </textarea>
      </div>
      <div className={styles.profile__form_pk}>
      {formData.photo && <figure className={styles.sign__plymouth}>
            <img src={formData.photo} alt="" className={styles.avatar__caption}/>
          </figure>}
          <div className={styles.login__files}>
              <input
                type="file" 
                name="photo"
                id="customFile"
                accept=".jpg, .png"
                onChange={handleFileInputChange}
                className={styles.sign__upload}
                />
                <label htmlFor="customFile"
                className={styles.customFile__upload}>
                    Upload Photo
                </label>
            </div>
      </div>
      <div onClick ={updateProfileHandler} className={styles.profile__quanlium}>Update Profile</div>
      </form>
    </div>
  )
}

export default Profile;
