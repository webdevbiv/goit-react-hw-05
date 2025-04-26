import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from './Navigation.module.scss';

const getNavLinkClass = ({ isActive }) =>
  clsx(s.link, isActive && s.link__active);

const Navigation = () => {
  return (
    <header className={s.header}>
      <nav>
        <ul className={s.list}>
          <li>
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies" className={getNavLinkClass}>
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
