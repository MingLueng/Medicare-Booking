import React, { useState,useEffect,useRef, useContext } from "react";
import styles from '../Header/Header.module.css';
import logo from '../../assets/images/logo.png';
import { NavLink, Link } from "react-router-dom";
import {BiMenu} from 'react-icons/bi'
import userImg from '../../assets/images/avatar-icon.png';
import {authContext} from '../../context/authContext.jsx';

const navLinks =[
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/doctors',
        display:'Find a Doctor'
    },
    {
        path:'/services',
        display:'Services'
    },
    {
        path:'/contact',
        display:'Contact'
    }
]
const Header =()=>{
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const {user, role, token} = useContext(authContext);
    const handleStickyHeader = () =>{
    window.addEventListener('scroll',() =>{
        if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
            headerRef.current.classList.add(styles.sticky__header);
        }
        else{
            headerRef.current.classList.remove(styles.sticky__header);
        }
    })
}

useEffect(()=>{
    handleStickyHeader();
    return () =>{
        window.removeEventListener('scroll', handleStickyHeader);
    }
});

const toggleMenu = () => menuRef.current.classList.toggle(styles.show__menu);

//useEffect được sử dụng để xử lý các hiệu ứng phụ trong functional components.
//useRef là một hook của React. Khi bạn gọi useRef(null), 
//nó trả về một đối tượng tham chiếu (reference object) với thuộc tính
//useRef được sử dụng để tạo một tham chiếu tới phần tử DOM.
//headerRef là một biến tham chiếu mà .current của nó sẽ trỏ tới phần tử DOM sau khi phần tử này được gắn vào DOM thực.
    return (
      <header className={styles.header} ref={headerRef}>
        <div className={styles.container}>
            <div className={styles.items}>
                <div>
                    <img src={logo} alt="" />
                    
                </div>

                <div className={styles.navigation} ref={menuRef} onClick={toggleMenu}>
                    <ul className={styles.menu}>
                        {
                            navLinks.map((link,index)=>
                            <li key ={index}>
                                <NavLink to={link.path} className={item=> item.isActive ? `${styles.menu_link} ${styles.active}` : `${styles.menu_link}`
                                }>
                                {link.display}</NavLink>
                            </li>
                            )
                        }
                    </ul>    
                </div>

                <div className={styles.nav_right}>
                   {
                      token && user ? (
                    <div>
                        <Link to={`${role ==='doctor' ? 'doctors/profile/me' : 'users/profile/me'}`}>
                            <figure className={styles.menu_right}>
                                <img src={user?.photo} alt="" className={styles.menu_item_right}/>
                            </figure> 
                            {/* <h2>{user?.name}</h2>  */}
                        </Link>
                    </div>) : (
                    
                    <Link to="/login">
                        <button className={styles.login_up}>Login</button>
                    </Link>
                    )}
                    <span className='md:hidden' onClick={toggleMenu}>
                        <BiMenu className={styles.bimenu}>
                        </BiMenu>
                    </span>
                        
                </div>
            </div>
        </div>
        
      </header>  
    )
}
export default Header;