import { useState } from 'react'
import axios from 'axios'
import ConfirmationModal from './modals/ConfirmationModal'
import FeedbackModal from './modals/FeedbackModal'

function UserUpdate() {
  const [formData, setFormData] = useState({
    id: '',
  });

  const [userData, setUserData] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const [errors, setErrors] = useState({
    id: '',
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

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      // Search by ID
      const response = await axios.post('http://localhost:8080/api/searchUser', { id: formData.id });
      setUserData(response.data);
    }
    catch (error) {
      console.error('Error:', error);
      setFeedbackMessage('User not found');
      setIsFeedbackModalOpen(true);
    }
  };

  const handleUpdate = async () => {
    try {
      // Send updated data
      await axios.post('http://localhost:8080/api/updateUser', {
        id: userData.id,
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
      });

      setFeedbackMessage('User updated successfully');
      setIsFeedbackModalOpen(true);
      setIsConfirmationModalOpen(false);
    }
    catch (error) {
      console.error('Error:', error);
      setFeedbackMessage('Failed to update user');
      setIsFeedbackModalOpen(true);
    }
  };

  const handleConfirmationModalClose = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleFeedbackModalClose = () => {
    // Close the feedback modal and refresh the page
    setIsFeedbackModalOpen(false);
    window.location.reload();
  };

  return (
    <div>
      {/* User search form */}
      <div className='container-form'>
        <div className='label-title'>Search user by ID</div>
        <form onSubmit={handleSearch}>
          <label className='label'>
            Enter the user ID
            <input
              className='form-field'
              type='number'
              name='id'
              value={formData.id}
              onChange={handleChange}
            />
          </label>
          <div className='container-button-submit'>
            <button className='button-submit' type='submit'>Search user</button>
          </div>
        </form>
      </div>

      {/* User data update form */}
      {userData && (
        <div className='container-form'>
          <div className='label-title'>User Information</div>
          <label className='label'>Name</label>
          <input
            className='form-field'
            type='text'
            name='name'
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <label className='label'>Last name</label>
          <input
            className='form-field'
            type='text'
            name='lastName'
            value={userData.lastName}
            onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
          />
          <label className='label'>Email</label>
          <input
            className='form-field'
            type='email'
            name='email'
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <div className='container-button-submit'>
            <button className='button-submit' onClick={() => setIsConfirmationModalOpen(true)}>
              Update user info
            </button>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onRequestClose={handleConfirmationModalClose}
        data={userData}
        onConfirm={handleUpdate}
        onCancel={handleConfirmationModalClose}
        actionType='update'
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onRequestClose={handleFeedbackModalClose}
        feedbackMessage={feedbackMessage}
      />
    </div>
  );
}

export default UserUpdate