import React from "react";
import {Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import patientAvatar from '../../assets/images/patient-avatar.png';
import {HiStar} from 'react-icons/hi';
import styles from '../Testimonial/Testimonial.module.css';
const Testimonial =()=>{
    return (
        <div className={styles.testimonial}>
            <Swiper 
            modules={[Pagination]} 
            spaceBetween={30} 
            slidesPerView={1} 
            pagination={{clickable:true}}
            breakpoints={{
                640:{
                    slidesPerView:1,
                    spaceBetween:0
                },
                768:{
                    slidesPerView:2,
                    spaceBetween:20
                },
                1024:{
                    slidesPerView:3,
                    spaceBetween:30
                }
           }}
            >
                <SwiperSlide>
                    <div className={styles.swiper__item}>
                        <div className={styles.swiper__views}>
                            <img src={patientAvatar} alt="" />
                            <div>
                                <h4 className={styles.swiper__title}>
                                    Muhibur Rahman
                                </h4>
                                <div className={styles.swiper__ranking}>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                </div>
                            </div>
                        </div>
                        <p className={styles.swiper__subcriber}>
                            "I have taken medical services from them. 
                            They treat so well and they are provding the best medical services." 
                        </p>
                    </div>
                </SwiperSlide>   
                <SwiperSlide>
                    <div className={styles.swiper__item}>
                        <div className={styles.swiper__views}>
                            <img src={patientAvatar} alt="" />
                            <div>
                                <h4 className={styles.swiper__title}>
                                    Muhibur Rahman
                                </h4>
                                <div className={styles.swiper__ranking}>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                </div>
                            </div>
                        </div>
                        <p className={styles.swiper__subcriber}>
                            "I have taken medical services from them. 
                            They treat so well and they are provding the best medical services." 
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.swiper__item}>
                        <div className={styles.swiper__views}>
                            <img src={patientAvatar} alt="" />
                            <div>
                                <h4 className={styles.swiper__title}>
                                    Muhibur Rahman
                                </h4>
                                <div className={styles.swiper__ranking}>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                </div>
                            </div>
                        </div>
                        <p className={styles.swiper__subcriber}>
                            "I have taken medical services from them. 
                            They treat so well and they are provding the best medical services." 
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.swiper__item}>
                        <div className={styles.swiper__views}>
                            <img src={patientAvatar} alt="" />
                            <div>
                                <h4 className={styles.swiper__title}>
                                    Muhibur Rahman
                                </h4>
                                <div className={styles.swiper__ranking}>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                </div>
                            </div>
                        </div>
                        <p className={styles.swiper__subcriber}>
                            "I have taken medical services from them. 
                            They treat so well and they are provding the best medical services." 
                        </p>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.swiper__item}>
                        <div className={styles.swiper__views}>
                            <img src={patientAvatar} alt="" />
                            <div>
                                <h4 className={styles.swiper__title}>
                                    Muhibur Rahman
                                </h4>
                                <div className={styles.swiper__ranking}>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                    <HiStar className={styles.twl__histar}/>
                                </div>
                            </div>
                        </div>
                        <p className={styles.swiper__subcriber}>
                            "I have taken medical services from them. 
                            They treat so well and they are provding the best medical services." 
                        </p>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}
export default Testimonial;