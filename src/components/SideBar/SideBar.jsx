import "./SideBar.css";
import avatarDefault from "../../assets/avatar.png";
export default function SideBar() {
  const username = "Terrence Tegegne";
  const avatar = avatarDefault;

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user-info">
          <p className="sidebar__username">{username} </p>
          <button className="sidebar__edit-button">Change Profile Data</button>
          <button className="sidebar__logout-button">Log out</button>
        </div>
        {avatar ? (
          <img
            src={avatar || avatarDefault}
            alt="user-avatar"
            className="sidebar__avatar"
          />
        ) : (
          <span className="sidebar__avatar sidebar__avatar_none">
            {username?.toUpperCase().charAt(0) || ""}
          </span>
        )}
      </div>
    </aside>
  );
}
