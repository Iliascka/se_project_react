import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Profile({
  clothingItems,
  onCardClick,
  weatherData,
  handleAddClick,
  isMobileMenuOpen,
  handleEditProfile,
  onCardLike,
  setIsLoggedIn,
}) {
  const { id } = useContext(CurrentUserContext);
  const ownClothingItems = clothingItems.filter((item) => item.owner === id);
  return (
    <section className="profile">
      <SideBar
        isMobileMenuOpen={isMobileMenuOpen}
        handleEditProfile={handleEditProfile}
        setIsLoggedIn={setIsLoggedIn}
      />
      <ClothesSection
        weatherData={weatherData}
        handleCardClick={onCardClick}
        clothingItems={ownClothingItems}
        handleAddClick={handleAddClick}
        isProfile={true}
        isMobileMenuOpen={isMobileMenuOpen}
        onCardLike={onCardLike}
      />
    </section>
  );
}
