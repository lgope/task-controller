import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import Moment from 'react-moment';
import dayjs from 'dayjs';

import TaskDiscussPage from './TaskDiscussPage.component';

const TaskSummarizeTable = ({ tasks }) => {
  let count = 1;
  return (
    <Fragment>
      <Table size='sm' bordered hover>
        <thead>
          <tr className='text-center'>
            <th>#</th>
            <th>Task Name</th>
            <th>User</th>
            <th>Created At</th>
            <th>Progress</th>
          </tr>
        </thead>
        {tasks.map(task => (
          <tbody>
            <tr className='text-center'>
              <th scope='row'>{count++}</th>
              <td>
                <TaskDiscussPage id={task._id} btnName={task.taskName} />
              </td>
              <td>{task.user}</td>
              <td>
                {dayjs(task.createdAt).format('h:mm a, MMMM DD, YYYY')} |{' '}
                <Moment fromNow>{task.createdAt}</Moment>
              </td>
              <td>{task.progress}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </Fragment>
  );
};

// TODO: ensure user for visible taks progress edit option (get user from state.auth.user)

export default TaskSummarizeTable;
