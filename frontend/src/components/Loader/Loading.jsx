import HashLoader from 'react-spinners/HashLoader';
import styles from '../../components/Loader/Loading.module.css';
const Loading = () => {
  return (
    <div className={styles.loading__container}>
      <HashLoader color="#0067FF"/>
    </div>
  )
}

export default Loading
