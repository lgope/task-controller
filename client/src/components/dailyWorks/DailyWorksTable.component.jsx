import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Form, FormGroup, Input } from 'reactstrap';
import dayjs from 'dayjs';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux';
import {
  getUserWorks,
  saveTodayWork,
} from '../../redux/actions/dailyWorkActions';
import { getUserFilterdWorks } from '../../redux/actions/dailyWorkActions';
import DateForm from '../form/DateForm.component';

import ShowModal from '../form/ShowModal.component';
import EditModal from './EditModal.component';
import LoadingSkeleton from '../loading/LoadingSkeleton.component';

import { showAlert } from '../alert';
import SaveBtn from '../form/SaveBtn.component';
import CancleBtn from '../form/CancleBtn.component';

const DailyWorksTable = ({
  user,
  isDailyWorkLoading,
  getUserWorks,
  saveTodayWork,
  dailyWorks,
  getUserFilterdWorks,
}) => {
  const [isDataChange, setIsDataChange] = useState(false);
  const [isopen, setIsopen] = useState(false);
  const [title, setTitle] = useState('');
  const [des, setDes] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { SearchBar } = Search;
  let rowsData = [];

  useEffect(() => {
    if (user) {
      getUserWorks(user._id);
    }
  }, [user, isDataChange, getUserWorks]);

  if (isDailyWorkLoading) return <LoadingSkeleton />;
  // storing user daily works data in rows data

  if (dailyWorks.length > 0) {
    dailyWorks.forEach(da =>
      rowsData.push({
        id: da._id,
        date: dayjs(da.createdAt).format('MMMM DD YYYY'),
        title: da.title,
        description:
          da.description.length >= 25 ? (
            <ShowModal
              buttonLabel={da.description.substr(0, 25) + '...'}
              data={da.description}
            />
          ) : (
            da.description
          ),
        action: <EditModal data={da} />,
      })
    );
  }

  const options = {
    // pageStartIndex: 0,
    sizePerPage: 5,
    hideSizePerPage: true,
    hidePageListOnlyOnePage: true,
  };
  const columns = [
    {
      dataField: 'date',
      text: 'Date',
      sort: true,
    },
    {
      dataField: 'title',
      text: 'Daily work Title',
      sort: true,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
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
    getUserFilterdWorks(user._id, fromDate, toDate);
  };

  const handleResetDate = e => {
    e.preventDefault();
    setIsDataChange(!isDataChange);
  };

  const handleAddBtnClick = () => setIsopen(true);

  const cancelBtnClick = () => setIsopen(false);

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
      setIsopen(false);
      showAlert('success', 'Your work has been saved!');
    }
  };

  return (
    <>
      <h4>Daily Works : </h4>
      {dailyWorks.length > 0 ? (
        <ToolkitProvider keyField='id' data={rowsData} columns={columns} search>
          {props => (
            <div>
              <Row>
                <DateForm
                  onSubmitClick={handleBtnClick}
                  setFromDate={setFromDate}
                  setToDate={setToDate}
                  handleReset={handleResetDate}
                />
                <Col lg='4' md='4' sm='4' className='mt-4'>
                  <SearchBar
                    {...props.searchProps}
                    className='custome-search-field'
                    style={{ color: 'black' }}
                    placeholder='Search'
                  />
                </Col>
              </Row>
              <BootstrapTable
                hover
                {...props.baseProps}
                pagination={paginationFactory(options)}
              />
            </div>
          )}
        </ToolkitProvider>
      ) : (
        <h5>No daily works Saved Yet! Add Now.. </h5>
      )}
      <Button outline color='success' onClick={handleAddBtnClick}>
        Add New
      </Button>{' '}
      <br />
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
    </>
  );
};

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
  getUserFilterdWorks,
})(DailyWorksTable);

// return <MDBDataTable striped bordered hover small data={data} />;
