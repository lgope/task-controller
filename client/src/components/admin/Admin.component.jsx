import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Logout from '../auth/Logout.component';
import { getAllTask } from '../../actions/taskActions';
import { getAllWorks } from '../../actions/dailyWorkActions';

import TaskSummarizeTable from '../task/TaskSummarizeTable.component';
import WorkInfo from './WorkInfo.component';
// import AdminNavBar from './AdminNavBar.component';

const Admin = ({ user, getAllTask, getAllWorks, allWorks, tasks, error }) => {
  console.log('tasks 22222', allWorks);
  useEffect(() => {
    getAllWorks();
    getAllTask();
  }, ['tasks']);
  return (
    <Fragment>
      {/* <AdminNavBar /> */}
      <h2>
        Admin name: {user.name}, role: {user.role}, email: {user.email}
      </h2>
      <br />
      {/* {tasks && <TaskSummarizeTable tasks={tasks} />} */}
      {allWorks.dailyWorks && allWorks.dailyWorks.length > 0 && (
        <WorkInfo dailyWorks={allWorks.dailyWorks} />
      )}
      <br />
      <Logout />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  tasks: state.task.tasks.tasks,
  allWorks: state.dailyWorks.allWorks,
  error: state.error,
});

export default connect(mapStateToProps, { getAllTask, getAllWorks })(Admin);
