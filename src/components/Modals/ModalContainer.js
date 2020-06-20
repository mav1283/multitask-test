import React from 'react';
import Modal from 'react-modal';
import './modals.css';

const ModalContainer = ({ children, status, exitHandler }) => {
  return (
    <Modal isOpen={status} onRequestClose={exitHandler}>
      {children}
    </Modal>
  );
};

export default ModalContainer;
