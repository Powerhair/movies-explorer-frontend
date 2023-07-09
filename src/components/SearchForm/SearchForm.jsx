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
  } = props;

  const checkboxValue = localStorage.getItem("checkbox");
  const savedCheckboxValue = localStorage.getItem("savedCheckbox");

  const switchChange = `switcher ${checkbox && "on"}`;

  useEffect(() => {
    const formValue = localStorage.getItem("formValue");
    if (formValue && !pageSavedMovie) {
      setFormValue(JSON.parse(formValue));
    }
  }, []);

  useEffect(() => {
    if (checkboxValue && !pageSavedMovie) {
      setCheckbox(JSON.parse(checkboxValue));
    }

    if (savedCheckboxValue && !pageSavedMovie) {
      setCheckbox(JSON.parse(checkboxValue));
    }
  }, []);

  function handleChange(e) {
    setFormValue(e.target.value);
    setErrorSpan("");
  }

  function handleCheckboxChange() {
    const newCheckboxValue = !checkbox;

    if (isFiltered && !pageSavedMovie) {
      setCheckbox(newCheckboxValue);
      handleCheckboxFiltered(!checkbox);
      localStorage.setItem("checkbox", JSON.stringify(newCheckboxValue));
    } else if (pageSavedMovie && isFiltered) {
      setCheckbox(newCheckboxValue);
      handleCheckboxFiltered(newCheckboxValue);
      localStorage.setItem("savedCheckbox", JSON.stringify(newCheckboxValue));
    }
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
          className={switchChange}
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
