import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllTask } from '../../actions/taskActions';
import { getAllWorks } from '../../actions/dailyWorkActions';

import WorkInfo from './WorkInfo.component';

const Admin = ({
  user,
  isAuthenticated,
  getAllTask,
  getAllWorks,
  allWorks,
}) => {
  useEffect(() => {
    getAllWorks();
    getAllTask();
  }, ['']);

  if ((user && user.role === 'user') || isAuthenticated === false) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <h2>Welcome to Admin Panel {user && user.name} 🎉</h2>
      <br />
      <h4>All daily works info: 👇</h4>
      {allWorks.dailyWorks && allWorks.dailyWorks.length > 0 && (
        <WorkInfo dailyWorks={allWorks.dailyWorks} />
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  allWorks: state.dailyWorks.allWorks,
});

export default connect(mapStateToProps, { getAllTask, getAllWorks })(Admin);
