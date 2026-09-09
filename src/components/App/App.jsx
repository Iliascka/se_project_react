import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { apiKey } from "../../utils/constant";
import Footer from "../Footer/Footer";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "../Profile/Profile";
import { useLocation } from "react-router-dom";
import {
  getItems,
  addItem,
  deleteItem,
  getUserInfo,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProfileModal from "../ProfileModal/ProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as auth from "../../utils/auth";
import { setToken, getToken } from "../../utils/token";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
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
  const [loadingModal, setLoadingModal] = useState("");

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

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
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

  const handleError = useCallback((err) => {
    console.error(err);
    return Promise.reject(err);
  }, []);

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
      .catch(handleError);
  };

  const onAddItem = (data) => {
    const jwt = getToken();
    if (!jwt) {
      return Promise.resolve();
    }
    setLoadingModal("add-garment");

    return addItem(data, jwt)
      .then((item) => {
        setClothingItems([item, ...clothingItems]);
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoadingModal("");
      });
  };

  const handleRegistration = ({ name, avatar, email, password }) => {
    setLoadingModal("signUp");
    return auth
      .register({ email, password, name, avatar })
      .then(() => {
        return handleLogin({ email, password, loadingType: "signUp" });
      })
      .catch(handleError)
      .finally(() => {
        setLoadingModal("");
      });
  };

  const handleLogin = ({ email, password, loadingType = "logIn" }) => {
    if (!email || !password) {
      return;
    }
    setLoadingModal(loadingType);
    return auth
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          return handleUserInfo({ token: data.token }).then(() => {
            closeModal();
            navigate("/");
          });
        }
      })
      .catch(handleError)
      .finally(() => {
        setLoadingModal("");
      });
  };

  const handleUserInfo = useCallback(
    ({ token }) => {
      return getUserInfo(token)
        .then(({ name, avatar, _id }) => {
          setCurrentUser({ name, avatar, id: _id });
          setIsLoggedIn(true);
        })
        .catch(handleError);
    },
    [handleError],
  );

  const handleUserUpdate = ({ name, avatar }) => {
    if (!name || !avatar) {
      return 0;
    }
    const token = getToken();
    if (!token) return;
    setLoadingModal("edit-profile");
    return auth
      .update({ name, avatar, token })
      .then(({ name, avatar, _id }) => {
        setCurrentUser({ name, avatar, id: _id });
      })
      .catch(handleError)
      .finally(() => {
        setLoadingModal("");
      });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = getToken();
    !isLiked
      ? addCardLike({ _id, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike({ _id, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard : item)),
            );
          })
          .catch((err) => console.log(err));
  };

  // Effects
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    handleUserInfo({ token: jwt }).catch(console.error);
  }, [handleUserInfo]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
        setIsWeatherDataLoaded(true);
      },
    );
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!coordinates) {
      return;
    }
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
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
                        onCardLike={handleCardLike}
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        isLoggedIn={isLoggedIn}
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
                          handleEditProfile={handleEditProfile}
                          isMobileMenuOpen={isMobileMenuOpen}
                          onCardLike={handleCardLike}
                          setIsLoggedIn={setIsLoggedIn}
                          isLoggedIn={isLoggedIn}
                        />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </>
            ) : (
              <p className="weather-loading">Loading weather....</p>
            )}
            <ProfileModal
              isOpen={activeModal === "edit-profile"}
              isLoading={loadingModal === "edit-profile"}
              onClose={closeModal}
              handleUserUpdate={handleUserUpdate}
            />
            <RegisterModal
              isOpen={activeModal === "signUp"}
              isLoading={loadingModal === "signUp"}
              onClose={closeModal}
              handleRegistration={handleRegistration}
              handleLoginModal={handleLoginModal}
            />
            <LoginModal
              isOpen={activeModal === "logIn"}
              isLoading={loadingModal === "logIn"}
              onClose={closeModal}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
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
              isLoading={loadingModal === "add-garment"}
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
