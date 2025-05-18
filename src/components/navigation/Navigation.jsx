import { clsx } from "clsx";
import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";

const getActiveLink = ({ isActive }) => {
  return clsx(css.link, isActive && css.isActive);
};

const Navigation = () => {
  return (
    <header className={css.container}>
      <nav className={css.navList}>
        <NavLink to="/" className={getActiveLink}>
          Home
        </NavLink>
        <NavLink to="/movies" className={getActiveLink}>
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
