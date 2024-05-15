import React, { useState, useEffect } from 'react';

const TimeAgo = ({ created_at }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const createdAt = created_at ? new Date(created_at) : new Date();
      const currentTime = new Date();
      const diff = Math.abs(currentTime - createdAt);
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
  
      let timeAgoString = '';
  
      if (months > 0) {
        timeAgoString += `${months} month${months > 1 ? 's' : ''} ago`;
      } else if (days > 0) {
        timeAgoString += `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        timeAgoString += `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        timeAgoString += `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        timeAgoString = 'just now';
      }
  
      setTimeAgo(timeAgoString);
    };
  
    calculateTimeAgo();
  }, [created_at]);

  TimeAgo.propTypes = {
    created_at: function(props, propName, componentName) {
      if (!props[propName]) {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Expected a date.`
        );
      }
  
      const date = new Date(props[propName]);
  
      if (isNaN(date.getTime())) {
        return new Error(
          `Invalid prop ${propName} supplied to ${componentName}. Expected a valid date.`
        );
      }
    }
  };

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
