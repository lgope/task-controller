import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { getAllTask } from '../../actions/taskActions';
import { getAllWorks } from '../../actions/dailyWorkActions';

import WorkInfo from './WorkInfo.component';

const Admin = ({ user, getAllTask, getAllWorks, allWorks, error }) => {
  useEffect(() => {
    getAllWorks();
    getAllTask();
  }, ['']);
  return (
    <Fragment>
      <h2>Welcome to Admin Panel {user.name} 🎉</h2>
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
  allWorks: state.dailyWorks.allWorks,
  error: state.error,
});

export default connect(mapStateToProps, { getAllTask, getAllWorks })(Admin);
