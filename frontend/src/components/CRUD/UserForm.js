import { useState } from 'react'
import axios from 'axios'
import ConfirmationModal from './modals/ConfirmationModal'
import FeedbackModal from './modals/FeedbackModal'

import '../../CSS/user-create-update-delete-style.css'

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
  });

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleConfirmationModalOpen = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleFeedbackModalClose = () => {
    // Close the feedback modal and refresh the page
    setIsFeedbackModalOpen(false);
    window.location.reload();
  };

  const sendFormData = async () => {
    try {
      // Send form data
      await axios.post('http://localhost:8080/api/createUser', formData);
      handleConfirmationModalClose();
      setFeedbackMessage('User created successfully');
      setIsFeedbackModalOpen(true);
    }
    catch (error) {
      console.error('Error creating user:', error);
      setFeedbackMessage("Can't create user");
      setIsFeedbackModalOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['name', 'lastName', 'email'];
    const newErrors = {};

    // Check required fields
    let hasError = false;

    requiredFields.forEach((field) => {
      if (formData[field].trim() === '') {
        newErrors[field] = ' *required field';
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Open confirmation modal
    handleConfirmationModalOpen();
  };

  return (
    <div>
      {/* User creation form */}
      <div className={`container-form ${isConfirmationModalOpen ? 'blur-background' : ''}`}>
        <div className='label-title'>Create user</div>
        <form onSubmit={handleSubmit}>
          <label className='label'>Name</label>
          {errors.name && <span className='required-field-error'>{errors.name}</span>}
          <div>
            <input
              className='form-field'
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <label className='label'>Last name</label>
          {errors.lastName && <span className='required-field-error'>{errors.lastName}</span>}
          <div>
            <input
              className='form-field'
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <label className='label'>Email</label>
          {errors.email && <span className='required-field-error'>{errors.email}</span>}
          <div>
            <input
              className='form-field'
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className='container-button-submit'>
            <button className='button-submit' type='submit'>Submit</button>
          </div>
        </form>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onRequestClose={handleConfirmationModalClose}
        data={formData}
        onConfirm={sendFormData}
        onCancel={handleConfirmationModalClose}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onRequestClose={handleFeedbackModalClose}
        feedbackMessage={feedbackMessage}
      />
    </div>
  );
}

export default UserForm