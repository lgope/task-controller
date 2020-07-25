import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  // Alert,
} from 'reactstrap';

import { addUser } from '../../actions/adminActions';

// TODO: Name input field and save

const AddUserForm = ({
  buttonLabel,
  isDataChanged,
  setIsDataChanged,
  addUser,
  error,
}) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [desi, setDesi] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const toggle = () => setModal(!modal);

  const handleChangeName = event => setName(event.target.value);
  const handleChangeDesignation = event => setDesi(event.target.value);
  const handleChangeEmail = event => setEmail(event.target.value);
  const handleChangePassword = event => setPass(event.target.value);

  const handleOnSubmit = event => {
    event.preventDefault();
    const body = {
      name,
      designation: desi,
      email,
      password: pass,
    };
    console.log(name, desi, email, pass);
    addUser(body);
    setIsDataChanged(!isDataChanged);
    toggle();
  };

  return (
    <div>
      <Button color='danger' onClick={toggle}>
        {buttonLabel}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New User Form.</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input
                type='name'
                name='name'
                id='name'
                className='mb-3'
                placeholder='Name'
                required
                onChange={handleChangeName}
              />

              <Label for='designation'>Designation</Label>
              <Input
                type='text'
                name='designation'
                id='designation'
                className='mb-3'
                placeholder='Designation'
                required
                onChange={handleChangeDesignation}
              />

              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                className='mb-3'
                placeholder='Email'
                required
                onChange={handleChangeEmail}
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                className='mb-3'
                placeholder='Password'
                required
                onChange={handleChangePassword}
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

export default connect(mapStateToProps, { addUser })(AddUserForm);
