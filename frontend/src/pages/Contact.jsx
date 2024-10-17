import React from 'react';
import styles from '../../src/css/main.module.css';

const Contact = () => {
  return (
    <div>
      <section>
          <div className={styles.contact__container}>
              <h2 className={styles.contact__larger}>Contact Us</h2>
              <p className={styles.contact__subtitle}>
                Got a technical issue? Want to send feedback about a beta feature? Let us know.
              </p>
              <form action="#" className={styles.space__form}>
                  <div>
                    <label htmlFor="email" className={styles.form__label}>
                      Your Email
                    </label>
                    <input
                        type="email" 
                        id="email"
                        placeholder="example@gmail.com"
                        className={styles.form__input__00}
                        />
                  </div>
                  <div>
                    <label htmlFor="subject" className={styles.form__label}>
                      Subject
                    </label>
                    <input
                        type="subject" 
                        id="subject"
                        placeholder="Let us know how we can help you"
                        className={styles.form__input__00}
                        />
                  </div>
                  <div className=''>
                    <label htmlFor="message" className={styles.form__label}>
                      Your Message
                    </label>
                    <textarea
                        rows='6'
                        type="message" 
                        id="message"
                        placeholder="Leave a comment...."
                        className={styles.form__input__00}
                        />
                  </div>
                  <button type="submit" className={styles.btn__confirmed}>Submit</button>
              </form>
          </div>
      </section>
    </div>
  )
}

export default Contact;
