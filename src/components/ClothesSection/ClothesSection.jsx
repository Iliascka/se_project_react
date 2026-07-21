import "./ClothesSection.css";
import ItemCard from "../Main//ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  weatherData,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <section className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} You may want to wear:
        </p>
        <button>Button</button>
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
