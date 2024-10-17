import React from "react";
import {Link} from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import {RiLinkedinFill } from 'react-icons/ri';
import styles from '../Footer/Footer.module.css';
import {AiFillYoutube, AiFillGithub, AiOutlineInstagram} from 'react-icons/ai';

const socialLinks =[
{
    path:"https://www.youtube.com/c/CodingWithMuhib",
    icon: <AiFillYoutube className="group-hover:text-white w-4 h-5"/>
},
{
    path:"https://github.com/codingwithmuhib",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5"/>
},
{
    path:"https://www.instagram.com/muhib160.oficial/",
    icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5"/>
},
{
    path:"https://www.linkedin.com/in/codingwithmuhib",
    icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5"/>
}

]

const quickLinks01 =[
    {
        path:"/home",
        display:"Home",
    },
    {
        path:"/",
        display:"About Us",
    },
    {
        path:"/services",
        display: "Services",
    },
    {
        path:"/",
        display:"Blog",
    }
]
const quickLinks02 =[
    {
        path:"/find-a-doctor",
        display:"Find a doctor",
    },
    {
        path:"/",
        display:"Request an Appointment",
    },
    {
        path:"/",
        display: "Find a Location",
    },
    {
        path:"/",
        display:"Get a Opinion",
    }
];

const quickLinks03 =[
    {
        path:"/",
        display:"Donate",
    },
    {
        path:"/contact",
        display:"Contact Us",
    },

];

const Footer =()=>{
    const year = new Date().getFullYear();
    return (
    <footer className={styles.footer__brands}>
        <div className={styles.container}>
            <div className={styles.footer__card}>
                <div>
                    <img src={logo} alt=""/>
                    <p className={styles.footer__title}>
                        Copyright © {year} developed by Muhibur Rahman all right reserved.
                    </p>
                    <div className={styles.footer__linkpages}>
                        {socialLinks.map((link,index)=>(
                            <Link to={link.path} 
                            key={index} 
                            className={styles.links__page} >
                                {link.icon}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className={styles.link__squal}>
                        Quick Links
                    </h2>

                    <ul>
                        {quickLinks01.map((item,index)=>(
                        <li key={index} className={styles.links__atx}>
                            <Link to={item.path} 
                        key={index} 
                        className={styles.links__display} >
                            {item.display}
                        </Link></li>))}
                    </ul>
                </div>
            </div>

        </div>
    </footer>
    )
}
export default Footer;