import {useState,useContext, useEffect} from 'react';
import {token} from'../config';

const useFetchData = (url) => {
  debugger
    const[data, setData] = useState([]);
    const[loading, setLoading] = useState(false);
    const[error,setError] = useState(null);
   
    useEffect(()=>{
        const fetchData = async()=>{

          setLoading(true);

          try {
            const res = await fetch(url, {
              headers:{Authorization: `Bearer ${token}`}    
          });
          const result = await res.json()
          if(!res.ok){
            throw new Error(result.message); // Nếu yêu cầu không thành công, ném ra lỗi với nội dung message.

          }
          setData(result.data);
          setLoading(false);

          
          } catch (error) {
            setLoading(false);
            setError(error.message);
        
          }
               
        }
        fetchData() 
    },[url]);
  return {
    data,loading,error
  }
}

export default useFetchData
