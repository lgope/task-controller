import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Form, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';
import dayjs from 'dayjs';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import EditTaskModal from './EditTaskModal.component';
import { getUserTasks } from '../../redux/actions/userActions';
import { updateTask, getFilterdTasks } from '../../redux/actions/taskActions';

import { showAlert } from '../alert';
import img_loader from '../../images/img_loader.webp';

const TaskSummarizeTable = ({
  user,
  tasks,
  getUserTasks,
  updateTask,
  getFilterdTasks,
  loading,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  // let data;
  const { SearchBar } = Search;

  useEffect(() => {
    getUserTasks();
    console.log('called !!');
  }, [isDataChanged, getUserTasks]);

  let rowsData = [];
  // const handleProgressChange = e => {
  //   const body = {
  //     progress: e.target.value,
  //   };

  //   updateTask(e.target.id, body);
  //   setIsDataChanged(!isDataChanged);
  //   showAlert('success', 'Task updated!');
  // };

  if (tasks.length > 0) {
    tasks.forEach(task => {
      rowsData.push({
        createdAt: dayjs(task.createdAt).format('MMMM DD YYYY'),
        taskName: task.taskName,
        progress: task.progress,
        comment: task.comment,
        action: (
          <EditTaskModal
            buttonLabel='edit'
            task={task}
            isDataChanged={isDataChanged}
            setIsDataChanged={setIsDataChanged}
          />
        ),
      });
    });
  }

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
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

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleBtnClick = e => {
    e.preventDefault();
    getFilterdTasks(user.email, fromDate, toDate);
    console.log('user ', user);

    console.log(fromDate, toDate);
  };

  const handleResetDate = e => {
    e.preventDefault();
    setIsDataChanged(!isDataChanged);
  };

  return (
    // <Fragment>
    //   {loading && (
    //     <div>
    //       <img src={img_loader} alt='loading' height='250px' width='350px' />
    //     </div>
    //   )}
    //   {!loading && data && (
    //     <>
    //       <h4>Tasks :</h4>
    //       <MDBDataTable striped bordered hover data={data} />;
    //     </>
    //   )}

    //   <h3>{!loading && tasks.length <= 0 && 'No task assigned yet!'}</h3>
    // </Fragment>

    <ToolkitProvider keyField='id' data={rowsData} columns={columns} search>
      {props => (
        <div>
          <Row>
            <Col lg='12'>
              <h4>All Tasks :</h4>
            </Col>
            <Col lg='6' md='8' sm='8'>
              <Form onSubmit={handleBtnClick}>
                {/* <Form> */}
                <input
                  type='date'
                  id='fromDate'
                  name='date'
                  placeholder='From Date'
                  required
                  onChange={e => handleTextFieldChange(setFromDate, e)}
                />
                <input
                  className='m-3'
                  type='date'
                  id='toDate'
                  name='date'
                  placeholder='To Date'
                  required
                  onChange={e => handleTextFieldChange(setToDate, e)}
                />

                <Button type='submit' outline color='info'>
                  Click
                </Button>
              </Form>
            </Col>
            <Col lg='3' md='4' sm='4'>
              <button
                className='text-info all_dailywork_btn'
                onClick={handleResetDate}
              >
                All
              </button>
            </Col>
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
  tasks: state.userRoutes.tasks,
  loading: state.userRoutes.loading,
});
export default connect(mapStateToProps, {
  getUserTasks,
  updateTask,
  getFilterdTasks,
})(TaskSummarizeTable);

// TODO: save double progress at a time problem
