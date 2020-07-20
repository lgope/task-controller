import React, { useEffect, Fragment } from 'react';

import { connect } from 'react-redux';

import { getUserTasks } from '../../actions/userActions';
import TaskSummarizeTable from '../task/TaskSummarizeTable.component';

const User = ({ user, getUserTasks, tasks, error }) => {
  useEffect(() => {
    getUserTasks();
  }, ['']);

  return (
    <Fragment>
      <h2>
        User name: {user.name}, role: {user.role}, email: {user.email}
      </h2>
      <br />

      {tasks.length > 0 ? (
        <TaskSummarizeTable tasks={tasks} />
      ) : (
        <h4>No tasks assigned yet!! 🙂</h4>
      )}
    </Fragment>
  );
};

// TODO: progress change
const mapStateToProps = state => ({
  user: state.auth.user,
  tasks: state.userRoutes.tasks,
  error: state.error,
});
export default connect(mapStateToProps, { getUserTasks })(User);
