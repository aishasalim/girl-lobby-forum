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
      const remainingHours = hours % 24;
      const remainingMinutes = minutes % 60;

      let timeAgoString = '';

      if (days > 0 || hours > 0) {
        timeAgoString += `${days > 0 ? `${days} day${days > 1 ? 's' : ''}` : ''}`;
        if (remainingHours > 0) {
          timeAgoString += `${days > 0 ? ' and ' : ''}${remainingHours} hour${remainingHours > 1 ? 's' : ''}`;
        }
        timeAgoString += ' ago';
      } else {
        timeAgoString = 'just now';
      }

      setTimeAgo(timeAgoString);
    };

    calculateTimeAgo();
  }, [created_at]);

  return <span>{timeAgo}</span>;
};

export default TimeAgo;
