import navbarLogo from '../../images/navbar-logo.png'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src={navbarLogo} alt="Logo" width="30" height="30" className="d-inline-block align-text-top" />
          UsersRegistryApp
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <button className="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                CRUD operations
              </button>
              <ul className="dropdown-menu dropdown-menu-dark">
                <li><a className="dropdown-item" href="./userForm">User form</a></li>
                <li><a className="dropdown-item" href="./usersList">Users list</a></li>
                <li><a className="dropdown-item" href="./updateUser">Update user info</a></li>
                <li><a className="dropdown-item" href="./deleteUser">Delete user</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar
