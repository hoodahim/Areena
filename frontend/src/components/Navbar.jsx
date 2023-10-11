import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
  const { state } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Areena</h1>
        </Link>
        <nav>
          {state.user ? (
            <div className="nav-logedIn">
              <h4>{state.user.name}</h4>
              <button
                onClick={handleClick}
                className="material-symbols-outlined nav-icon"
              >
                move_item
              </button>
            </div>
          ) : (
            <div>
              <ul>
                <Link
                  to="/signup"
                  className="material-symbols-outlined nav-icon"
                >
                  person_add
                </Link>
                <Link
                  to="/login"
                  className="material-symbols-outlined nav-icon"
                >
                  input
                </Link>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
