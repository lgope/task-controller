import React from 'react';

const SaveBtn = ({ onClickFunc }) => {
  return (
    <button
      type='submit'
      className='btn btn-outline-success'
      onClick={onClickFunc}
      title='Save'
      style={{ borderRadius: '10px' }}
    >
      <img
        src={require('../../images/add.webp')}
        alt='add'
        title='Save'
        height='25px'
        width='25px'
      />
    </button>
  );
};

export default SaveBtn;
