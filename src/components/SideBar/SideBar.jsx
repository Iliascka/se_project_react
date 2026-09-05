import "./SideBar.css";
// import avatarDefault from "../../assets/avatar.png";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function SideBar({ isMobileMenuOpen, handleEditProfile }) {
  const { name, avatar } = useContext(CurrentUserContext);
  const avatarContent = avatar ? avatar : name.trim().toUpperCase().charAt(0);

  return (
    <aside className={`sidebar ${isMobileMenuOpen ? "sidebar_hidden" : ""}`}>
      <div className="sidebar__profile">
        <div className="sidebar__user-container">
          <div className="sidebar__profile-info">
            <p className="sidebar__username">{name} </p>
            {avatar ? (
              <img
                src={avatarContent}
                alt="user-avatar"
                className="sidebar__avatar"
              />
            ) : (
              <span className="sidebar__avatar sidebar__avatar_none">
                {avatarContent}
              </span>
            )}
          </div>
          <div className="sidebar__buttons">
            <button
              type="button"
              className="sidebar__edit-button"
              onClick={handleEditProfile}
            >
              Change Profile Data
            </button>
            <button type="button" className="sidebar__logout-button">
              Log out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
