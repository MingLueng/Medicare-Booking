
import styles from '../../components/Loader/Loading.module.css';
const Error = ({errMessage}) => {
  return (
    <div className={styles.loading__container}>
        <h3 className={styles.error__text}>{errMessage}</h3>
  </div>
  )
}

export default Error
