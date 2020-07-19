import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Logout from '../auth/Logout.component';
import { getAllTask } from '../../actions/taskActions';

import TaskSummarizeTable from '../task/TaskSummarizeTable.component';
const Admin = ({ user, getAllTask, tasks, error }) => {
  console.log('tasks 22222', tasks);
  useEffect(() => {
    getAllTask();
  }, ['tasks']);
  return (
    <Fragment>
      <h2>
        Admin name: {user.name}, role: {user.role}, email: {user.email}
      </h2>
      <br />
      {tasks && <TaskSummarizeTable tasks={tasks} />}
      <br />
      <Logout />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  tasks: state.task.tasks.tasks,
  error: state.error,
});

export default connect(mapStateToProps, { getAllTask })(Admin);
