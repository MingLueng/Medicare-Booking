import {useState,useContext} from 'react';
import styles from '../../src/css/main.module.css';
import {Link,useNavigate} from 'react-router-dom';
import {BASE_URL} from '../config';
import {toast} from 'react-toastify';
import {authContext} from '../context/authContext.jsx';
import HashLoader from 'react-spinners/HashLoader.js';

const Login = () => {
  const [formData, setFormData ] = useState({
    email:'',
    password:''
  });
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {dispatch} = useContext(authContext);
  const handleInputChange =(e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }


  const submitHandler = async (event) =>{
    debugger
      event.preventDefault();
      setLoading(true); // Đặt trạng thái "loading" thành true, có thể để hiển 
      //thị spinner hoặc thông báo người dùng chờ đợi.

      try {
        // Gửi yêu cầu HTTP POST tới URL đăng ký
        const res = await fetch(`${BASE_URL}/auth/login`,{
          method:'post',
          headers:{
            'Content-Type':'application/json' // Định dạng dữ liệu gửi đi là JSON.
          },
          body:JSON.stringify(formData) // Chuyển đổi dữ liệu form từ object sang chuỗi JSON.
        })
        const result = await res.json();  // Chuyển đổi phản hồi nhận được từ server sang JSON.
        // Kiểm tra nếu phản hồi không thành công (res.ok === false), ném lỗi.
        if(!res.ok){
          throw new Error(result.message); // Nếu yêu cầu không thành công, ném ra lỗi với nội dung message.
        }


        dispatch({
          type:"LOGIN_SUCCESS",
          payload:{
            user:result.data,
            token:result.token,
            role:result.role,
          }
          
        })
        //console.log(result,"login data")
        setLoading(false);  // Đặt trạng thái "loading" thành false khi quá trình đăng ký hoàn tất.
        toast.success(result.message); // Hiển thị thông báo thành công sử dụng toast.

        navigate('/home');
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
  }
  return (
    <div>
      <section className={styles.login__kaspershy}>
        <div className={styles.login__container}>
          <h3 className={styles.login__caster}>
            Hello! <span className={styles.login__phonexios}>Welcome</span>Back
          </h3>
          <form className={styles.login__form} onSubmit={submitHandler}>
            <div className={styles.login__terrible}>
               <input
                type="email" 
                placeholder='Enter Your Email' 
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
                placeholder='Enter Your Password' 
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.login__email}
                required
                />

            </div>
            <div className={styles.login_submit}>
              <button type="submit" className={styles.login__obtain}>
                {loading ? <HashLoader size={25} color='#fff' /> : 'Login'}
              </button>
            </div>
            <p className={styles.login__register}>
              Don&apos;t have an account?{" "}
              <Link to="/register" className={styles.login__link}>
              Register
              </Link>
            </p>
          </form>
        </div>

      </section>
    </div>
  )
}

export default Login;
