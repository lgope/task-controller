import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from 'reactstrap'; // ADD_USER_FAIL

import { addUser } from '../../redux/actions/adminActions';
import { clearErrors } from '../../redux/actions/errorActions';

// TODO: Name input field and save

const AddUserForm = ({ buttonLabel, addUser, clearErrors, error }) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [desi, setDesi] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');

  const toggle = () => {
    clearErrors();
    setModal(!modal);
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'ADD_USER_FAIL') {
      setMsg(error.msg.message);
    } else {
      setMsg(null);
    }
  }, [error]);

  const handleTextFieldChange = (mySetFunction, event) => {
    mySetFunction(event.currentTarget.value);
  };
  const handleOnSubmit = event => {
    event.preventDefault();
    const body = {
      name,
      designation: desi,
      email,
      password: pass,
    };
    addUser(body);
    clearErrors();
    document.getElementById('input_form').reset();
  };

  return (
    <div>
      <Button color='danger' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New User Form.</ModalHeader>
        <ModalBody>
          {msg ? <Alert color='danger'>{msg}</Alert> : null}
          <Form id='input_form'>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='name'
                name='name'
                id='name'
                className='mb-3'
                placeholder='Name'
                required
                onChange={e => handleTextFieldChange(setName, e)}
              />

              <Label for='designation'>Designation</Label>
              <Input
                type='text'
                name='designation'
                id='designation'
                className='mb-3'
                placeholder='Designation'
                required
                onChange={e => handleTextFieldChange(setDesi, e)}
              />

              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                className='mb-3'
                placeholder='Email'
                required
                onChange={e => handleTextFieldChange(setEmail, e)}
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                className='mb-3'
                placeholder='Password'
                required
                onChange={e => handleTextFieldChange(setPass, e)}
              />
              <Button
                color='dark'
                style={{ marginTop: '2rem' }}
                block
                onClick={handleOnSubmit}
              >
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps, { addUser, clearErrors })(AddUserForm);
