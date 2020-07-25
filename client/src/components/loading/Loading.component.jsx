import React from 'react';
import './styles.css';

const Loading = () => {
  return (
    <div className='text-center'>
      <img
        src='https://user-images.githubusercontent.com/58518192/88335995-0ac84500-cd56-11ea-8ea4-6898756f9cfd.gif'
        className='rounded'
        alt='loadingImage'
      />
    </div>
  );
};

export default Loading;
