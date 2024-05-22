import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './SideBars.css';
import { useEffect, useState } from 'react';

const LeftBar = () => {
  const [isSignedIn, setIsSignedIn] = useState();
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const location = useLocation(); 
               
  useEffect(() => {
    if (!userInfo) {
      setIsSignedIn(false);
    } else {
        setIsSignedIn(true);
    }
    }, [userInfo]);

    const isActive = (path) => location.pathname === path;


  return (
    <div className='leftbar'>
      <ul>
        <Link to="/">
          <li className={`leftbar-link ${isActive('/') ? 'active' : ''}`}>Home</li>
        </Link>
        <Link to={isSignedIn ? "/create" : "/login"}>
          <li className={`leftbar-link ${isActive('/create') || isActive('/login') ? 'active' : ''}`}>Create Post</li>
        </Link>
        <Link to="/popular">
          <li className={`leftbar-link ${isActive('/popular') ? 'active' : ''}`}>Popular</li>
        </Link>
        <Link to="/newest">
          <li className={`leftbar-link ${isActive('/newest') ? 'active' : ''}`}>Recent Posts</li>
        </Link>
        <hr className='leftbar-hr' />
        <li>
          Communities
        </li>
      </ul>
    </div>
  );
};

export default LeftBar;