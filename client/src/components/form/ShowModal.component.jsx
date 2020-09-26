import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, Input } from 'reactstrap';

const ShowModal = ({ buttonLabel, data }) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <a className='btn-link' role='button' onClick={toggle}>
        {buttonLabel}
      </a>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <Input
            className='mb-2'
            type='textarea'
            key={data}
            name={data}
            id={data}
            value={data}
            readOnly
          />
        </ModalBody>
        <ModalFooter>
          <Button color='secondary' onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ShowModal;
