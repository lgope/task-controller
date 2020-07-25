import React, { useEffect, Fragment, useState } from 'react';

import { connect } from 'react-redux';
import dayjs from 'dayjs';

// import { getUserTasks } from '../../actions/userActions';
import { getUserWorks, saveTodayWork } from '../../actions/dailyWorkActions';

import DailyWorksTable from '../dailyWorks/DailyWorksTable.component';
import TaskSummarizeTable from '../task/TaskSummarizeTable.component';
import Loading from '../loading/Loading.component';
import { showAlert } from '../alert';

const User = ({
  user,
  getUserWorks,
  saveTodayWork,
  dailyWorks,
  userTasks,
  task,
  dailyW,
  error,
}) => {
  const [isopen, setIsopen] = useState(false);
  const [isDataChange, setIsDataChange] = useState(false);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  console.log('working page error ', error);

  console.log('user id::: check 11 :: ', dailyWorks.userDailyWorks);
  console.log('isData Changged: ', isDataChange);

  useEffect(() => {
    console.log('useEffect called user com');
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

  const handleSaveBtnClick = e => {
    e.preventDefault();
    if (title && des) {
      const body = {
        userId: user._id,
        userName: user.name,
        title,
        description: des,
      };
      saveTodayWork(body);

      document.getElementById('works_input_form').reset();
      setIsDataChange(!isDataChange);
      setIsopen(false);
      showAlert('success', 'Your work has been saved!');
      setTitle('');
      setDes('');
    }
  };

  return (
    <Fragment>
      <div className='row'>
        <h5 className='col-md-8'>User name: {user.name}</h5>
        <h5 className='col-md-4'>Designation: {user.designation}</h5>
      </div>
      <br />

      <div className='row'>
        <div className='col-sm-12 col-md-8 col-mx-8'>
          {dailyW.loading && <Loading />}

          {dailyWorks.userDailyWorks && dailyWorks.userDailyWorks.length > 0 && (
            <>
              <h4>Daily Works : 👇</h4>
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
          )}

          {dailyWorks.userDailyWorks && dailyWorks.userDailyWorks.length === 0 && (
            <>
              <h4>No daily works Saved Yet! Add Now.. 👇</h4>
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
          )}
        </div>

        <div className='col-sm-12 col-md-4 col-mx-4'>
          <TaskSummarizeTable />
        </div>
      </div>

      <div className='row'>
        <div className='col-mx-12 col-md-12 col-sm-12'>
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
                  <div className='form-group  p-2'>
                    <textarea
                      class='form-control'
                      id='title'
                      rows='2'
                      cols='26'
                      placeholder='Daily Work Title'
                      required
                      onChange={handleTitleChange}
                    ></textarea>
                  </div>
                </td>
                <td>
                  <div className='form-group  p-2'>
                    <textarea
                      class='form-control'
                      id='des'
                      rows='2'
                      cols='40'
                      placeholder='Description'
                      required
                      onChange={handleDescriptionChange}
                    ></textarea>
                  </div>
                </td>
                <td>
                  <button
                    type='submit'
                    className='btn btn-success'
                    onClick={handleSaveBtnClick}
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

// TODO: progress change
const mapStateToProps = state => ({
  user: state.auth.user,
  // userTasks: state.userRoutes.tasks,
  task: state.task.task,
  error: state.error,
  dailyW: state.dailyWorks,
  dailyWorks: state.dailyWorks.userWorks,
});
export default connect(mapStateToProps, {
  // getUserTasks,
  getUserWorks,
  saveTodayWork,
})(User);
