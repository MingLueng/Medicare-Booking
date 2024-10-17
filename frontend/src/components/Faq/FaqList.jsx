import React from "react";
import { faqs } from './../../assets/data/faqs';
import FaqItem from './FaqItem';
import styles from '../Faq/Faq.module.css';

const FaqList = ()=>{
    return (
        <ul className={styles.faq_list}>
            {faqs.map((item,index)=>
                <FaqItem item={item} index={index} key={index} />
            )}
        </ul>
    )
}
export default FaqList;