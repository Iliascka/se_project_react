import "./Header.css";
import avatar from "../../assets/avatar.png";
import logo from "../../assets/logo.svg";
import menuIcon from "../../assets/menu_icon.png";
import MobileHeader from "./MobileMenu";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <div className="header__top">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <button className="header__menu-btn">
          <img className="header__menu-icon" src={menuIcon} alt="menu" />
        </button>
      </div>
      <p className="header__date-and-location">
        {currentDate} {weatherData.city}
      </p>

      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        Add clothes
      </button>

      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
      <MobileHeader />
    </header>
  );
}
export default Header;
