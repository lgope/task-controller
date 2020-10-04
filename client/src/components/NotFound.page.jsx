import React from 'react';
import { Link } from 'react-router-dom';
const NotFound = () => (
  <div className='not-found-page' onContextMenu={e => e.preventDefault()}>
    <div className='notfound-image'></div>
    <center>
      <p>
        <Link to='/'>Go to Home </Link>
      </p>
    </center>
  </div>
);
export default NotFound;
