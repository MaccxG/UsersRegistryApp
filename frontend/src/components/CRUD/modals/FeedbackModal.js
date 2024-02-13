import Modal from 'react-modal'

const FeedbackModal = ({ isOpen, onRequestClose, feedbackMessage }) => {
  return (
    <Modal
      className='modal-form'
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className='label-title'>{feedbackMessage}</div>
      <div className='modal-buttons'>
        <button className='button-confirm' onClick={onRequestClose}>OK</button>
      </div>
    </Modal>
  );
}

export default FeedbackModal
