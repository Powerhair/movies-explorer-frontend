import { useEffect, useState } from "react";
import "./SearchForm.scss";
import searchButton from "../../images/searchButton.svg";

function SearchForm({ props, pageSavedMovie }) {
  const {
    setActiveShowAllMovies,
    errorSpan,
    setErrorSpan,
    checkbox,
    setCheckbox,
    isFiltered,
    formValue,
    setFormValue,
    handleFilteredMovies,
    handleCheckboxFiltered,
    movies,
    isOn,
    setIsOn,
  } = props;

  useEffect(() => {
    const formValue = localStorage.getItem("formValue");
    if (formValue && !pageSavedMovie) {
      setFormValue(JSON.parse(formValue));
    }

    const checkboxValue = localStorage.getItem("checkbox");
    if (checkboxValue && !pageSavedMovie) {
      setCheckbox(JSON.parse(checkboxValue));
      setIsOn(JSON.parse(checkboxValue));
    }
  }, []);

  useEffect(() => {
    const checkboxValue = localStorage.getItem("checkbox");

    if (checkboxValue && !pageSavedMovie) {
      setCheckbox(JSON.parse(checkboxValue));
    }
  }, []);

  function handleChange(e) {
    setFormValue(e.target.value);
    setErrorSpan("");
  }

  function handleCheckboxChange() {
    const newCheckboxValue = !checkbox;
    setCheckbox(newCheckboxValue);
    handleCheckboxFiltered(!checkbox);

    if (isFiltered && !pageSavedMovie) {
      localStorage.setItem("checkbox", JSON.stringify(newCheckboxValue));
    }

    setIsOn(newCheckboxValue);
  }

  function handelSortSubmit(e) {
    e.preventDefault();

    if (!pageSavedMovie) {
      setActiveShowAllMovies(true);
    }

    const form = e.target.closest("form");

    if (!form.checkValidity()) {
      setErrorSpan("Поле не должно быть пустым");
      return;
    }

    handleFilteredMovies(formValue, checkbox);
  }

  return (
    <section className="search-form">
      <form onSubmit={handelSortSubmit} noValidate>
        <div className="search-form__input-container">
          <input
            className="search-form__input"
            placeholder="Найдите фильм"
            type="text"
            required
            name="movie"
            minLength="1"
            value={formValue || ""}
            onChange={handleChange}
          />
          <button
            className="search-form__button button-hover"
            type="submit"
            aria-label="Кнопка найти"
            disabled={errorSpan}
          >
            <img
              className="search-form__button-image"
              src={searchButton}
              alt="найти"
            />
          </button>
        </div>
        <span className="form__text-error">{errorSpan}</span>
      </form>
      <label className="search-form__checkbox">
        <button
          className={`switcher ${isOn ? "on" : ""}`}
          onClick={handleCheckboxChange}
          type="button"
          disabled={movies ? null : true}
        >
          <span className="ball"></span>
        </button>
        <p className="search-form__checkbox-name">Короткометражки</p>
      </label>
    </section>
  );
}

export default SearchForm;
