import React from 'react';
import { Col, Form, Button } from 'reactstrap';

const DateForm = ({ onSubmitClick, setFromDate, setToDate, handleReset }) => {
  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };
  return (
    <>
      <Col lg='8' md='8' sm='8'>
        <Form onSubmit={onSubmitClick}>
          <input
            className='from-date'
            type='date'
            id='fromDate'
            name='date'
            title='From Date'
            required
            onChange={e => handleTextFieldChange(setFromDate, e)}
          />

          <input
            className='m-3 to-date'
            type='date'
            id='toDate'
            name='date'
            title='To Date'
            required
            onChange={e => handleTextFieldChange(setToDate, e)}
          />

          <Button
            className='date-click-btn  mb-2 mr-2'
            type='submit'
            outline
            color='info'
            title='CLICK'
          >
            Click
          </Button>
          <Button
            outline
            color='primary'
            className=' mb-2'
            title='ALL'
            onClick={handleReset}
          >
            All
          </Button>
        </Form>
      </Col>
    </>
  );
};

export default DateForm;
