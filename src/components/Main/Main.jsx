import WeatherCard from "./WeatherCard/WeatherCard";
import "./Main.css";

import ClothesSection from "../ClothesSection/ClothesSection";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const filteredClothingItems = clothingItems.filter((item) => {
    return item.weather === weatherData.type;
  });
  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <ClothesSection
        clothingItems={filteredClothingItems}
        handleCardClick={handleCardClick}
        weatherData={weatherData}
        isProfile={false}
      >
        {" "}
      </ClothesSection>
    </main>
  );
}

export default Main;
