import React from 'react';
import PropTypes from 'prop-types';

const PostForm = ({ handleSubmit, handleChange, handleFileChange, clearImageInput, title, text, img }) => {
   
    PostForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleFileChange: PropTypes.func.isRequired,
        clearImageInput: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        img: PropTypes.string,
      };
    return (
        <div className=''>
            <form onSubmit={handleSubmit}>
                <div className="card-content">
                    <label>Title</label> <br />
                    <input type="text" id="title" name="title" className='title-input' placeholder="What do you want to talk about?" value={title} onChange={handleChange} />
                    <br />
                    <label>Text</label><br />
                    <textarea style={{color: 'black', backgroundColor: 'white'}} className='text-input' id="text" name="text" placeholder="Tell your story!" value={text} onChange={handleChange} />
                    <br />

                    <label>Image (Optional) </label><br />
                    <input type="text" id="img" name="img" className='img-input' placeholder="Either send a link on image or upload it" value={img} onChange={handleChange} style={{width: '340px', color: 'black'}} />
                    <button className="clear-button" type="button" onClick={clearImageInput} style={{marginLeft: '30px'}} >Clear</button>
                    <br />
                    <input type="file" id="file_input" className='img-file-input' name="filename" onChange={handleFileChange} />
                    <br />          
                </div>
                <div className="card-actions">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
