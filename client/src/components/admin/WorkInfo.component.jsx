import React, { useState } from 'react';
import { MDBDataTable } from 'mdbreact';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Row } from 'reactstrap';

import {
  deleteDailyWorks,
  getFilterdWorks,
} from '../../redux/actions/dailyWorkActions';
import DateForm from '../form/DateForm.component';
import ShowModal from '../form/ShowModal.component';
import { showAlert } from '../alert';
const DailyWorksTable = ({
  dailyWorks,
  setIsDataChanged,
  isDataChanged,
  deleteDailyWorks,
  getFilterdWorks,
}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  let rowsData = [];

  const onDeleteClick = id => {
    deleteDailyWorks(id);
    showAlert('success', 'Work Deleted Successfully!');
  };
  // storing daily works data in rows data
  dailyWorks.forEach(da =>
    rowsData.push({
      userName: da.userName,
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
      action: (
        <button
          className='btn btn-link text-danger edit_modal_btn'
          title='Delete'
          onClick={() => onDeleteClick(da._id)}
        >
          <i className='fas fa-trash-alt'></i>
        </button>
      ),
    })
  );

  const handleBtnClick = e => {
    e.preventDefault();
    getFilterdWorks(fromDate, toDate);
    // console.log('user ', user);
    console.log(fromDate, toDate);
  };

  const handleResetDate = e => {
    e.preventDefault();
    setIsDataChanged(!isDataChanged);
  };

  const data = {
    columns: [
      {
        label: 'User Name',
        field: 'userName',
        sort: 'asc',
        width: 90,
        height: 40,
        overflowY: 'scroll',
      },
      {
        label: 'Date',
        field: 'date',
        sort: 'asc',
        width: 90,
        height: 40,
        overflowY: 'scroll',
      },
      {
        label: 'Daily work Title',
        field: 'title',
        sort: 'asc',
        width: 100,
        height: 40,
        overflowY: 'scroll',
      },
      {
        label: 'Description',
        field: 'description',
        sort: 'asc',
        width: 270,
      },
      {
        label: 'Action',
        field: 'action',
      },
    ],
    rows: rowsData,
  };

  return (
    <>
      <Row>
        <DateForm
          onSubmitClick={handleBtnClick}
          setFromDate={setFromDate}
          setToDate={setToDate}
          handleReset={handleResetDate}
        />
      </Row>
      <MDBDataTable striped bordered hover small data={data} />;
    </>
  );
};

export default connect(null, {
  deleteDailyWorks,
  getFilterdWorks,
})(DailyWorksTable);
