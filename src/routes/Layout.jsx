import { Outlet, Link } from "react-router-dom";
import React, { useContext } from 'react';
import './Layout.css';
import { SearchQueryContext } from '../SearchQueryContext';
import { useTheme } from './Theme'; 
import PropTypes from 'prop-types';


const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <input
            style={{color: 'black', maxWidth: '400px'}}
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
  

    SearchBar.propTypes = {
        searchQuery: PropTypes.string.isRequired,
        setSearchQuery: PropTypes.func.isRequired,
      };
      
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

                <li>
                <label className="switch link">
                    <input type="checkbox" id="themeToggle" onChange={toggleTheme} />
                    <span className="slider round"></span>
                </label>
                </li>

                <li className="create-post-link link" style={{ marginLeft: "1.5em"}} >
                <Link style={{ color: darkMode ? "#242424" : "rgba(255, 255, 255, 0.87)", textDecoration: "none"}} to="/create">
                    Create Post
                </Link>
                </li>
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