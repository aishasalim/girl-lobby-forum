import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './GalleryPostDetail.css';

const SortingButtons = () => {
    return (
        <div className="sorting-buttons">
            <h3 className='order-by'>Order by: </h3>
            <Link to="/" className= 'sort-by-date'>
                <button>Newest</button>
            </Link>
            <Link to="/oldest" className='sort-by-oldest'>
                <button>Oldest</button>
            </Link>
            <Link to="/popular" className='sort-by-name'>
                <button>Popular</button>
            </Link>
        </div>
    );
};

SortingButtons.propTypes = {
    activeButton: PropTypes.string.isRequired,
};

export default SortingButtons;

