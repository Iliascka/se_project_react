import Main from "../Main/Main";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({ clothingItems, onCardClick, weatherData }) {
  return (
    <section className="profile">
      <SideBar />
      <Main
        weatherData={weatherData}
        onCardClick={onCardClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}
