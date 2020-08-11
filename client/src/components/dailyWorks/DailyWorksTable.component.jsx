import React from 'react';
import { Row, Col, Form } from 'reactstrap';
import dayjs from 'dayjs';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const DailyWorksTable = ({ handleResetDate, dailyWorks }) => {
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
  ];

  return (
    <ToolkitProvider keyField='id' data={rowsData} columns={columns} search>
      {props => (
        <div>
          <button onClick={handleResetDate}>Reset</button>
          <Row>
            <Col lg='10' md='8' sm='8'>
              <Form>
                <input
                  type='date'
                  id='fromDate'
                  name='date'
                  placeholder='From Date'
                  // onChange={handleFromDate}
                />
                <input
                  className='m-3'
                  type='date'
                  id='toDate'
                  name='date'
                  placeholder='To Date'
                  // onChange={handleFromDate}
                />
              </Form>
            </Col>
            <Col lg='2' md='4' sm='4'>
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

export default DailyWorksTable;

// return <MDBDataTable striped bordered hover small data={data} />;
