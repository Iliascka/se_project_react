import "./Header.css";
import avatar from "../../../assets/avatar.png";
import logo from "../../../assets/logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="" className="header__logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}
export default Header;
