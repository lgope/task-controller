import React from 'react';
// import loadingImage from '../../images/webp.webp';
import loadingImage from '../../images/ezgif1.webp';

const Loading = () => (
  <div className='text-center'>
    <img
      src={loadingImage}
      className='rounded loading_img'
      alt='loadingImage'
    />
  </div>
);

export default Loading;
