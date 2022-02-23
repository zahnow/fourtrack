import './Nav.css';
import { useDispatch } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Fourtrack</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/songs">
              Songs
            </Link>

            <Link className="navLink" to="/bands">
              Bands
            </Link>

            <div className='navLink' onClick={() => dispatch({ type: 'LOGOUT' })}>
              Log Out
            </div>

          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
