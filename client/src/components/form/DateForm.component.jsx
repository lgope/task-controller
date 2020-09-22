import React from 'react';
import { Col, Form, Button } from 'reactstrap';

const DateForm = ({ onSubmitClick, setFromDate, setToDate, handleReset }) => {
  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };
  return (
    <>
      <Col lg='6' md='8' sm='8'>
        <Form onSubmit={onSubmitClick}>
          {/* <Form> */}
          <input
            type='date'
            id='fromDate'
            name='date'
            title='From Date'
            required
            onChange={e => handleTextFieldChange(setFromDate, e)}
          />
          <input
            className='m-3'
            type='date'
            id='toDate'
            name='date'
            title='To Date'
            required
            onChange={e => handleTextFieldChange(setToDate, e)}
          />

          <Button type='submit' outline color='info'>
            Click
          </Button>
        </Form>
      </Col>
      <Col lg='3' md='4' sm='4'>
        <button className='text-info all_dailywork_btn' onClick={handleReset}>
          All
        </button>
      </Col>
    </>
  );
};

export default DateForm;
