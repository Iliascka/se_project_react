import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { APIkey } from "../../utils/constant";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useLocation } from "react-router-dom";
import { getItems, addItem, deleteItem } from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

function App() {
  const location = useLocation();
  const isProfile = location.pathname === "/profile";
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleDeleteItem = (itemId) => {
    deleteItem({ itemId })
      .then(() => {
        const updatedItems = clothingItems.filter(
          (item) => item._id !== itemId,
        );
        setClothingItems(updatedItems);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleDeleteModal = () => {
    setActiveModal("confirm-delete");
  };
  const closeModal = () => {
    setActiveModal("");
  };

  const [isMobileMenuOpen, setMobileMenu] = useState(false);

  const handleMobileMenuOpen = () => {
    setMobileMenu(true);
  };
  const handleMobileMenuClose = () => {
    setMobileMenu(false);
  };

  const onAddItem = (data) => {
    return addItem(data)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    (navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }),
      (error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (!coordinates) {
      return;
    }
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
      })
      .catch(console.error);
    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, [coordinates]);

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          {isWeatherDataLoaded ? (
            <>
              <Header
                handleAddClick={handleAddClick}
                weatherData={weatherData}
                onMobileMenuOpen={handleMobileMenuOpen}
                onMobileMenuClose={handleMobileMenuClose}
                isMobileMenuOpen={isMobileMenuOpen}
              />

              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <Profile
                      weatherData={weatherData}
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      handleAddClick={handleAddClick}
                      isMobileMenuOpen={isMobileMenuOpen}
                    />
                  }
                />
              </Routes>
            </>
          ) : (
            <p className="weather-loading">Loading weather....</p>
          )}

          <Footer />
        </div>
        <div
          className={`modal-layer ${isProfile ? "modal-layer_profile" : ""}`}
        >
          <ConfirmDeleteModal
            isOpen={activeModal === "confirm-delete"}
            onDelete={handleDeleteItem}
            card={selectedCard}
            onClose={closeModal}
          ></ConfirmDeleteModal>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeModal}
            onAddItem={onAddItem}
          ></AddItemModal>
          <ItemModal
            isOpen={activeModal === "preview"}
            card={selectedCard}
            onClose={closeModal}
            deleteModal={handleDeleteModal}
          />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
