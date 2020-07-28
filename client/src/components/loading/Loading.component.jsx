import React from 'react';
import loadingImage from '../../images/animation_200_kcz98a90.gif';

const Loading = () => {
  return (
    <div className='text-center'>
      <img
        src={loadingImage}
        className='rounded loading_img'
        alt='loadingImage'
      />
    </div>
  );
};

export default Loading;
