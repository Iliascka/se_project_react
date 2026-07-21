import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  weatherData,
  handleAddClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        isProfile={true}
      />
    </section>
  );
}
