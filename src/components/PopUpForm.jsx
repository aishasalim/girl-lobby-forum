
import React, { useState } from 'react';
import './PopUpForm.css'; 
import { supabase } from '../client.js';
import PropTypes from 'prop-types';

const PopUpForm = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
      });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { error } = await supabase
            .from('communities')
            .insert([{ id: Date.now(), name: formData.name, description: formData.description, post_count: 0 }]);
          if (error) throw error;
          setFormData({ name: '', description: '' });
          onClose();
        } catch (error) {
          console.error('Error adding community:', error);
        }
    };
    

  if (!isOpen) return null;

  PopUpForm.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h className="close-btn" onClick={onClose}>x</h>
        <h2>🖋️Add Community</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name your community:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{width: '90%'}}
              required
            />
          </label>
          <label>
            Make a small Description for it (optional):
            <textarea
              type="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              style={{width: '90%', backgroundColor: 'white', color: 'black'}}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PopUpForm;
