import React from 'react';
import PropTypes from 'prop-types';

const PostForm = ({ handleSubmit, handleChange, handleFileChange, clearImageInput, title, text, img, secretKeyPlaceholder }) => {
    const inputStyle = {
        color: 'black' // Or any dark color you prefer
    };
    PostForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleChange: PropTypes.func.isRequired,
        handleFileChange: PropTypes.func.isRequired,
        clearImageInput: PropTypes.func.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        img: PropTypes.string,
        secretKeyPlaceholder: PropTypes.string,
      };
    return (
        <div className='create-form-card'>
            <form onSubmit={handleSubmit}>
                <div className="card-content">
                    <label>Title</label> <br />
                    <input style={inputStyle} type="text" id="title" name="title" className='title-input' placeholder="What beads bag are you interested in?" value={title} onChange={handleChange} />
                    <br />
                    <label>Text</label><br />
                    <textarea style={inputStyle} className='text-input' id="text" name="text" placeholder="Tell us about the beads bag you made!" value={text} onChange={handleChange} />
                    <br />

                    <label>Image (Optional) </label><br />
                    <input type="text" id="img" name="img" className='img-input' placeholder="Either send a link on image or upload it" value={img} onChange={handleChange} style={{width: '340px', color: 'black'}} />
                    <button className="clear-button" type="button" onClick={clearImageInput} style={{marginLeft: '30px'}} >Clear</button>
                    <br />
                    <input type="file" id="file_input" className='img-file-input' name="filename" onChange={handleFileChange} />
                    <br />          
                    <label>Secret key (Optional) </label><br />
                    <input style={inputStyle} type="text" id="secret_key" name="secret_key" className='key-input' placeholder={secretKeyPlaceholder} onChange={handleChange} />
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
