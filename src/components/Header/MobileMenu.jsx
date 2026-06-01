import "./MobileMenu.css";
import avatar from "../../assets/avatar.png";
import closeBtnDark from "../../assets/closeBtnDark.png";

function MobileHeader() {
  return (
    <div className="mobile-menu">
      <img
        src={closeBtnDark}
        alt="close-button"
        className="mobile-menu__close-btn"
      />
      <div className="mobile-menu__user-container">
        <p className="mobile-menu__username">Terrence Tegegne</p>
        <img
          src={avatar}
          alt="Terrence Tegegne"
          className="mobile-menu__avatar"
        />
      </div>
      <button
        // onClick={handleAddClick}
        type="button"
        className="mobile-menu__add-clothes-btn"
      >
        + Add clothes
      </button>
    </div>
  );
}

export default MobileHeader;
