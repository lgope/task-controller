import React from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import { connect } from 'react-redux';
import {
  getUserWorks,
  saveTodayWork,
} from '../../redux/actions/dailyWorkActions';

import DailyWorksTable from '../dailyWorks/DailyWorksTable.component';
import TaskSummarizeTable from '../task/TaskSummarizeTable.component';

const User = ({ user, isAuthenticated }) => {
  if ((user && user.role === 'admin') || isAuthenticated === false) {
    return <Redirect to='/' />;
  }

  return (
    <div className='user-page'>
      <div className='container'>
        {user && (
          <Row>
            <Col md='8'>
              <h5>User name: {user.name}</h5>
            </Col>
            <Col md='4'>
              <h5>Designation: {user.designation}</h5>
            </Col>
          </Row>
        )}
        <br />
        <Row>
          <Col lg='12' md='12' sm='12'>
            {/* daily works table */}
            <DailyWorksTable />

            {/* work add btn */}
            {/* <Button outline color='success' onClick={handleAddBtnClick}>
              Add New
            </Button> */}
          </Col>
        </Row>
        <br />
        <hr />
        <Row>
          {/* task summarize table */}
          <Col lg='12' md='12' sm='12'>
            <TaskSummarizeTable />
          </Col>
        </Row>
      </div>
    </div>
  );
};

// TODO: progress change
const mapStateToProps = state => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  isDailyWorkLoading: state.dailyWorks.loading,
  task: state.task.task,
  dailyW: state.dailyWorks,
  dailyWorks: state.dailyWorks.userWorks,
});
export default connect(mapStateToProps, {
  getUserWorks,
  saveTodayWork,
})(User);
