import React, { useState, useEffect } from 'react';
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
import CancleBtn from '../form/CancleBtn.component';
import DateForm from '../form/DateForm.component';
import ShowModal from '../form/ShowModal.component';
import Loading from '../loading/Loading.component';

const TaskInfo = ({
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

  // getting all tasks from database
  useEffect(() => {
    getAllTask();
  }, [isDataChanged, getAllTask]);

  // save value on change
  const handleEmailChange = e => setEmail(e.target.value);
  const handleTaskChange = e => setTask(e.target.value);

  // getting all user from data base
  const handleAddBtnClick = () => {
    getAllUsers();
    setIsopen(true);
  };

  // close work input form
  const cancelBtnClick = () => {
    document.getElementById('works_input_form').reset();
    setIsopen(false);
  };

  // delete task on delete button click
  const onDeleteClick = id => {
    deleteTasks(id);
    showAlert('success', 'Task Deleted successfully!');
  };

  // getting data based on date
  const handleBtnClick = e => {
    e.preventDefault();
    getFilterdTasks(fromDate, toDate);
  };

  // reset data on all btn click
  const handleResetDate = e => {
    e.preventDefault();
    setIsDataChanged(!isDataChanged);
  };

  // assign new task to a user
  const handleSubmit = event => {
    event.preventDefault();

    if (email && task) {
      const body = {
        userEmail: email,
        taskName: task,
        comment: '',
      };

      assignTask(body);
      // setIsDataChanged(!isDataChanged);
      setEmail('');
      setTask('');
      setIsopen(false);
      showAlert('success', 'Task Assigned successfully!');
    } else {
      showAlert('error', 'All fields are Required!');
    }
  };

  let rowsData = [];

  if (tasks.length > 0) {
    tasks.forEach(task => {
      rowsData.push({
        createdAt: dayjs(task.createdAt).format('h:mm a, MMMM DD, YYYY'),
        userEmail: task.userEmail,
        taskName: task.taskName,
        // progress: <center>{task.progress}</center>,
        progress: task.progress,
        comment:
          task.comment.length >= 25 ? (
            <ShowModal
              buttonLabel={task.comment.substr(0, 25) + '...'}
              data={task.comment}
            />
          ) : (
            task.comment
          ),
        action: (
          <center>
            <button
              className='btn btn-link text-danger edit_modal_btn'
              title='Delete'
              onClick={() => onDeleteClick(task._id)}
            >
              <i className='fas fa-trash-alt'></i>
            </button>
          </center>
        ),
      });
    });
    data = {
      columns: [
        {
          label: 'Assigned Date',
          field: 'createdAt',
          sort: true,
          width: 140,
        },
        {
          label: 'User',
          field: 'userEmail',
          sort: true,
          width: 140,
        },
        {
          label: 'Task',
          field: 'taskName',
          sort: true,
          width: 140,
        },
        {
          label: 'Progress',
          field: 'progress',
          sort: true,
          width: 100,
        },
        {
          label: 'Comment',
          field: 'comment',
          sort: true,
          width: 100,
        },
        {
          label: <center>Action</center>,
          field: 'action',
        },
      ],
      rows: rowsData,
    };
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='admin-taskinfo'>
      <div className='container'>
        <div>{tasks.length < 0 && <h1>No task!</h1>}</div>
        {tasks.length > 0 && (
          <>
            <h4>Tasks Informations :</h4>
            <Row>
              <DateForm
                onSubmitClick={handleBtnClick}
                setFromDate={setFromDate}
                setToDate={setToDate}
                handleReset={handleResetDate}
              />
              <Col lg='3' className='pt-4'>
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
                    <option disabled selected>
                      Assign User
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
                <Button className='mr-2' outline color='secondary' title='save'>
                  Save
                </Button>
                <CancleBtn onClickFunc={cancelBtnClick} />
              </Form>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
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
