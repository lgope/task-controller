import React, { Fragment, useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import Moment from 'react-moment';
import dayjs from 'dayjs';
import { getUserTasks } from '../../actions/userActions';

import { connect } from 'react-redux';
import { updateTaskProgress } from '../../actions/taskActions';
import { MDBDataTable } from 'mdbreact';

import Loading from '../loading/Loading.component';
import { showAlert } from '../alert';

const TaskSummarizeTable = ({
  tasks,
  getUserTasks,
  updateTaskProgress,
  loading,
  error,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);

  console.log('task loading', loading);
  useEffect(() => {
    getUserTasks();
  }, [isDataChanged]);

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
    tasks.map(task => {
      rowsData.push({
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
    const data = {
      columns: [
        {
          label: 'Task',
          field: 'taskName',
          sort: 'asc',
          width: 270,
        },
        {
          label: 'Progress',
          field: 'progress',
          sort: 'asc',
          width: 270,
        },
      ],
      rows: rowsData,
    };

    console.log(data.rows);
    return (
      <Fragment>
        {!loading && (
          <>
            <h4>Tasks : 👇</h4>
            <MDBDataTable striped bordered hover data={data} />;
          </>
        )}
      </Fragment>
    );
  }

  return <h2>{!tasks && tasks.length <= 0 && <h1>No task!</h1>}</h2>;
};

const mapStateToProps = state => ({
  tasks: state.userRoutes.tasks,
  loading: state.userRoutes.loading,
  error: state.error,
});
export default connect(mapStateToProps, { getUserTasks, updateTaskProgress })(
  TaskSummarizeTable
);

// TODO: save double progress at a time problem
