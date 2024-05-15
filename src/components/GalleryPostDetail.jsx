import { useState, useEffect, useContext } from 'react';
import Card from './Card.jsx';
import { supabase } from '../client.js';
import './GalleryPostDetail.css';
import { SearchQueryContext } from '../SearchQueryContext';
import PropTypes from 'prop-types';

import SearchBar from "./SearchBar.jsx";


const GalleryPostDetail = () => {
    const [posts, setPosts] = useState([]);
    const [activeButton, setActiveButton] = useState(null);
    const { searchQuery, setSearchQuery  } = useContext(SearchQueryContext);


    const handleButtonClick = (buttonId) => {
        setActiveButton((prevActiveButton) => {
            return prevActiveButton === buttonId ? null : buttonId;
        });
    };

    const fetchPosts = async () => {
        try {
            let query = supabase.from('posts').select();

            // Apply search filter
            if (searchQuery) {
                query = query.filter('title', 'ilike', `%${searchQuery}%`); // Filter by post title
            }

            // Apply sorting logic based on activeButton
            if (activeButton === 'sort-by-date') {
                query = query.order('created_at', { ascending: false });
            } else if (activeButton === 'sort-by-name') {
                query = query.order('likes', { ascending: false });
            } else if (activeButton === 'sort-by-oldest') {
                query = query.order('created_at', { ascending: true });
            }

            const { data, error } = await query;
            if (error) {
                throw new Error(error.message);
            }
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error.message);
        }
    };

    Card.propTypes = {
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        created_at: PropTypes.instanceOf(Date).isRequired,
      };


    useEffect(() => {
        fetchPosts();
    }, [activeButton, searchQuery]);

    
    return (
        <>
        
        <div className="ghost-searchbar" >
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>

            {/* Sorting buttons */}
            <div className="sorting-buttons">
                <h3 className='order-by'>Order by: </h3>
                <button
                    id="sort-by-date"
                    className={activeButton === 'sort-by-date' ? 'sorting-button active' : 'sorting-button'}
                    onClick={() => handleButtonClick('sort-by-date')}
                >
                    Newest
                </button>
                <button
                    id="sort-by-oldest"
                    className={activeButton === 'sort-by-oldest' ? 'sorting-button active' : 'sorting-button'}
                    onClick={() => handleButtonClick('sort-by-oldest')}
                >
                    Oldest
                </button>
                <button
                    id="sort-by-name"
                    className={activeButton === 'sort-by-name' ? 'sorting-button active' : 'sorting-button'}
                    onClick={() => handleButtonClick('sort-by-name')}
                >
                    Popular
                </button>
            </div>
            {/* Display posts */}
            <div className="ReadPosts" style={{marginBottom: "80px"}}>
            <hr/>
                {posts && posts.length > 0 ?
                    posts.map((post) => 
                        <Card key={post.id} id={String(post.id)} title={post.title} likes={post.likes} created_at={post.created_at} author={post.author} />
                    ) : 
                    <h2>No Posts Yet 😞</h2>
                }
            </div>
        </>
    );
};

export default GalleryPostDetail;
