import React from "react";
import { useState } from "react";
import styles from '../Faq/Faq.module.css';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
const FaqItem =({item})=>{
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () =>{
        setIsOpen(!isOpen);
    };
    return (
        <div className={styles.faq_outline}>
            <div className={styles.faq__symbols} onClick={toggleAccordion}>
               <h4 className={styles.faq__questions}>
                {item.question}
                </h4>  
                <div className={`${styles.faq__content} ${ isOpen ? styles.faq__content__open :''}`}>
                    {isOpen ? <AiOutlineMinus /> :  <AiOutlinePlus />}
                </div>   
            </div>
            {isOpen && <div className={styles.faq__assets}>
                <p className={styles.faq__cenception}>
                    {item.content}
                </p>
                </div>}
        </div>
    )
}
export default FaqItem;