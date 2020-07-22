import React, { useState } from 'react';
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
  Alert,
} from 'reactstrap';

// TODO: Name input field and save

const AddUserForm = ({ buttonLabel }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

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
                // onChange={handleChangeEmail}
              />

              <Label for='designation'>Designation</Label>
              <Input
                type='text'
                name='designation'
                id='designation'
                className='mb-3'
                placeholder='Designation'
                required
                // onChange={handleChangeEmail}
              />

              <Label for='email'>Email</Label>
              <Input
                type='email'
                name='email'
                id='email'
                className='mb-3'
                placeholder='Email'
                required
                // onChange={handleChangeEmail}
              />

              <Label for='password'>Password</Label>
              <Input
                type='password'
                name='password'
                id='password'
                className='mb-3'
                placeholder='Password'
                required
                // onChange={handleChangePassword}
              />
              <Button
                color='dark'
                style={{ marginTop: '2rem' }}
                block
                // onClick={handleOnSubmit}
              >
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddUserForm;
