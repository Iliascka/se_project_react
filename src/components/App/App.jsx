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
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useLocation } from "react-router-dom";
import { getItems, addItem, deleteItem, getUserInfo } from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

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

  //States
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", avatar: "" });
  const [isMobileMenuOpen, setMobileMenu] = useState(false);

  //Handlers
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
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

  const handleSignUp = () => {
    setActiveModal("signUp");
  };
  const handleLoginModal = () => {
    setActiveModal("logIn");
  };

  const handleMobileMenuOpen = () => {
    setMobileMenu(true);
  };
  const handleMobileMenuClose = () => {
    setMobileMenu(false);
  };

  const handleDeleteItem = (itemId) => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    return deleteItem({ itemId }, jwt)
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

  const onAddItem = (data) => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    return addItem(data, jwt)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    return auth
      .register({ email, password, name, avatar })
      .then(() => {
        handleLogin({ email, password });
        closeModal();
      })
      .catch(console.error);
  };

  const handleUserInfo = ({ token }) => {
    return getUserInfo(token)
      .then(({ name, avatar, _id }) => {
        setCurrentUser({ name, avatar, id: _id });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        return Promise.reject(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return handleUserInfo({ token: data.token }).then(() => {
            closeModal();
          });
        }
      })
      .catch(console.error);
  };

  // Effects
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    handleUserInfo({ token: jwt }).catch(console.error);
  }, []);

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
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            {isWeatherDataLoaded ? (
              <>
                <Header
                  isLoggedIn={isLoggedIn}
                  handleAddClick={handleAddClick}
                  handleSignUp={handleSignUp}
                  handleLoginModal={handleLoginModal}
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
                      <ProtectedRoute isLoggedIn={isLoggedIn}>
                        <Profile
                          weatherData={weatherData}
                          clothingItems={clothingItems}
                          onCardClick={handleCardClick}
                          handleAddClick={handleAddClick}
                          isMobileMenuOpen={isMobileMenuOpen}
                        />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </>
            ) : (
              <p className="weather-loading">Loading weather....</p>
            )}
            <RegisterModal
              isOpen={activeModal === "signUp"}
              onClose={closeModal}
              onAddItem={onAddItem}
              handleRegistration={handleRegistration}
            />
            <LoginModal
              isOpen={activeModal === "logIn"}
              onClose={closeModal}
              onAddItem={onAddItem}
              handleLogin={handleLogin}
            />
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
    </CurrentUserContext.Provider>
  );
}

export default App;
