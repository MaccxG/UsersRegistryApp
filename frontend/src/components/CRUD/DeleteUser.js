import { useState } from 'react'
import axios from 'axios'
import ConfirmationModal from './modals/ConfirmationModal'
import FeedbackModal from './modals/FeedbackModal'

import '../../CSS/user-create-update-delete-style.css'

function DeleteUser() {
  const [formData, setFormData] = useState({
    id: '',
  });

  const [userData, setUserData] = useState(null);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  // Confirmation modal management
  const handleDelete = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete the user
      await axios.post('http://localhost:8080/api/deleteUser', {
        id: userData.id,
      });

      // Set the feedback message
      setFeedbackMessage('User deleted successfully');
    }
    catch (error) {
      console.error('Error:', error);

      // Set feedback message in case of error
      setFeedbackMessage('Failed to delete user');
    }

    // Close the confirmation modal
    setIsConfirmationModalOpen(false);

    // Show feedback modal
    setIsFeedbackModalOpen(true);
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
              type="number"
              name="id"
              value={formData.id}
              onChange={handleChange}
            />
          </label>
          <div className='container-button-submit'>
            <button className='button-submit' type="submit">Search user</button>
          </div>
        </form>
      </div>

      {/* Summary of user data */}
      {userData && (
        <div className='container-form'>
          <div className='label-title'>User Information</div>
          <div className='label'>
            Name: <span className='user-data'>{userData.name}</span>
          </div>
          <div className='label'>
            Last name: <span className='user-data'>{userData.lastName}</span>
          </div>
          <div className='label'>
            Email: <span className='user-data'>{userData.email}</span>
          </div>
          <div className='container-button-submit'>
            <button className='button-submit' onClick={handleDelete}>
              Delete user
            </button>
          </div>
        </div>
      )}

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onRequestClose={() => setIsConfirmationModalOpen(false)}
        data={userData}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmationModalOpen(false)}
        actionType="delete"
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onRequestClose={handleFeedbackModalClose}
        feedbackMessage={feedbackMessage}
      />
    </div>
  );
}

export default DeleteUser
