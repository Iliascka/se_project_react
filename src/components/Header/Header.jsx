import "./Header.css";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.svg";
import menuIcon from "../../assets/menu_icon.png";
import MobileMenu from "./MobileMenu";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({
  handleAddClick,
  weatherData,
  onMobileMenuOpen,
  isMobileMenuOpen,
  onMobileMenuClose,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <NavLink to="/">
        <div className="header__top">
          <img src={logo} alt="WTWR logo" className="header__logo" />
          <button onClick={onMobileMenuOpen} className="header__menu-btn">
            <img className="header__menu-icon" src={menuIcon} alt="menu" />
          </button>
        </div>
      </NavLink>
      <p className="header__date-and-location">
        {currentDate} {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        Add clothes
      </button>
      <NavLink to="/profile" className="header__nav-link">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </NavLink>
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
