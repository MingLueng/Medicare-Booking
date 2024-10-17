import {useState} from 'react';
import styles from '../../src/css/main.module.css';
import signupImg from '../assets/images/signup.gif';
// import avatar from '../assets/images/doctor-img01.png';
import {Link,useNavigate} from 'react-router-dom';
import {BASE_URL} from '../config';
import uploadImageToCloudinary from '../utils/uploadCloudinary';
import {toast} from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const Signup = () => {
  const [selectedFile,setSelectedFile] = useState(null);
  const [previewURL,setPreviewURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData ] = useState({
    name:'',
    email:'',
    password:'',
    photo:selectedFile,
    gender:'',
    role:'patient',
  });

  const navigate = useNavigate();

  const handleInputChange = e =>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleFileInputChange = async(event) =>{
    const file = event.target.files[0];
    if(!file){
      toast.error('Please select a file');
    } 
    try {
      const data = await uploadImageToCloudinary(file);
      setPreviewURL(data.url);
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
        const res = await fetch(`${BASE_URL}/auth/register`,{
          method:'post',
          headers:{
            'Content-Type':'application/json' // Định dạng dữ liệu gửi đi là JSON.
          },
          body:JSON.stringify(formData) // Chuyển đổi dữ liệu form từ object sang chuỗi JSON.
        })
        const {message} = await res.json();  // Chuyển đổi phản hồi nhận được từ server sang JSON.
        // Kiểm tra nếu phản hồi không thành công (res.ok === false), ném lỗi.
        if(!res.ok){
          throw new Error(message); // Nếu yêu cầu không thành công, ném ra lỗi với nội dung message.
        }
        setLoading(false);  // Đặt trạng thái "loading" thành false khi quá trình đăng ký hoàn tất.
        toast.success(message); // Hiển thị thông báo thành công sử dụng toast.

        navigate('/login');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
  }
  return (
    <div>
      <section className={styles.sign__container}>
              <div className={styles.sign__leopard}>
                <div className={styles.sign__item}>
                  <div className={styles.sign__box}>
                    <figure className={styles.sign__figure}>
                      <img src={signupImg} alt="" className={styles.sign__img}/>
                    </figure>
                  </div>
                  <div className={styles.sign__form}>
                    <h3 className={styles.sign__hittle}>
                        Create an <span className={styles.sign__account}>account</span>
                    </h3>
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
                        required
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
                        required
                        />
                    </div>
                    <div className={styles.sign__terrible}>
                      <label className={styles.sign__agw}>
                        Are you a:
                        <select 
                        name="role" 
                        value={formData.role}
                        onChange={handleInputChange}
                        className={styles.sign__general}>
                          <option value="patient">Patient</option>
                          <option value="doctor">Doctor</option>
                        </select>
                      </label>
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
                       {selectedFile && <figure className={styles.sign__plymouth}>
                          <img src={previewURL} alt="" className={styles.avatar__caption}/>
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
                      <div className={styles.login_submit}>
                      <button disabled={loading} type="submit" className={styles.login__obtain}>
                        {loading ? <HashLoader size={35} color="#ffffff" /> : 'Sign Up'}
                      </button>
                      </div>
                      <p className={styles.login__register}>
                        Already have an account?
                        <Link to="/login" className={styles.login__link}>
                        Login
                        </Link>
                        
                      </p>
                    </form>
                  </div>
                </div>
              </div>
      </section>
    </div>
  )
}

export default Signup;
