import React, { Fragment } from 'react';
import { Table } from 'reactstrap';
import Moment from 'react-moment';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { updateTaskProgress } from '../../actions/taskActions';
import TaskDiscussPage from './TaskDiscussPage.component';

const TaskSummarizeTable = ({ tasks, user, updateTaskProgress }) => {
  let count = 1;

  const handleProgressChange = e => {
    console.log('pro value 🔔🔔', e.target.value);
    console.log('pro id 🔔', e.target.id);
    const body = {
      progress: e.target.value,
    };

    updateTaskProgress(e.target.id, body);
  };
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
          <tbody key={task._id}>
            <tr className='text-center'>
              <th scope='row'>{count++}</th>
              <td>
                <TaskDiscussPage id={task._id} btnName={task.taskName} />
                {/* <a onClick={() => setId(task._id)}>{task.taskName}</a> */}
              </td>
              <td>{task.user}</td>
              <td>
                {dayjs(task.createdAt).format('h:mm a, MMMM DD, YYYY')} |{' '}
                <Moment fromNow>{task.createdAt}</Moment>
              </td>
              <td>
                <select
                  className='selectpicker'
                  style={{ border: '0' }}
                  data-size='10'
                  data-style='btn-info'
                  id={task._id}
                  onChange={handleProgressChange}
                >
                  <option value={task.progress}>{task.progress}</option>
                  <option value='5%'>5%</option>
                  <option value='10%'>10%</option>
                  <option value='15%'>15%</option>
                  <option value='20%'>20%</option>
                  <option value='25%'>25%</option>
                  <option value='30%'>30%</option>
                  <option value='35%'>35%</option>
                  <option value='40%'>40%</option>
                  <option value='45%'>45%</option>
                  <option value='50%'>50%</option>
                  <option value='55%'>55%</option>
                  <option value='60%'>60%</option>
                  <option value='65%'>65%</option>
                  <option value='70%'>70%</option>
                  <option value='75%'>75%</option>
                  <option value='80%'>80%</option>
                  <option value='85%'>85%</option>
                  <option value='90%'>90%</option>
                  <option value='95%'>95%</option>
                  <option value='100%'>100%</option>
                </select>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      {/* {id && <TaskDiscussPage id={id} btnName={'click'} />} */}
    </Fragment>
  );
};

// TODO: ensure user for visible taks progress edit option (get user from state.auth.user)

const mapStateToProps = state => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { updateTaskProgress })(
  TaskSummarizeTable
);
