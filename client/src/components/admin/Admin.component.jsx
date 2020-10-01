import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllWorks } from '../../redux/actions/dailyWorkActions';

import WorkInfo from './WorkInfo.component';
import Loading from '../loading/Loading.component';

const Admin = ({ user, isAuthenticated, isLoading, getAllWorks, allWorks }) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  useEffect(() => {
    getAllWorks();
  }, [isDataChanged, getAllWorks]);

  if ((user && user.role === 'user') || isAuthenticated === false) {
    return <Redirect to='/' />;
  }

  if (isLoading) return <Loading />;

  return (
    <div className='container'>
      <h2>Welcome to Admin Panel {user && user.name} 🎉</h2>
      <br />
      <h4>All daily works information:</h4>
      {allWorks && allWorks.length > 0 && (
        <WorkInfo
          dailyWorks={allWorks}
          isDataChanged={isDataChanged}
          setIsDataChanged={setIsDataChanged}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  allWorks: state.dailyWorks.allWorks,
  isLoading: state.dailyWorks.loading,
});

export default connect(mapStateToProps, { getAllWorks })(Admin);
