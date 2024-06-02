import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { supabase } from '../client.js';

const PostForm = ({ handleSubmit, handleChange, handleFileChange, clearImageInput, title, text, img, community, isEdit }) => {
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunities = async () => {
            const { data: communities, error } = await supabase
                .from('communities')
                .select('*');

            if (error) console.error('Error fetching communities:', error.message);
            else setCommunities(communities);
        };

        fetchCommunities();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="card-content">
                    <label>Title</label> <br />
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className='title-input'
                        placeholder="What do you want to talk about?"
                        value={title}
                        onChange={handleChange}
                    />
                    <br />
                    {!isEdit && (
                    <div className="dropdown-communities-container">
                        <label>Add post to community</label>
                        <select
                            className="dropdown-community"
                            id="community"
                            name="community"
                            value={community}
                            onChange={handleChange}  
                        >
                            <option value="nocommunity">No community</option>
                            {communities.map((community) => (
                                <option key={community.id} value={community.id}>
                                    {community.lowercase_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    )}
                    <br />
                    <label>Text</label><br />
                    <textarea
                        style={{ color: 'black', backgroundColor: 'white', font: "sans-serif" }}
                        className='text-input'
                        id="text"
                        name="text"
                        placeholder="Tell your story!"
                        value={text}
                        onChange={handleChange}
                    />
                    <br />
                    <label>Image (Optional) </label><br />
                    <input
                        type="text"
                        id="img"
                        name="img"
                        className='img-input'
                        placeholder="Either send a link to an image or upload it"
                        value={img}
                        onChange={handleChange}
                        style={{ width: '340px', color: 'black' }}
                    />
                    <button
                        className="clear-button"
                        type="button"
                        onClick={clearImageInput}
                        style={{ marginLeft: '30px' }}
                    >
                        Clear
                    </button>
                    <br />
                    <input
                        type="file"
                        id="file_input"
                        className='img-file-input'
                        name="filename"
                        onChange={handleFileChange}
                    />
                    <br />
                </div>
                <div className="card-actions">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </>
    );
};

PostForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    handleFileChange: PropTypes.func.isRequired,
    clearImageInput: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    img: PropTypes.string,
    community: PropTypes.string,
    isEdit: PropTypes.bool
};

export default PostForm;
