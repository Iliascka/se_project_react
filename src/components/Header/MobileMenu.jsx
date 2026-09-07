import "./MobileMenu.css";
import closeBtnDark from "../../assets/closeBtnDark.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MobileMenu({
  handleAddClick,
  onMobileMenuClose,
  isLoggedIn,
  handleSignUp,
  handleLoginModal,
}) {
  const { name, avatar } = useContext(CurrentUserContext);
  const avatarContent = avatar ? avatar : name.trim().charAt(0).toUpperCase();

  return (
    <div className="mobile-menu">
      <img
        onClick={onMobileMenuClose}
        src={closeBtnDark}
        alt="close-button"
        className="mobile-menu__close-btn"
      />
      {isLoggedIn ? (
        <>
          <NavLink to="/profile" className="mobile-menu__nav-link">
            <div className="mobile-menu__user-container">
              <p className="mobile-menu__username">{name}</p>
              {avatar ? (
                <img
                  src={avatarContent}
                  alt={name}
                  className="mobile-menu__avatar"
                />
              ) : (
                <span className="mobile-menu__avatar">{avatarContent}</span>
              )}
            </div>
          </NavLink>
          <button
            onClick={handleAddClick}
            type="button"
            className="mobile-menu__add-clothes-btn"
          >
            + Add clothes
          </button>
        </>
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
      <ToggleSwitch />
    </div>
  );
}

export default MobileMenu;
