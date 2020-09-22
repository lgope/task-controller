import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'reactstrap';
import { connect } from 'react-redux';
import dayjs from 'dayjs';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import EditTaskModal from './EditTaskModal.component';
import { getUserTasks } from '../../redux/actions/userActions';
import {
  updateTask,
  geUsertFilterdTasks,
} from '../../redux/actions/taskActions';
import DateForm from '../form/DateForm.component';

import { showAlert } from '../alert';
import img_loader from '../../images/img_loader.webp';

const TaskSummarizeTable = ({
  user,
  tasks,
  getUserTasks,
  updateTask,
  geUsertFilterdTasks,
  loading,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  // let data;
  const { SearchBar } = Search;

  useEffect(() => {
    getUserTasks();
  }, [isDataChanged, getUserTasks]);

  let rowsData = [];

  console.log('tasks ', tasks);

  if (tasks.length > 0) {
    tasks.forEach(task => {
      rowsData.push({
        createdAt: dayjs(task.createdAt).format('MMMM DD YYYY'),
        taskName: task.taskName,
        progress: task.progress,
        comment: task.comment,
        action: <EditTaskModal task={task} />,
      });
    });
  }

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 5,
    // hideSizePerPage: true,
    // hidePageListOnlyOnePage: true,
  };

  const columns = [
    {
      text: 'Assigned Date',
      dataField: 'createdAt',
      sort: 'asc',
    },
    {
      text: 'Task',
      dataField: 'taskName',
      sort: 'asc',
    },
    {
      text: 'Progress',
      dataField: 'progress',
      sort: 'asc',
    },
    {
      text: 'Comment',
      dataField: 'comment',
      sort: 'asc',
    },
    {
      dataField: 'action',
      text: 'Action',
      headerAlign: 'center',
      align: 'center',
    },
  ];

  const handleBtnClick = e => {
    e.preventDefault();
    geUsertFilterdTasks(user.email, fromDate, toDate);
    console.log('user ', user);

    console.log(fromDate, toDate);
  };

  const handleResetDate = e => {
    e.preventDefault();
    setIsDataChanged(!isDataChanged);
  };

  return (
    <ToolkitProvider keyField='id' data={rowsData} columns={columns} search>
      {props => (
        <div>
          <Row>
            <Col lg='12'>
              <h4>All Tasks :</h4>
            </Col>
            <DateForm
              onSubmitClick={handleBtnClick}
              setFromDate={setFromDate}
              setToDate={setToDate}
              handleReset={handleResetDate}
            />
            <Col lg='3' md='4' sm='4'>
              <SearchBar
                {...props.searchProps}
                className='custome-search-field'
                style={{ color: 'black' }}
                placeholder='Search'
              />
            </Col>
          </Row>
          <BootstrapTable
            keyField='id'
            hover
            {...props.baseProps}
            pagination={paginationFactory(options)}
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  tasks: state.userReducer.tasks,
  loading: state.userReducer.loading,
});
export default connect(mapStateToProps, {
  getUserTasks,
  updateTask,
  geUsertFilterdTasks,
})(TaskSummarizeTable);

// TODO: save double progress at a time problem
