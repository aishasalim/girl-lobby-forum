import { Outlet, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import './Layout.css';
import { SearchQueryContext } from '../SearchQueryContext';
import { useTheme } from './Theme'; 
import PropTypes from 'prop-types';
import { supabase } from '../client.js'


const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            style={{color: 'black'}}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
    );
};

const Layout = () => {
    const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);
    const { darkMode, toggleTheme } = useTheme();
    const [userInfo, setUserInfo] = useState({});
    const [isSignedIn, setIsSignedIn] = useState();

  
    SearchBar.propTypes = {
        searchQuery: PropTypes.string.isRequired,
        setSearchQuery: PropTypes.func.isRequired,
      };

      useEffect(() => {
        const getUserData = async () => { 
            try {
                const { data: { user } } = await supabase.auth.getUser();
                localStorage.setItem('user', JSON.stringify(user));
                setUserInfo(user);
                
                // retrieves user from local storage
                // const userr = JSON.parse(localStorage.getItem('user'));
                // console.log(userr); 

            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
        getUserData();
    }, []);


    useEffect(() => {
        if (!userInfo) {
            setIsSignedIn(false);
        } else {
            setIsSignedIn(true);
        }
    }, [userInfo]);

    async function signOut() {
        await supabase.auth.signOut();
        setIsSignedIn(false);
        setUserInfo({});
        localStorage.clear();
        window.location = "/";
     }
    
      
    return (
        <div>
        <div className="topbar">
            <nav>
            <ul>
                <li className="home-link link" key="home-button">
                <Link className={`${darkMode ? 'dark-link' : 'light-link'}`} style={{ color: darkMode ? "#242424" : "rgba(255, 255, 255, 0.87)", textDecoration: "none", fontWeight: "600"}} to="/">
                    Beaded Bag
                </Link>
                </li>

                <li className="search" >
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </li>

                <li className="create-post-link link" style={{ marginRight: "1.5em"}} >
                    <Link 
                        style={{ color: darkMode ? "#242424" : "rgba(255, 255, 255, 0.87)", textDecoration: "none"}} 
                        to={isSignedIn ? "/create" : "/login"}
                    >
                        Create Post
                    </Link>
                </li>

                <li>
                <label className="switch link">
                    <input type="checkbox" id="themeToggle" onChange={toggleTheme} />
                    <span className="slider round"></span>
                </label>
                </li>

       
                {!isSignedIn ? (
                    <li className="link" style={{ marginLeft: "1.5em"}} >
                        <Link style={{ color: darkMode ? "#242424" : "rgba(255, 255, 255, 0.87)", textDecoration: "none"}} to="/login">
                            Log in
                        </Link>
                    </li>
                ) : (
                    <li className="dropdown link" style={{ marginLeft: "1.5em"}} >
                        <div className="profile-pic">
                            <svg width="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{marginTop: "5px"}}>
                                <path fill="none" d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke={darkMode ? "#000" : "rgba(255, 255, 255, 0.87)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fill="none" d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke={darkMode ? "#000" : "rgba(255, 255, 255, 0.87)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path fill="none" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={darkMode ? "#000" : "rgba(255, 255, 255, 0.87)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <ul className="dropdown-point">
                            <li><a onClick={() => signOut()} className="dropdown-link">Log out</a></li>
                            <hr />
                            <li><a href="#" className="dropdown-link">Update</a></li>
                        </ul>

                    </li>
                )}
   
            </ul>
            </nav>
        </div>
        <div className="whole-page">
            <Outlet />
        </div>
        </div>
    );
};

export default Layout;