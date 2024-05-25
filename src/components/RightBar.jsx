import React from 'react';
import './SideBars.css';
import PropTypes from 'prop-types';

const RightBar = ({accountDetails}) => {

  const copyToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      alert('Link copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };


  RightBar.propTypes = {
    accountDetails: PropTypes.shape({
      nickname: PropTypes.string,
      post_count: PropTypes.number,
      comments_count: PropTypes.number,
      created_at: PropTypes.string,
    }),
  };

  return (
    <div className='rightbar'>
      <div className='rectangle'></div>
      <ul>
        <li style={{ fontWeight: "700", marginBottom: "10px", fontSize: "1.3em"}}>{accountDetails?.nickname}</li>
        <li><button className='share-link' onClick={copyToClipboard}>Copy link</button></li>
        <div className='stats-container'>
        <p><span className="stats-number">{accountDetails?.post_count}</span><br/><span className="stats-text">post</span></p>
        <p><span className="stats-number">{accountDetails?.comments_count}</span><br/><span className="stats-text">comments</span></p>
        <p><span className="stats-number">{formatDate(accountDetails?.created_at)}</span><br/><span className="stats-text">Created</span></p>
       </div>
       {/*
        <hr />
         <div className='profile-settings-container'>
          <p>Settings</p>
          <p>{accountInfo.email}</p>      
        </div> */}
      </ul>
    </div>
  );
};

export default RightBar;