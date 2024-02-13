import Modal from 'react-modal'
import { useState, useEffect } from 'react';

import '../../../CSS/modal-style.css'

const ConfirmationModal = ({ isOpen, onRequestClose, data, onConfirm, onCancel, actionType }) => {
  const [modalTitle, setModalTitle] = useState('');

  const name = data ? data.name : null;
  const lastName = data ? data.lastName : null;
  const email = data ? data.email : null;

  const setTitle = () => {
    switch (actionType) {
      case 'update':
        setModalTitle('Confirm update');
        break;
      case 'delete':
        setModalTitle('Are you sure?');
        break;
      default:
        setModalTitle('Confirm user data');
        break;
    }
  };

  useEffect(() => {
    setTitle();
  }, []);

  return (
    <Modal
      className='modal-form'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className='label-title'>{modalTitle}</div>
      {actionType !== 'delete' && (
        <>
          {/* Summary of user data */}
          <div className='label'>
            Name: <span className='user-data'>{name}</span>
          </div>
          <div className='label'>
            Last name: <span className='user-data'>{lastName}</span>
          </div>
          <p className='label'>
            Email: <span className='user-data'>{email}</span>
          </p>
        </>
      )}
      <div className='modal-buttons'>
        <button className='button-confirm' onClick={onConfirm}>Confirm</button>
        <button className='button-cancel' onClick={onCancel}>Cancel</button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
