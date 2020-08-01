import React from 'react';

const CancleBtn = ({ onClickFunc }) => {
  return (
    <button
      type='button'
      className='btn btn-outline-warning'
      title='Cancle'
      onClick={onClickFunc}
      style={{ borderRadius: '10px' }}
    >
      <img
        src={require('../../images/delete.webp')}
        alt='delete image'
        title='Close'
        height='20px'
        width='20px'
      />
    </button>
  );
};

export default CancleBtn;
