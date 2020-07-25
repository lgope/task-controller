import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import Moment from 'react-moment';
import dayjs from 'dayjs';
import { getAllTask } from '../../actions/taskActions';
import { getAllUsers } from '../../actions/adminActions';
import { assignTask } from '../../actions/adminActions';

import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';

import Loading from '../loading/Loading.component';
import { showAlert } from '../alert';

const TaskInfo = ({
  auth,
  user,
  getAllUsers,
  allUsers,
  tasks,
  getAllTask,
  assignTask,
  loading,
  error,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [email, setEmail] = useState('');
  const [task, setTask] = useState('');
  let data;

  useEffect(() => {
    getAllUsers();
    getAllTask();
  }, [isDataChanged]);

  if (auth && !auth.user) {
    return <Redirect to='/' />;
  }

  if (user && user.role === 'user') {
    showAlert('error', 'This route is only for ADMIN! You are Not allowed ✋');
    return <Redirect to='/' />;
  }

  console.log('all users', allUsers);

  const handleEmailChange = e => setEmail(e.target.value);
  const handleTaskChange = e => setTask(e.target.value);

  const handleAddBtnClick = () => {
    setIsopen(true);
  };

  const cancelBtnClick = () => {
    document.getElementById('works_input_form').reset();
    setIsopen(false);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (email && task) {
      const body = {
        userEmail: email,
        taskName: task,
      };

      assignTask(body);
      setIsDataChanged(!isDataChanged);
      setEmail('');
      setTask('');
      setIsopen(false);
    } else {
      showAlert('error', 'All fields are Required!');
    }
  };

  let rowsData = [];

  if (tasks.tasks && tasks.tasks.length > 0) {
    tasks.tasks.map(task => {
      rowsData.push({
        createdAt: dayjs(task.createdAt).format('h:mm a, MMMM DD, YYYY'),
        user: task.user,
        taskName: task.taskName,
        progress: task.progress,
      });
    });
    data = {
      columns: [
        {
          label: 'Created At',
          field: 'createdAt',
          sort: 'asc',
          width: 140,
        },
        {
          label: 'User',
          field: 'user',
          sort: 'asc',
          width: 140,
        },
        {
          label: 'Task',
          field: 'taskName',
          sort: 'asc',
          width: 140,
        },
        {
          label: 'Progress',
          field: 'progress',
          sort: 'asc',
          width: 100,
        },
      ],
      rows: rowsData,
    };
  }

  return (
    <Fragment>
      <div>{tasks.tasks && tasks.tasks.length <= 0 && <h1>No task!</h1>}</div>;
      {tasks.tasks && tasks.tasks.length > 0 && (
        <>
          <h4>Tasks Info : 👇</h4>
          <MDBDataTable striped bordered hover fixed data={data} />
        </>
      )}
      <div className='add_btn'>
        <button
          type='button'
          className='btn btn-outline-success'
          style={{ borderRadius: '10px' }}
          onClick={handleAddBtnClick}
        >
          Add New
        </button>
      </div>
      <div className='row'>
        <div className='col-mx-12 col-md-12 col-sm-12'>
          {isopen && (
            <form id='works_input_form' onSubmit={handleSubmit}>
              <tr className='text-center'>
                <td>
                  <div className='form-group'>
                    <select
                      className='selectpicker form-control'
                      data-style='btn-outline-secondary'
                      name='userEmail'
                      data-show-subtext='true'
                      data-live-search='true'
                      searchable='Search here..'
                      onChange={handleEmailChange}
                      required
                    >
                      <option disabled selected>
                        Assigned User
                      </option>
                      {allUsers.map(user => (
                        <option data-subtext={user.name}>{user.email}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td>
                  <div className='form-group  p-2'>
                    <textarea
                      className='form-control'
                      id='title'
                      rows='1'
                      cols='26'
                      placeholder='Task'
                      required
                      onChange={handleTaskChange}
                    ></textarea>
                  </div>
                </td>
                <td></td>
                <td>
                  <button
                    type='submit'
                    className='btn btn-success'
                    title='Save'
                    style={{ borderRadius: '10px' }}
                  >
                    <i
                      className='far fa-check-circle'
                      style={{ fontSize: '20px' }}
                    ></i>
                  </button>

                  <button
                    type='button'
                    className='btn btn-outline-warning'
                    title='Cancle'
                    onClick={cancelBtnClick}
                    style={{ borderRadius: '10px' }}
                  >
                    <i
                      className='fas fa-minus cc_pointer'
                      style={{ fontSize: '15px' }}
                    ></i>
                  </button>
                </td>
              </tr>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

// TODO: ensure user for visible taks progress edit option (get user from state.auth.user)

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user,
  allUsers: state.admin.allUsers.users,
  tasks: state.task.tasks,
  loading: state.task.loading,
  error: state.error,
});
export default connect(mapStateToProps, {
  getAllTask,
  getAllUsers,
  assignTask,
})(TaskInfo);

// TODO: save double progress at a time problem
