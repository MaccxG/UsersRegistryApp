import { useState, useEffect } from 'react'
import axios from 'axios'

function UsersContainer() {
  const [usersData, setUsersData] = useState([]);

  const getUsersData = async () => {
    try {
      // Receive user list
      const result = await axios.get('http://localhost:8080/api/getUsers');
      setUsersData(result.data);
    }
    catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className='container-users-cards'>
      <ShowUsers usersData={usersData} />
    </div>
  );
}

function ShowUsers({ usersData }) {
  return (
    usersData.map((user) => (
      <div key={user.id} className='card-user'>
        <div className='card-name-lastName'>
          <div>{user.id}</div>
          <span>{user.name} </span>
          <span>{user.lastName}</span>
        </div>
        <span className='card-email-label'>Email: </span>
        <span className='card-email'>{user.email}</span>
      </div>
    ))
  );
}

export default UsersContainer
