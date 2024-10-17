import React from "react";
import styles from '../Home/Home.module.css';
import heroImg01 from '../../assets/images/hero-img01.png';
import heroImg02 from '../../assets/images/hero-img02.png';
import heroImg03 from '../../assets/images/hero-img03.png';
import icon01 from '../../assets/images/icon01.png';
import icon02 from '../../assets/images/icon02.png';
import icon03 from '../../assets/images/icon03.png';
import videoIcon from '../../assets/images/video-icon.png';
import {Link} from 'react-router-dom';
import avatarIcon from '../../assets/images/avatar-icon.png'
import features__img from '../../assets/images/feature-img.png';
import About from "../../components/About/About";
import { BsArrowRight } from 'react-icons/bs';
import faqImg from '../../assets/images/faq-img.png';
import ServicesList from "../../components/Services/ServicesList";
import DoctorList from "../../components/Doctors/DoctorList";
import FaqList from "../../components/Faq/FaqList";
import Testimonial from "../../components/Testimonial/Testimonial";
const Home =()=>{
    return (
    <div>
        <section className={styles.hero__section}>
            <div className={styles.container}>
                <div className={styles.flex_container}>
                <div>
                    <div className={styles.text_container}>
                        <h1 className={styles.heading}>
                        We help patients live healthy, longer life.   
                        </h1>
                        <p className={styles.text__para}>
                            Lorem ipsum dolor sit amet consectetur,
                            adipisicing elit. Natus quarat cumque fugit, perspiciatis 
                            cum nemo aperiam, aut quia earum amet architecto, modi odio. Soluta unde ducimus perferendis?
                        </p>
                        <button className ={styles.btn}>Request an Appointment</button>
                    </div>
                    <div className={styles.hero__counter}>
                        <div>
                            <h2 className={styles.hero__heading}>
                                    30+
                            </h2>
                            <span className={styles.yellow__heading}>

                            </span>
                            <p className={styles.text__para}>
                                Years of Experience
                            </p>
                        </div>
                        <div>
                            <h2 className={styles.hero__heading}>
                                    15+
                            </h2>
                            <span className={styles.purple__heading}>
                                
                            </span>
                            <p className={styles.text__para}>
                                Clinic Location
                            </p>
                        </div>
                        <div>
                            <h2 className={styles.hero__heading}>
                                    100%
                            </h2>
                            <span className={styles.irisBlue__heading}>

                            </span>
                            <p className={styles.text__para}>
                                Patient Satisfaction
                            </p>
                        </div>
                    </div>
                </div>
                <div className={styles.hero__items}>
                    <div>
                        <img className={styles.img_Width}src={heroImg01} alt="" />

                    </div>
                    <div className={styles.img_items}>
                        <img src={heroImg02} alt="" className={styles.img2_Width} />
                        <img src={heroImg03} alt="" className={styles.img3_Width} />
                    </div>
                </div>
                </div>
               
            </div>
        </section>
        <section>
            <div className={styles.container}>
                <div className={styles.patients__heading}>
                    <h2 className={styles.patients__title}>
                    Providing the best medical services
                    </h2>
                    <p className={styles.text__patients}>World-class care for everyone. 
                    Our health System offes unmatched, expert health care.</p>
                </div>
                <div className={styles.carosel_patients}>
                     <div className={styles.carosel_items}>
                        <div className={styles.img__items}>
                            <img src={icon01} alt="" />
                        </div>
                        <div className={styles.carosel_title}>
                           <h2 className={styles.leading_title}>Find a Doctor</h2> 
                           <p className={styles.carosel_desc}>
                                World-class care for everyone. Our health System offers unmatched, expert 
                                health care. From the lab to the clinic
                           </p>
                          <Link to='/doctors' className={styles.carosel_link}>
                          <BsArrowRight className={styles.group__carosel}/>
                          </Link>
                        </div>
                    </div> 
                    <div className={styles.carosel_items}>
                        <div className={styles.img__items}>
                            <img src={icon02} alt="" />
                        </div>
                        <div className={styles.carosel_title}>
                           <h2 className={styles.leading_title}>Find a Location</h2> 
                           <p className={styles.carosel_desc}>
                                World-class care for everyone. Our health System offers unmatched, expert 
                                health care. From the lab to the clinic
                           </p>
                          <Link to='/doctors' className={styles.carosel_link}>
                          <BsArrowRight className={styles.group__carosel}/>
                          </Link>
                        </div>
                    </div> 
                    <div className={styles.carosel_items}>
                        <div className={styles.img__items}>
                            <img src={icon03} alt="" />
                        </div>
                        <div className={styles.carosel_title}>
                           <h2 className={styles.leading_title}>Book Appointment</h2> 
                           <p className={styles.carosel_desc}>
                                World-class care for everyone. Our health System offers unmatched, expert 
                                health care. From the lab to the clinic
                           </p>
                          <Link to='/doctors' className={styles.carosel_link}>
                          <BsArrowRight className={styles.group__carosel}/>
                          </Link>
                        </div>
                    </div> 
                </div>
            </div>
        </section>
        <About />
        <section>
            <div className={styles.container}>
                <div className={styles.patients__heading}>
                    <h2 className={styles.patients__title}>Our medical services</h2>
                    <p className={styles.text__patients}>
                    World-class care for everyone. Our health System offers unmatched,
                                    expert health care.
                    </p>
                </div>
                <ServicesList />
            </div>
        </section>
        <section>
            <div className={styles.container}>
                <div className={styles.features_title}>
                    <div className={styles.features_desc}>
                        <h2 className={styles.heading}>
                            Get virtual treatment<br/>anytime.
                        </h2>
                        <ul className={styles.source}>
                            <li className={styles.text__para}>
                                1. Schedule the appointment directly.
                            </li>
                            <li className={styles.text__para}>
                                2. Search for your physician here, and contact their office.
                            </li>
                            <li className={styles.text__para}>
                                3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time. 
                            </li>
                        </ul>
                        <Link to='/'>
                          <button className={styles.btn}>Learn More</button>
                        </Link>
                    </div>
                    <div className={styles.features__img}>
                        <img src={features__img} className={styles.features__central} alt="" />

                        <div className={styles.features__timeline}>
                            <div className={styles.features__viewquere}>
                                <div className={styles.features__cart}>
                                    <p className={styles.features__week}>
                                        Tue, 24
                                    </p>
                                    <p className={styles.features__hour}>
                                        10:00AM
                                    </p>
                                </div>
                                <span className={styles.features__icontiny}>
                                    <img src={videoIcon} alt="" />
                                </span>
                            </div>

                            <div className={styles.features__iris}>
                             Consultation
                            </div>
                            <div className={styles.features__avatar}>
                                <img src={avatarIcon} alt="" />
                                <h4 className={styles.features__surname}>Wayne Collins</h4>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <section>
            <div className={styles.container}>
            <div className={styles.patients__heading}>
                    <h2 className={styles.patients__title}>
                   Our great doctors
                    </h2>
                    <p className={styles.text__patients}>World-class care for everyone. 
                    Our health System offes unmatched, expert health care.</p>
                </div>
                <DoctorList/>
            </div>
        </section>
        <section>
            <div className={styles.container}>
                <div className={styles.faqImg}>
                    <div className={styles.figma} >
                        <img src={faqImg} alt=""/>
                    </div>
                    <div className={styles.faq__title}>
                    <h2 className={styles.heading}>
                        Most questions by our beloved patients
                    </h2>
                    <FaqList />
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className={styles.container}>
                <div className={styles.testimonial__package}>
                <h2 className={styles.patients__title}>Our medical services</h2>
                    <p className={styles.text__patients}>
                    World-class care for everyone. Our health System offers unmatched,
                                    expert health care.
                    </p>
                </div>
                <Testimonial />
            </div>
        </section>
        </div>   
    )
};
export default Home;

