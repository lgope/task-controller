import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import dayjs from 'dayjs';

import { getUserTasks } from '../../redux/actions/userActions';
import { updateTaskProgress } from '../../redux/actions/taskActions';

import { showAlert } from '../alert';
import img_loader from '../../images/img_loader.webp';

const TaskSummarizeTable = ({
  tasks,
  getUserTasks,
  updateTaskProgress,
  loading,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  let data;

  useEffect(() => {
    getUserTasks();
  }, [isDataChanged, getUserTasks]);

  let rowsData = [];
  const handleProgressChange = e => {
    const body = {
      progress: e.target.value,
    };

    updateTaskProgress(e.target.id, body);
    setIsDataChanged(!isDataChanged);
    showAlert('success', 'Progress updated!');
  };

  if (tasks.length > 0) {
    tasks.forEach(task => {
      rowsData.push({
        createdAt: dayjs(task.createdAt).format('MMMM DD YYYY'),
        taskName: task.taskName,
        pro_search: task.progress,
        progress: (
          <select
            className='selectpicker'
            style={{ border: '0' }}
            data-size='10'
            data-style='btn-info'
            id={task._id}
            onChange={handleProgressChange}
          >
            <option>{task.progress}</option>
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
        ),
      });
    });
    data = {
      columns: [
        {
          label: 'Assigned Date',
          field: 'createdAt',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Task',
          field: 'taskName',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Progress',
          field: 'progress',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
          width: 100,
        },
      ],
      rows: rowsData,
    };
  }

  return (
    <Fragment>
      {loading && (
        <div>
          <img src={img_loader} alt='loading' height='250px' width='350px' />
        </div>
      )}
      {!loading && data && (
        <>
          <h4>
            Tasks :{' '}
            <span role='img' aria-label='down-sign'>
              👇
            </span>
          </h4>
          <MDBDataTable striped bordered hover data={data} />;
        </>
      )}

      <h3>{!loading && tasks.length <= 0 && 'No task assigned yet! 🙂'}</h3>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  tasks: state.userRoutes.tasks,
  loading: state.userRoutes.loading,
});
export default connect(mapStateToProps, { getUserTasks, updateTaskProgress })(
  TaskSummarizeTable
);

// TODO: save double progress at a time problem
