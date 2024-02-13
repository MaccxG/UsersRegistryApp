import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'

import UserForm from './components/CRUD/UserForm'
import ShowUsers from './components/CRUD/ShowUsers'
import UpdateUser from './components/CRUD/UpdateUser'
import DeleteUser from './components/CRUD/DeleteUser'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/userForm" element={<UserForm />} />
        <Route exact path="/usersList" element={<ShowUsers />} />
        <Route exact path="/updateUser" element={<UpdateUser />} />
        <Route exact path="/deleteUser" element={<DeleteUser />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App
