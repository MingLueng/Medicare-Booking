import {useState,useEffect} from 'react';
import styles from '../../Dashboard/user-account/Profile.module.css';
import {Link,useNavigate} from 'react-router-dom';
import {BASE_URL,token} from '../../config';
import uploadImageToCloudinary from '../../../src/utils/uploadCloudinary';
import {toast} from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Profile = ({user}) => {
  //const[dt, setData] = useState([]);
  const [selectedFile,setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData ] = useState({
    name:'',
    email:'',
    password:'',
    photo:null,
    gender:'',
    role:'patient',
    bloodType:''
  });

  const navigate = useNavigate();

  useEffect(()=>{
    setFormData({
      name:user.name,
      email:user.email,
      password:user.password,
      photo:user.photo,
      gender:user.gender,
      role:user.role,
      bloodType:user.bloodType
    });
  },[user]);
  const handleInputChange = e =>{
    debugger
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleFileInputChange = async(event) =>{
    const file = event.target.files[0];
    if(!file){
      toast.error('Please select a file');
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

  const submitHandler = async (event) =>{
    debugger
      event.preventDefault();
      setLoading(true); // Đặt trạng thái "loading" thành true, có thể để hiển 
      //thị spinner hoặc thông báo người dùng chờ đợi.
      if (!formData.photo) {
        toast.error("Please upload a profile picture.");
        setLoading(false);
        return;
      }
      try {
        // Gửi yêu cầu HTTP POST tới URL đăng ký
        const res = await fetch(`${BASE_URL}/users/${user._id}`,{
          method:'put',
          headers:{
            // Định dạng dữ liệu gửi đi là JSON.
            'Content-Type':'application/json',
            Authorization:`Bearer ${token}`
          
          },
          body:JSON.stringify(formData) // Chuyển đổi dữ liệu form từ object sang chuỗi JSON.
        })
        const {message} = await res.json();  // Chuyển đổi phản hồi nhận được từ server sang JSON.
        // Kiểm tra nếu phản hồi không thành công (res.ok === false), ném lỗi.
        if(!res.ok){
          throw new Error(message); // Nếu yêu cầu không thành công, ném ra lỗi với nội dung message.
        }
        //setData(message.dt);
        setLoading(false);  // Đặt trạng thái "loading" thành false khi quá trình đăng ký hoàn tất.
        toast.success(message); // Hiển thị thông báo thành công sử dụng toast.

        navigate('/users/profile/me');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
  }
return (
<div className={styles.login_allform}>
    <form onSubmit={submitHandler}>
              <div className={styles.login__terrible}>
                <input
                  type="text" 
                  placeholder='Full Name' 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.login__email}
                  required
                  />
              </div>
              <div className={styles.login__terrible}>
                <input
                  type="email" 
                  placeholder='Enter your email' 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.login__email}
                  aria-readonly
                  readOnly
                  />
              </div>
              <div className={styles.login__terrible}>
                <input
                  type="password" 
                  placeholder='Password' 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={styles.login__email}
                 
                  />
              </div>
              <div className={styles.login__terrible}>
                <input
                  type="text" 
                  placeholder='Blood Type' 
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className={styles.login__email}
                  required
                  />
              </div>
              <div className={styles.sign__terrible}>
                
                <label className={styles.sign__agw}>
                  Gender:
                  <select name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={styles.sign__general}>
                    <option value="-1">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </label>
              </div>
              <div className={styles.sign__benford}>
                  {formData.photo && <figure className={styles.sign__plymouth}>
                    <img src={formData.photo} alt="" className={styles.avatar__caption}/>
                  </figure>}
                  <div className={styles.login__files}>
                      <input
                        type="file" 
                        name="photo"
                        id="customFile"
                        accept=".jpg,.png"
                        onChange={handleFileInputChange}
                        className={styles.sign__upload}
                        />
                        <label htmlFor="customFile"
                        className={styles.customFile__upload}>
                            {selectedFile ? selectedFile.name : "Upload Photo"
                            }
                        </label>
                    </div>
                </div>
                <div className={styles.login_submit}>
                <button disabled={loading} type="submit" className={styles.login__obtain}>
                  {loading ? <HashLoader size={35} color="#ffffff" /> : 'Update'}
                </button>
                </div>
               
              </form>
    </div>
  )
}

export default Profile
