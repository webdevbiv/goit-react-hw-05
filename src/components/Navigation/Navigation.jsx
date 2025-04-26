import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from './Navigation.module.scss';

const getNavLinkClass = ({ isActive }) => clsx(s.link, isActive && s.active);

const Navigation = () => {
  return (
    <nav className={s.nav}>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={getNavLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
