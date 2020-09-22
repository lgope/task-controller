import React, { useState } from 'react';
import { Row, Col, Form, Button } from 'reactstrap';
import dayjs from 'dayjs';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import { connect } from 'react-redux';
import { getUserFilterdWorks } from '../../redux/actions/dailyWorkActions';
import DateForm from '../form/DateForm.component';

import EditModal from '../form/EditModal.component';

const DailyWorksTable = ({
  isDataChange,
  setIsDataChange,
  userId,
  dailyWorks,
  getUserFilterdWorks,
}) => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const { SearchBar } = Search;

  let rowsData = [];

  // storing user daily works data in rows data
  dailyWorks.forEach(da =>
    rowsData.push({
      id: da._id,
      another: '5%',
      date: dayjs(da.date).format('MMMM DD YYYY'),
      title: da.title,
      description: da.description,
      action: <EditModal data={da} />,
    })
  );

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

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleBtnClick = e => {
    e.preventDefault();
    getUserFilterdWorks(userId, fromDate, toDate);
    console.log(fromDate, toDate);
  };

  const handleResetDate = e => {
    e.preventDefault();
    setIsDataChange(!isDataChange);
  };

  return (
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
            hover
            {...props.baseProps}
            pagination={paginationFactory(options)}
          />
        </div>
      )}
    </ToolkitProvider>
  );
};

export default connect(null, {
  getUserFilterdWorks,
})(DailyWorksTable);

// return <MDBDataTable striped bordered hover small data={data} />;
