import React from 'react';
import Modal from 'react-modal';
import './modals.css';

const ModalContainer = ({ children, status, exithandler }) => {
  return (
    <Modal isOpen={status} onRequestClose={exithandler}>
      {children}
    </Modal>
  );
};

export default ModalContainer;
