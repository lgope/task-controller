import React from 'react';

const SaveBtn = ({ onClickFunc }) => {
  return (
    <button
      type='submit'
      className='btn btn-outline-success mr-2'
      onClick={onClickFunc}
      title='Save'
      style={{ borderRadius: '10px' }}
    >
      Save
    </button>
  );
};

export default SaveBtn;
