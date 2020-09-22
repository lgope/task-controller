import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import {
  getAllTask,
  deleteTasks,
  getFilterdTasks,
} from '../../redux/actions/taskActions';
import { getAllUsers } from '../../redux/actions/adminActions';
import { assignTask } from '../../redux/actions/adminActions';

import { connect } from 'react-redux';
import { MDBDataTable } from 'mdbreact';

import { showAlert } from '../alert';
import SaveBtn from '../form/SaveBtn.component';
import CancleBtn from '../form/CancleBtn.component';
import DateForm from '../form/DateForm.component';

const TaskInfo = ({
  isAuthenticated,
  user,
  getAllUsers,
  allUsers,
  tasks,
  loading,
  getAllTask,
  assignTask,
  deleteTasks,
  getFilterdTasks,
}) => {
  const [isDataChanged, setIsDataChanged] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [email, setEmail] = useState('');
  const [task, setTask] = useState('');
  let data;

  useEffect(() => {
    getAllTask();
  }, [isDataChanged, getAllTask]);

  if ((user && user.role === 'user') || isAuthenticated === false) {
    return <Redirect to='/' />;
  }

  const handleEmailChange = e => setEmail(e.target.value);
  const handleTaskChange = e => setTask(e.target.value);

  const handleAddBtnClick = () => {
    getAllUsers();
    setIsopen(true);
  };

  const cancelBtnClick = () => {
    document.getElementById('works_input_form').reset();
    setIsopen(false);
  };

  // delete task on delete button click
  const onDeleteClick = id => {
    deleteTasks(id);
  };

  const handleBtnClick = e => {
    e.preventDefault();
    getFilterdTasks(fromDate, toDate);
    // console.log('user ', user);
    // console.log(fromDate, toDate);
  };

  const handleResetDate = e => {
    e.preventDefault();
    setIsDataChanged(!isDataChanged);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (email && task) {
      const body = {
        userEmail: email,
        taskName: task,
      };

      assignTask(body);
      // setIsDataChanged(!isDataChanged);
      setEmail('');
      setTask('');
      setIsopen(false);
      showAlert('success', 'Task Assigned!');
    } else {
      showAlert('error', 'All fields are Required!');
    }
  };

  let rowsData = [];

  if (tasks && tasks.length > 0) {
    tasks.forEach(task => {
      rowsData.push({
        createdAt: dayjs(task.createdAt).format('h:mm a, MMMM DD, YYYY'),
        userEmail: task.userEmail,
        taskName: task.taskName,
        progress: task.progress,
        comment: task.comment,
        action: (
          <button
            className='btn btn-link text-danger edit_modal_btn'
            title='Delete'
            onClick={() => onDeleteClick(task._id)}
          >
            <i className='fas fa-trash-alt'></i>
          </button>
        ),
      });
    });
    data = {
      columns: [
        {
          label: 'Assigned Date',
          field: 'createdAt',
          sort: 'asc',
          width: 140,
        },
        {
          label: 'User',
          field: 'userEmail',
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
        {
          label: 'Comment',
          field: 'comment',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      rows: rowsData,
    };
  }

  if (loading) {
    return <h4>Loading....</h4>;
  }

  return (
    <div className='container'>
      <div>{tasks && tasks.length <= 0 && <h1>No task!</h1>}</div>;
      {tasks && tasks.length > 0 && (
        <>
          <h4>Tasks Info :</h4>
          <Row>
            <DateForm
              onSubmitClick={handleBtnClick}
              setFromDate={setFromDate}
              setToDate={setToDate}
              handleReset={handleResetDate}
            />
            <Col lg='3'>
              <Button
                outline
                color='success'
                style={{ borderRadius: '10px' }}
                onClick={handleAddBtnClick}
              >
                Assign New Task
              </Button>
            </Col>
          </Row>
          <MDBDataTable striped bordered hover fixed data={data} />
        </>
      )}
      <Row className='row-cols-1 pb-3'>
        <Col></Col>
      </Row>
      <Row className='pb-5 mb-5'>
        <Col lg='6' md='8' sm='12'>
          {isopen && (
            <Form id='works_input_form' onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type='select'
                  name='userEmail'
                  id='userEmail'
                  required
                  onChange={handleEmailChange}
                >
                  <option disabled selected defaultValue=''>
                    Assigned User
                  </option>
                  {allUsers &&
                    allUsers.map(user => (
                      <option key={user.email} data-subtext={user.name}>
                        {user.email}
                      </option>
                    ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  type='textarea'
                  id='task'
                  placeholder='Task'
                  required
                  onChange={handleTaskChange}
                />
              </FormGroup>
              <SaveBtn onClickFunc='' />
              <CancleBtn onClickFunc={cancelBtnClick} />
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  allUsers: state.admin.allUsers,
  tasks: state.task.tasks,
  loading: state.task.loading,
});
export default connect(mapStateToProps, {
  getAllTask,
  getAllUsers,
  assignTask,
  deleteTasks,
  getFilterdTasks,
})(TaskInfo);

// TODO: save double progress at a time problem
