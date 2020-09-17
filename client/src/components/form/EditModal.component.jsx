import React, { Fragment, useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
} from 'reactstrap';

import { connect } from 'react-redux';
import { updateWork } from '../../redux/actions/dailyWorkActions';

const EditModal = ({
  buttonLabel,
  data,
  updateWork,
  isDataChange,
  setIsDataChange,
}) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [des, setDes] = useState(data.description);

  const toggle = () => setModal(!modal);

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(title, des);
    const body = {
      title,
      description: des,
    };

    updateWork(data._id, body);

    setIsDataChange(!isDataChange);
  };

  return (
    <Fragment>
      <button
        className='btn btn-link text-info edit_modal_btn'
        title='Edit'
        onClick={toggle}
      >
        <i className='fas fa-sliders-h'></i>
        {/* {buttonLabel} */}
      </button>
      {/* <button
        className='btn btn-link text-danger ml-2 edit_modal_btn'
        title='Delete'
        onClick={() => console.log(data.title, data._id)}
      >
        <i className='fas fa-trash-alt'></i>
      </button> */}

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Edit Modal 🛠</ModalHeader>
        <Form onSubmit={handleSubmit}>
          <ModalBody>
            <FormGroup>
              <Input
                type='text'
                name='title'
                id='title'
                value={title}
                onChange={e => handleTextFieldChange(setTitle, e)} // {handleSetCompanyName}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='des'
                id='des'
                value={des}
                onChange={e => handleTextFieldChange(setDes, e)} // {handleSetCompanyName}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' type='submit'>
              Save
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default connect(null, {
  updateWork,
})(EditModal);
