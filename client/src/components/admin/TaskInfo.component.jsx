import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import dayjs from 'dayjs';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import { getAllTask } from '../../redux/actions/taskActions';
import { getAllUsers } from '../../redux/actions/adminActions';
import { assignTask } from '../../redux/actions/adminActions';

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
    getAllTask();
    getAllUsers();
  }, [isDataChanged, getAllTask, getAllUsers]);

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
    tasks.tasks.forEach(task => {
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
          <h4>
            Tasks Info :{' '}
            <span role='img' aria-label='down-sign'>
              👇
            </span>
          </h4>
          <MDBDataTable striped bordered hover fixed data={data} />
        </>
      )}
      <Row className='row-cols-1 pb-3'>
        <Col>
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
