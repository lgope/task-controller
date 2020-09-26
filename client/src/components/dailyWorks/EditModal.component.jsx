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

import { showAlert } from '../alert';

const EditModal = ({ data, updateWork }) => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(data.title);
  const [des, setDes] = useState(data.description);

  const toggle = () => setModal(!modal);

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const body = {
      title,
      description: des,
    };

    updateWork(data._id, body);
    showAlert('success', 'Work updated successfully!');
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
                onChange={e => handleTextFieldChange(setTitle, e)}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='des'
                id='des'
                value={des}
                onChange={e => handleTextFieldChange(setDes, e)}
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
