import { Link } from 'react-router-dom';
import { useContext } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../store/AuthContex';
const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!authCtx.isLoggedIn && <Link to='/auth'>Login</Link>}
            
          </li>
          <li>
            {authCtx.isLoggedIn && <Link to='/profile'>Profile</Link>}
            
          </li>
          <li>
            {authCtx.isLoggedIn && <button onClick={authCtx.logout}>Logout</button>}
            
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
