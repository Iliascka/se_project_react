import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  weatherData,
  handleAddClick,
  isMobileMenuOpen,
}) {
  return (
    <section className="profile">
      <SideBar isMobileMenuOpen={isMobileMenuOpen} />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        isProfile={true}
        isMobileMenuOpen={isMobileMenuOpen}
      />
    </section>
  );
}
