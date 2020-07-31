import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { getAllTask } from '../../actions/taskActions';
import { getAllUsers } from '../../actions/adminActions';
import { assignTask } from '../../actions/adminActions';

import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';

import { showAlert } from '../alert';
import SaveBtn from '../buttons/SaveBtn.component';
import CancleBtn from '../buttons/CancleBtn.component';

const TaskInfo = ({
  isAuthenticated,
  user,
  getAllUsers,
  allUsers,
  tasks,
  getAllTask,
  assignTask,
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

  if ((user && user.role === 'user') || isAuthenticated === false) {
    return <Redirect to='/' />;
  }

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
      showAlert('success', 'Task Assigned!');
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
      <div className='add_btn row-cols-1 pb-3'>
        <button
          type='button'
          className='btn btn-outline-success'
          style={{ borderRadius: '10px' }}
          onClick={handleAddBtnClick}
        >
          Assign New Task
        </button>
      </div>
      <div className='row pb-5 mb-5'>
        <div className='col-mx-12 col-md-12 col-sm-12'>
          {isopen && (
            <form id='works_input_form' onSubmit={handleSubmit}>
              <table>
                <tbody>
                  <tr className='text-center'>
                    <td>
                      <div className='form-group'>
                        <select
                          className='form-control'
                          data-style='btn-outline-secondary'
                          name='userEmail'
                          onChange={handleEmailChange}
                          required
                        >
                          <option disabled selected defaultValue=''>
                            Assigned User
                          </option>
                          {allUsers.map(user => (
                            <option key={user.email} data-subtext={user.name}>
                              {user.email}
                            </option>
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
                      <SaveBtn onClickFunc='' />
                      <CancleBtn onClickFunc={cancelBtnClick} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          )}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  allUsers: state.admin.allUsers.users,
  tasks: state.task.tasks,
});
export default connect(mapStateToProps, {
  getAllTask,
  getAllUsers,
  assignTask,
})(TaskInfo);

// TODO: save double progress at a time problem
