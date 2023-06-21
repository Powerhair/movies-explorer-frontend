import { useNavigate } from "react-router-dom";

import "./App.scss";

import { errorText } from "../../constants";
import { useEffect, useState } from "react";
import { register, login } from "../../utils/Auth";
import { api } from "../../utils/MainApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import MainBlocks from "../MainBlocks/MainBlocks";
import AddBlocks from "../AddBlocks/AddBlocks";

import { apiMovies } from "../../utils/MoviesApi";

function App() {
  const [isOpenBurgerPopup, setisOpenBurgerPopup] = useState(false);
  const [pageLoading, setPageloading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isErrorMovies, setIsErrorMovies] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isOpenInfoTooltip, setOpenInfoTooltip] = useState(false);
  const [isRegisterResponse, setIsRegisterResponse] = useState({
    status: false,
    text: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateUserError, setIsUpdateUserError] = useState("");
  const [isMovies, setIsMovies] = useState([]);
  const [isSavedMovies, setIsSavedMovies] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        if (isLoggedIn) {
          setPageloading(true);
          const user = await api.getUserInfo();
          setCurrentUser(user);
        } else {
          setPageloading(false);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setPageloading(false);
      }
    };

    getUserInfo();
  }, [isLoggedIn]);

  useEffect(() => {
    if (token) {
      setPageloading(true);
      api
        .getUserInfo()
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate({ replace: false });
          }
        })
        .catch(() => {
          setIsLoggedIn(false);
        })
        .then(() => {
          setPageloading(false);
        });
    }
  }, [token]);

  useEffect(() => {
    const handleEscape = (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    };

    const handleClosePopups = (evt) => {
      if (evt.target.classList.contains("burger-popup_active")) {
        closeAllPopups();
      }
    };

    document.addEventListener("mousedown", handleClosePopups);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClosePopups);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeAllPopups]);

  async function handleRegisterClick(password, email, name) {
    try {
      const res = await register(password, email, name);
      if (res) {
        setIsRegisterResponse({
          status: true,
          text: "Вы успешно зарегистрировались!",
        });
        await handleLoginClick(password, email);
      }
    } catch (res) {
      if (res === "Ошибка 409") {
        setOpenInfoTooltip(true);
        setIsRegisterResponse({
          status: false,
          text: "Пользователь с такой почтой уже зарегистрирован",
        });
      } else if (!res) {
        setIsRegisterResponse({
          status: false,
          text: "Что-то пошло не так! Попробуйте ещё раз.",
        });
      }
    } finally {
      setOpenInfoTooltip(true);
    }
  }

  function handleLoginClick(password, email) {
    login(password, email)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        navigate("/movies");
      })
      .catch((res) => {
        if (res === "Ошибка 401") {
          setOpenInfoTooltip(true);
          setIsRegisterResponse({
            status: false,
            text: "Не правильная почта или пароль",
          });
        } else if (!res) {
          setIsRegisterResponse({
            status: false,
            text: res,
          });
        }
      });
  }

  function resetLoggedAndUser() {
    setIsLoggedIn(false);
    setCurrentUser("");
  }

  useEffect(() => {
    setIsLoading(true);
    if (isLoggedIn) {
      apiMovies
        .getMovies()
        .then((movies) => {
          setIsMovies(movies);
          navigate({ replace: false });
        })
        .catch((err) => {
          setIsErrorMovies(errorText);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(true);
      api
        .getSavedMovies()
        .then((res) => {
          setIsSavedMovies(res);
          setIsErrorMovies("");
        })
        .catch((err) => {
          console.log(err);
          setIsErrorMovies(errorText);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    }
  }, [isLoggedIn]);

  async function handleSaveMovie(movie) {
    try {
      const savedMovie = await api.saveMovies(movie);
      setIsSavedMovies(isSavedMovies.concat(savedMovie));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteMovies(movie) {
    try {
      await api.deleteMovies(movie._id);
      setIsSavedMovies((i) => i.filter((m) => m._id !== movie._id));
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateUserClick(value) {
    setIsLoading(true);
    try {
      const user = await api.saveNewUserInfo(value);
      setCurrentUser(user);
      closeAllPopups();
      setIsUpdateUserError("Данные изменены успешно");
    } catch (err) {
      if (err.message === "Ошибка: 409") {
        setIsUpdateUserError("Пользователь с такой почтой уже зарегистрирован");
      } else {
        setIsUpdateUserError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenBurgerPopup() {
    setisOpenBurgerPopup(true);
  }

  function filteredSetIsErrorMovies() {
    setIsErrorMovies("Начните поиск");
  }

  function closeAllPopups() {
    setOpenInfoTooltip(false);
    setisOpenBurgerPopup(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <MainBlocks
        isLoggedIn={isLoggedIn}
        resetLoggedAndUser={resetLoggedAndUser}
        isLoading={isLoading}
        isMovies={isMovies}
        handleDeleteMovies={handleDeleteMovies}
        isUpdateUserError={isUpdateUserError}
        handleOpenBurgerPopup={handleOpenBurgerPopup}
        isErrorMovies={isErrorMovies}
        isSavedMovies={isSavedMovies}
        handleSaveMovie={handleSaveMovie}
        handleUpdateUserClick={handleUpdateUserClick}
        filteredSetIsErrorMovies={filteredSetIsErrorMovies}
        pageLoading={pageLoading}
        handleRegisterClick={handleRegisterClick}
        handleLoginClick={handleLoginClick}
      />
      <AddBlocks
        isOpenInfoTooltip={isOpenInfoTooltip}
        isRegisterResponse={isRegisterResponse}
        closeAllPopups={closeAllPopups}
        isOpenBurgerPopup={isOpenBurgerPopup}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
