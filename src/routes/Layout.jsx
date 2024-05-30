import { Outlet, Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from 'react';
import './Layout.css';
import { SearchQueryContext } from '../SearchQueryContext';
import { useTheme } from './Theme'; 
import { supabase } from '../client.js'
import SearchBar from "../components/SearchBar.jsx";
import LeftBar from "../components/LeftBar.jsx";

const Layout = () => {
    const { searchQuery, setSearchQuery } = useContext(SearchQueryContext);
    const { darkMode, toggleTheme } = useTheme();
    const [userInfo, setUserInfo] = useState({});
    const [isSignedIn, setIsSignedIn] = useState();
    const [showLeftBar, setShowLeftBar] = useState(false);

    useEffect(() => {
        const getUserData = async () => { 
            
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setUserInfo(user);
                    setIsSignedIn(true); 
    
                    const { data: existingUser, error: existingUserError } = await supabase
                        .from('accounts')
                        .select('*')
                        .eq('account_id', user.id)
                        .maybeSingle();
    
                    if (existingUserError) throw existingUserError;
    
                    if (!existingUser) {
                        const { error: insertError } = await supabase
                            .from('accounts')
                            .insert([{ id: Date.now(), 
                                account_id: user.id, 
                                email: user.email, 
                                post_count: 0, 
                                comments_count: 0, 
                                nickname: user.email.split('@')[0], 
                                account_avatar: user.user_metadata.avatar_url }])
                            .select('*')
                            .single();
                        
                        if (insertError) throw insertError;

                        localStorage.setItem('account_info', JSON.stringify(existingUser));
                }}
        };
        getUserData();
    }, []);


    useEffect(() => {
        if (!isSignedIn) {
            setUserInfo({});
        }
    }, [isSignedIn]);
    
    async function signOut() {
        await supabase.auth.signOut();
        setIsSignedIn(false);
        localStorage.clear();
        window.location = "/";
    }
      
    return (
    <>
    <div>
        <div className="leftbar-container">
            <LeftBar/>
        </div>
        {showLeftBar && <div className="slide-in leftbar-slide"><LeftBar/></div>}

        <div className="topbar">
            <nav>
            <ul>
                <li onClick={() => setShowLeftBar(!showLeftBar)} className="menubar" style={{ marginTop: "7px", width: "55px"}} >
                    <svg fill={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000000" } version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                        width="20px" height="20px" viewBox="0 0 24.75 24.75" xmlSpace="preserve"
                        >
                    <g>
                        <path d="M0,3.875c0-1.104,0.896-2,2-2h20.75c1.104,0,2,0.896,2,2s-0.896,2-2,2H2C0.896,5.875,0,4.979,0,3.875z M22.75,10.375H2
                                c-1.104,0-2,0.896-2,2c0,1.104,0.896,2,2,2h20.75c1.104,0,2-0.896,2-2C24.75,11.271,23.855,10.375,22.75,10.375z M22.75,18.875H2
                                c-1.104,0-2,0.896-2,2s0.896,2,2,2h20.75c1.104,0,2-0.896,2-2S23.855,18.875,22.75,18.875z"/>
                    </g>
                    </svg>
          
                </li>

                <li className="home-link link" key="home-button">
                <Link style={{ textDecoration: "none", fontWeight: "800", color: "#c77268"}} to="/">
                🚀 Girl Lobby
                </Link>
                </li>

                <li className="search" >
                <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                </li>

                <li className="create-post-link link" style={{ marginRight: "1.5em"}} >
                    <Link 
                        style={{ textDecoration: "none"}} 
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
                        <Link style={{ textDecoration: "none"}} to="/login">
                            Log in
                        </Link>
                    </li>
                ) : (
                    <li className="dropdown link" style={{ marginLeft: "1.5em"}} >
                       <div className="profile-pic">
                            {userInfo.user_metadata.avatar_url ? (
                                <img src={userInfo.user_metadata.avatar_url} alt="avatar" width="40px" className="avatar" />
                            ) : (
                                <svg width="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{marginTop: "5px"}}>
                                    <path fill="none" d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z" stroke={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000" } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fill="none" d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z" stroke={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path fill="none" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={darkMode ? "rgba(255, 255, 255, 0.87)" : "#000" } strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                           
                        </div>

                        <ul className="dropdown-point">
                            <li><span onClick={() => signOut()} className="dropdown-link">Log out</span></li>
                            <hr />
                            <li><Link to={`/profile/${JSON.parse(localStorage.getItem(`account_info`))?.nickname ?? 'defaultId'}`}><span className="dropdown-link">Profile</span></Link></li>
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
    </>
    );};

export default Layout;