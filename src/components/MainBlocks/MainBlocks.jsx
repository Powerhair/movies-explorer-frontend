import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SavedMovies from "../SavedMovies/SavedMovies";
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Movies from "../Movies/Movies";
import Profile from "../Profile/Profile";
import Preloader from "../Preloader/Preloader";
import PageNotFound from "../PageNotFound/PageNotFound";
import { AppRoute } from "../../constants";
import "../App/App.scss";

import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute";

function MainBlocks({
  isLoggedIn,
  resetLoggedAndUser,
  handleOpenBurgerPopup,
  filteredSetIsErrorMovies,
  handleUpdateUserClick,
  isLoading,
  isMovies,
  isUpdateUserError,
  isSavedMovies,
  isErrorMovies,
  handleSaveMovie,
  handleDeleteMovies,
  pageLoading,
  handleRegisterClick,
  handleLoginClick,
}) {
  const [isErrorSearchFormSpan, setIsErrorSearchFormSpan] = useState("");
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [isActiveShowAllMovies, setIsActiveShowAllMovies] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isFilteredAllMovies, setIsFilteredAllMovies] = useState([]);
  const [isFormValue, setIsFormValue] = useState("");
  const [isErrorSearchSavedMoviesPage, setIsErrorSearchSavedMoviesPage] =
    useState("");
  const [isOn, setIsOn] = useState(isCheckbox);

  const [isCheckboxSave, setIsCheckboxSave] = useState(false);

  const [isFormValueSave, setIsFormValueSave] = useState("");
  const [isFilteredMovies, setIsFilteredMovies] = useState([]);
  const [isValue, setIsValue] = useState("");
  const [isCheckboxSavePage, setIsCheckboxSavePage] = useState(false);

  const navigate = useNavigate();

  function signOut() {
    resetLoggedAndUser();
    navigate(AppRoute.Login);
    setIsCheckbox(false);
    localStorage.clear();
    setIsFilteredAllMovies({});
    setIsFiltered(false);
    setIsFormValue("");
    setIsValue("");
    setIsFormValueSave("");
    setIsCheckboxSavePage(false);
    setIsCheckboxSave(false);
  }

  function handleFilteredMovies(formValue, isCheckbox) {
    setIsActiveShowAllMovies(true);
    setIsFiltered(true);

    const filteredMovies = isMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(formValue.toLowerCase())
    );

    let sortFilteredMovies = filteredMovies.filter(
      (movie) => movie.duration <= 40
    );

    localStorage.setItem("formValue", JSON.stringify(formValue));

    if (isCheckbox) {
      setIsFilteredAllMovies(sortFilteredMovies);
      localStorage.setItem(
        "filteredMovies",
        JSON.stringify(sortFilteredMovies)
      );
    } else {
      setIsFilteredAllMovies(filteredMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    }
  }

  // function handleShowAllMovies() {
  //   setIsFilteredAllMovies(isMovies);
  //   localStorage.removeItem("filteredMovies");
  //   localStorage.removeItem("formValue");
  //   localStorage.removeItem("checkbox");
  //   localStorage.setItem("allMovies", JSON.stringify(isMovies));
  //   window.scrollTo(0, 0);
  //   setIsFiltered(true);
  //   setIsFormValue("");
  //   setIsErrorSearchFormSpan("");
  //   setIsActiveShowAllMovies(false);
  //   setIsCheckbox(false);
  // }

  function handleShowAllMovies() {
    setIsFilteredAllMovies(isMovies);
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("formValue");
    localStorage.removeItem("checkbox");
    localStorage.setItem("allMovies", JSON.stringify(isMovies));
    setIsFiltered(true);
    setIsFormValue("");
    setIsErrorSearchFormSpan("");
    setIsActiveShowAllMovies(false);
    setIsCheckbox(false); // добавили эту строку
    window.scrollTo(0, 0);
    setIsOn(false);
  }

  function handleCheckboxFiltered(isCheckbox) {
    setIsFiltered(true);
    let filterMovies;
    if (localStorage.getItem("filteredMovies")) {
      const films = JSON.parse(localStorage.getItem("filteredMovies"));
      let sortFilteredMovies = films.filter((movie) => movie.duration <= 40);
      if (isCheckbox) {
        filterMovies = sortFilteredMovies;
      } else if (localStorage.getItem("formValue")) {
        setIsActiveShowAllMovies(true);
        const formValue = JSON.parse(localStorage.getItem("formValue"));
        filterMovies = isMovies.filter((item) =>
          item.nameRU.toLowerCase().includes(formValue.toLowerCase())
        );
      } else if (!isCheckbox && !localStorage.getItem("allMovies")) {
        setIsActiveShowAllMovies(true);
        filterMovies = films;
      } else if (!isCheckbox && localStorage.getItem("allMovies")) {
        filterMovies = isMovies;
      }
    } else if (localStorage.getItem("allMovies")) {
      const allMovies = JSON.parse(localStorage.getItem("allMovies"));
      let sortFilteredMovies = allMovies.filter(
        (movie) => movie.duration <= 40
      );
      if (isCheckbox) {
        filterMovies = sortFilteredMovies;
      } else if (!isCheckbox) {
        filterMovies = allMovies;
      }
    } else if (
      !localStorage.getItem("filteredMovies") &&
      !localStorage.getItem("allMovies")
    ) {
      filteredSetIsErrorMovies();
    }
    setIsFilteredAllMovies(filterMovies);
    localStorage.setItem("filteredMovies", JSON.stringify(filterMovies));
  }

  useEffect(() => {
    if (localStorage.getItem("filteredMovies")) {
      setIsFiltered(true);
      const filteredMovies = JSON.parse(localStorage.getItem("filteredMovies"));
      setIsFilteredAllMovies(filteredMovies);
    } else if (localStorage.getItem("allMovies")) {
      setIsFiltered(true);
      const allMovies = JSON.parse(localStorage.getItem("allMovies"));
      setIsFilteredAllMovies(allMovies);
    } else {
      setIsFilteredAllMovies({});
    }
  }, []);

  function handleFilterSaveMovies(inputSearch) {
    setIsValue(inputSearch);
  }

  function handleCheckboxFilteredSaveMovies(isCheckbox) {
    setIsCheckboxSavePage(isCheckbox);
  }

  useEffect(() => {
    let filteredMovies = isSavedMovies.filter((item) =>
      item.nameRU.toLowerCase().includes(isValue.toLowerCase())
    );
    if (isCheckboxSavePage) {
      filteredMovies = filteredMovies.filter((movie) => movie.duration <= 40);
    }
    setIsFilteredMovies(filteredMovies);
  }, [isSavedMovies, isValue, isCheckboxSavePage]);

  return (
    <div className="page">
      {pageLoading ? (
        <Preloader />
      ) : (
        <Routes>
          <Route
            path={AppRoute.Register}
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Register register={handleRegisterClick} />
              )
            }
          />
          <Route
            path={AppRoute.Login}
            element={
              isLoggedIn ? (
                <Navigate to="/" />
              ) : (
                <Login login={handleLoginClick} />
              )
            }
          />
          <Route
            path={AppRoute.Main}
            element={
              <Main
                isLoggedIn={isLoggedIn}
                onOpenBurgerPopup={handleOpenBurgerPopup}
              />
            }
          />
          <Route
            path={AppRoute.Movies}
            element={
              <ProtectedRouteElement
                component={Movies}
                onOpenBurgerPopup={handleOpenBurgerPopup}
                handleSaveMovie={handleSaveMovie}
                handleFilteredMovies={handleFilteredMovies}
                isFiltered={isFiltered}
                handleDeleteMovies={handleDeleteMovies}
                movies={isFilteredAllMovies}
                savedMovies={isSavedMovies}
                errorSpan={isErrorSearchFormSpan}
                setErrorSpan={setIsErrorSearchFormSpan}
                handleCheckboxFiltered={handleCheckboxFiltered}
                checkbox={isCheckbox}
                errorMovies={isErrorMovies}
                isLoggedIn={isLoggedIn}
                activeShowAllMovies={isActiveShowAllMovies}
                setActiveShowAllMovies={setIsActiveShowAllMovies}
                isLoading={isLoading}
                setCheckbox={setIsCheckbox}
                formValue={isFormValue}
                setFormValue={setIsFormValue}
                handleShowAllMovies={handleShowAllMovies}
                isOn={isOn}
                setIsOn={setIsOn}
              />
            }
          />
          <Route
            path={AppRoute.SavedMovies}
            element={
              <ProtectedRouteElement
                component={SavedMovies}
                isLoading={isLoading}
                handleSaveMovie={handleSaveMovie}
                setErrorSpan={setIsErrorSearchSavedMoviesPage}
                isLoggedIn={isLoggedIn}
                setCheckbox={setIsCheckboxSave}
                movies={isFilteredMovies}
                handleFilteredMovies={handleFilterSaveMovies}
                handleCheckboxFiltered={handleCheckboxFilteredSaveMovies}
                onOpenBurgerPopup={handleOpenBurgerPopup}
                formValue={isFormValueSave}
                setFormValue={setIsFormValueSave}
                checkbox={isCheckboxSave}
                handleDeleteMovies={handleDeleteMovies}
                errorSpan={isErrorSearchSavedMoviesPage}
                isOn={isOn}
                setIsOn={setIsOn}
              />
            }
          />
          <Route
            path={AppRoute.Profile}
            element={
              <ProtectedRouteElement
                component={Profile}
                signOut={signOut}
                onOpenBurgerPopup={handleOpenBurgerPopup}
                isLoggedIn={isLoggedIn}
                updateUserError={isUpdateUserError}
                onUpdateUser={handleUpdateUserClick}
              />
            }
          />
          <Route path={AppRoute.PageNotFound} element={<PageNotFound />} />
        </Routes>
      )}
    </div>
  );
}

export default MainBlocks;
