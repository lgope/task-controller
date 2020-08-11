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
      Cancle
    </button>
  );
};

export default CancleBtn;
