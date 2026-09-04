import "./Header.css";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.svg";
import menuIcon from "../../assets/menu_icon.png";
import MobileMenu from "./MobileMenu";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onMobileMenuOpen,
  isMobileMenuOpen,
  onMobileMenuClose,
  isLoggedIn,
  handleSignUp,
  handleLoginModal,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header className="header">
      <div
        className={`header__top ${isMobileMenuOpen && "header__top-hidden"}`}
      >
        <div className="header__brand">
          <NavLink to="/">
            <img src={logo} alt="WTWR logo" className="header__logo" />
          </NavLink>
          <p className="header__date-and-location">
            {currentDate}, {weatherData.city}
          </p>
        </div>

        <button onClick={onMobileMenuOpen} className="header__menu-btn">
          <img className="header__menu-icon" src={menuIcon} alt="menu" />
        </button>
      </div>
      <ToggleSwitch />
      {isLoggedIn ? (
        <div className="header__authentication-logIn-container">
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          <NavLink to="/profile" className="header__nav-link">
            <div className="header__user-container">
              <p className="header__username">Terrence Tegegne</p>
              <img
                src={avatar}
                alt="Terrence Tegegne"
                className="header__avatar"
              />
            </div>
          </NavLink>
        </div>
      ) : (
        <div className="header__authentication-container">
          <p className="header__sign-up" onClick={handleSignUp}>
            Sign Up
          </p>
          <p className="header__log-in" onClick={handleLoginModal}>
            Log in
          </p>
        </div>
      )}
      {isMobileMenuOpen && (
        <MobileMenu
          handleAddClick={handleAddClick}
          onMobileMenuClose={onMobileMenuClose}
        />
      )}
    </header>
  );
}
export default Header;
