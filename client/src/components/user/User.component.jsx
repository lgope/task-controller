import React, { useEffect, Fragment, useState } from 'react';

import { connect } from 'react-redux';
import dayjs from 'dayjs';
import swal from 'sweetalert';

import { getUserTasks } from '../../actions/userActions';
import { getUserWorks, saveTodayWork } from '../../actions/dailyWorkActions';

import DailyWorksTable from '../dailyWorks/DailyWorksTable.component';
import TaskSummarizeTable from '../task/TaskSummarizeTable.component';

const User = ({
  user,
  getUserTasks,
  getUserWorks,
  saveTodayWork,
  dailyWorks,
  userTasks,
  task,
  error,
}) => {
  const [isopen, setIsopen] = useState(false);
  const [isDataChange, setIsDataChange] = useState(false);
  const [inputFieldError, setInputFieldError] = useState('');
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  console.log('working page error ', error);

  useEffect(() => {
    // getUserTasks();
    getUserWorks(user._id);
  }, [isDataChange]);

  const handleAddBtnClick = () => {
    setIsopen(true);
  };

  const cancelBtnClick = () => {
    document.getElementById('works_input_form').reset();
    setIsopen(false);
  };

  const handleTitleChange = e => setTitle(e.target.value);
  const handleDescriptionChange = e => setDes(e.target.value);

  const handleSaveBtnClick = () => {
    if (title && des) {
      const body = {
        userId: user._id,
        title,
        description: des,
      };
      saveTodayWork(body);

      document.getElementById('works_input_form').reset();
      setIsDataChange(!isDataChange);
      setIsopen(false);
    }
  };

  // if (error.msg.message) {
  //   swal('Oops!', error.msg.message, 'error');
  //   error.msg.message = '';
  // }
  return (
    <Fragment>
      <div className='row'>
        <h5 className='col-md-8'>User name: {user.name}</h5>
        <h5 className='col-md-4'>Designation: {user.designation}</h5>
      </div>
      <br />

      {dailyWorks.userDailyWorks ? (
        <>
          <DailyWorksTable dailyWorks={dailyWorks.userDailyWorks} />
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
        </>
      ) : (
        <h2>Loading..</h2>
      )}

      {isopen && (
        <form id='works_input_form'>
          <tr className='text-center'>
            <td>
              <div className='form-group p-3'>
                <input
                  type='text'
                  className='form-control'
                  id='date'
                  value={dayjs(Date.now()).format('MMMM DD YYYY')}
                  readOnly
                />
              </div>
            </td>
            <td>
              <div className='form-group  p-4'>
                <input
                  type='text'
                  className='form-control'
                  id='title'
                  placeholder='Daily Work Title'
                  required
                  onChange={handleTitleChange}
                />
              </div>
            </td>
            <td>
              <div className='form-group  p-4'>
                <input
                  type='text'
                  className='form-control'
                  id='des'
                  placeholder='Description'
                  required
                  onChange={handleDescriptionChange}
                />
              </div>
            </td>
            <td>
              <button
                type='submit'
                className='btn btn-success'
                onClick={handleSaveBtnClick}
                style={{ borderRadius: '10px' }}
              >
                Save
              </button>

              <button
                type='button'
                className='btn btn-outline-warning'
                onClick={cancelBtnClick}
                style={{ borderRadius: '10px' }}
              >
                Cancel
              </button>
            </td>
          </tr>
        </form>
      )}

      {/* {userTasks.length > 0 ? (
        <TaskSummarizeTable tasks={userTasks} />
      ) : (
        <h4>No tasks assigned yet!! 🙂</h4>
      )} */}
    </Fragment>
  );
};

// TODO: progress change
const mapStateToProps = state => ({
  user: state.auth.user,
  userTasks: state.userRoutes.tasks,
  task: state.task.task,
  error: state.error,
  dailyWorks: state.dailyWorks.userWorks,
});
export default connect(mapStateToProps, {
  getUserTasks,
  getUserWorks,
  saveTodayWork,
})(User);
