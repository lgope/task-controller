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
import { updateTask } from '../../redux/actions/taskActions';

import { showAlert } from '../alert';

const EditModal = ({ task, updateTask }) => {
  const [modal, setModal] = useState(false);
  const [progress, setProgress] = useState(task.progress);
  const [comment, setComment] = useState(task.comment);

  const toggle = () => setModal(!modal);

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // console.log(progress, comment);
    const body = {
      progress,
      comment,
    };

    // updateWork(data._id, body);
    updateTask(task._id, body);

    // setIsDataChanged(!isDataChanged);
    showAlert('success', 'Task updated successfully!');
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
                name='Progress'
                id='progress'
                value={progress}
                onChange={e => handleTextFieldChange(setProgress, e)} // {handleSetCompanyName}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type='text'
                name='comment'
                id='comment'
                value={comment}
                onChange={e => handleTextFieldChange(setComment, e)} // {handleSetCompanyName}
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
  updateTask,
})(EditModal);
