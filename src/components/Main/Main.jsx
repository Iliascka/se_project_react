import WeatherCard from "./WeatherCard/WeatherCard";
import "./Main.css";

import ClothesSection from "../ClothesSection/ClothesSection";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  isLoggedIn,
}) {
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
        onCardLike={onCardLike}
        isProfile={false}
        isLoggedIn={isLoggedIn}
      >
        {" "}
      </ClothesSection>
    </main>
  );
}

export default Main;
