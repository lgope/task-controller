import React, { Fragment, useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';

import { connect } from 'react-redux';
import dayjs from 'dayjs';

import {
  getUserWorks,
  saveTodayWork,
} from '../../redux/actions/dailyWorkActions';

import DailyWorksTable from '../dailyWorks/DailyWorksTable.component';
import TaskSummarizeTable from '../task/TaskSummarizeTable.component';
import { showAlert } from '../alert';
import SaveBtn from '../buttons/SaveBtn.component';
import CancleBtn from '../buttons/CancleBtn.component';

const User = ({
  user,
  isAuthenticated,
  getUserWorks,
  saveTodayWork,
  dailyWorks,
}) => {
  const [isopen, setIsopen] = useState(false);
  const [isDataChange, setIsDataChange] = useState(false);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');

  useEffect(() => {
    if (user) {
      getUserWorks(user._id);
    }
  }, [user, isDataChange, getUserWorks]);

  useCallback(() => {
    console.log('useCallback called!!');
  }, []);

  // check user role is user && auth
  if ((user && user.role === 'admin') || isAuthenticated === false) {
    return <Redirect to='/' />;
  }

  const handleAddBtnClick = () => {
    setIsopen(true);
  };

  const cancelBtnClick = () => {
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

      setIsDataChange(!isDataChange);
      setIsopen(false);
      showAlert('success', 'Your work has been saved!');
    }
  };

  return (
    <Fragment>
      <Row>
        <Col md='8'>
          <h5>User name: {user && user.name}</h5>
        </Col>
        <Col md='4'>
          <h5>Designation: {user && user.designation}</h5>
        </Col>
      </Row>
      <br />

      <Row>
        <Col lg='8' md='8' sm='12'>
          {dailyWorks.userDailyWorks && dailyWorks.userDailyWorks.length > 0 && (
            <>
              <h4>
                Daily Works :{' '}
                <span role='img' aria-label='down-sign'>
                  👇
                </span>
              </h4>
              <DailyWorksTable dailyWorks={dailyWorks.userDailyWorks} />
            </>
          )}

          {dailyWorks.userDailyWorks && dailyWorks.userDailyWorks.length === 0 && (
            <h4>
              No daily works Saved Yet! Add Now..{' '}
              <span role='img' aria-label='down-sign'>
                👇
              </span>
            </h4>
          )}

          {/* work add btn */}
          <Button outline color='success' onClick={handleAddBtnClick}>
            Add New
          </Button>

          {isopen && (
            <Form className='pt-2 pb-2 mb-5'>
              <FormGroup>
                <Input
                  type='text'
                  id='date'
                  value={dayjs(Date.now()).format('MMMM DD YYYY')}
                  readOnly
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='textarea'
                  className='form-control'
                  id='title'
                  placeholder='Daily Work Title'
                  required
                  onChange={handleTitleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type='textarea'
                  className='form-control'
                  id='des'
                  placeholder='Description'
                  required
                  onChange={handleDescriptionChange}
                />
              </FormGroup>
              <SaveBtn onClickFunc={handleSaveBtnClick} />
              <CancleBtn onClickFunc={cancelBtnClick} />
            </Form>
          )}
        </Col>

        {/* task summarize table */}
        <Col lg='4' md='4' sm='12'>
          <TaskSummarizeTable />
        </Col>
      </Row>
    </Fragment>
  );
};

// TODO: progress change
const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  task: state.task.task,
  dailyW: state.dailyWorks,
  dailyWorks: state.dailyWorks.userWorks,
});
export default connect(mapStateToProps, {
  getUserWorks,
  saveTodayWork,
})(User);
