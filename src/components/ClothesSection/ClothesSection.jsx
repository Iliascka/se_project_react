import "./ClothesSection.css";
import ItemCard from "../Main//ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  weatherData,
  isProfile,
  handleAddClick,
  isMobileMenuOpen,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        {isProfile ? (
          <div
            className={`clothes-section__header ${isMobileMenuOpen ? "clothes-section__header-hidden" : ""}`}
          >
            <h2 className="clothes-section__title">Your items</h2>
            <button
              type="button"
              className="clothes-section__add-button"
              onClick={handleAddClick}
            >
              + Add new
            </button>
          </div>
        ) : (
          <p className="clothes-section__text">
            Today is {weatherData.temp[currentTemperatureUnit]}°
            {currentTemperatureUnit} / You may want to wear:
          </p>
        )}
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
            />
          );
        })}
      </ul>
    </section>
  );
}
