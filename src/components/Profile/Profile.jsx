import { Link } from "react-router-dom";
import "./Profile.scss";
import { AppRoute } from "../../constants";
import { useContext, useEffect, useState } from "react";
import ValidationForm from "../../hooks/ValidationForm";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile({
  onOpenBurgerPopup,
  onUpdateUser,
  updateUserError,
  signOut,
}) {
  const { handleChange, errors, formValue, setFormValue } = ValidationForm();
  const [isInputEdit, setIsInputEdit] = useState(true);

  const currentUser = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name: formValue.name,
      email: formValue.email,
    });
    setIsInputEdit(!isInputEdit);
  }

  useEffect(() => {
    setFormValue({
      ...formValue,
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  const saveButton = isInputEdit
    ? "profile__save-buttons"
    : "profile__save-buttons_active";

  const editButton = isInputEdit
    ? "profile__form-buttons_active"
    : "profile__form-buttons";

  const buttonDisabled =
    errors.email ||
    errors.name ||
    (currentUser.email === formValue.email &&
      currentUser.name === formValue.name);

  const buttonClassName = `form__button profile__save-button ${
    buttonDisabled ? "form__button_disabled" : "button-hover"
  }`;

  // console.log(updateUserError.length);

  return (
    <>
      <Header
        className="header"
        isLoggedIn
        onOpenBurgerPopup={onOpenBurgerPopup}
      ></Header>
      <main className="profile">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <form className="form" noValidate onSubmit={handleSubmit}>
          <div className="profile-form__container">
            <div className="profile-form__container-input">
              <p className="profile-form__title">Имя</p>
              <input
                readOnly={isInputEdit}
                id="name"
                className="profile-form__input"
                name="name"
                type="text"
                value={formValue.name || ""}
                minLength="2"
                onChange={handleChange}
              />
            </div>
            <span className="form__text-error form__text-error_profile">
              {errors.name}
            </span>
          </div>
          <div className="profile-form__container">
            <div className="profile-form__container-input">
              <p className="profile-form__title">E-mail</p>
              <input
                readOnly={isInputEdit}
                id="email"
                className="profile-form__input"
                name="email"
                type="email"
                value={formValue.email || ""}
                minLength="2"
                onChange={handleChange}
              />
            </div>
            <span className="form__text-error form__text-error_profile">
              {errors.email}
            </span>
          </div>
          <div className={editButton}>
            <span className="profile__span">{updateUserError}</span>
            <button
              className="profile__form-button text-hover"
              type="submit"
              aria-label="Редактировать информацию о себе"
            >
              Редактировать
            </button>
            <Link to={AppRoute.Main} className="profile__link text-hover">
              <button
                className="profile__button"
                type="button"
                aria-label=""
                onClick={signOut}
              >
                Выйти из аккаунта
              </button>
            </Link>
          </div>
          <div className={saveButton}>
            <button className={buttonClassName} disabled={buttonDisabled}>
              Сохранить
            </button>
          </div>
        </form>
      </main>
      <Footer page={false}></Footer>
    </>
  );
}

export default Profile;
