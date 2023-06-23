import { AppRoute } from "../../constants";
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import { useEffect, useState } from "react";
import {
  registerTitle,
  registerParagraph,
  registerSpan,
  registerButton,
} from "../../constants";
import "./Register.scss";
import ValidationForm from "../../hooks/ValidationForm";

function Register({ register }) {
  const { handleChange, errors, formValue, isValid } = ValidationForm();

  const buttonClassName = !isValid
    ? "form__button form__button_disabled"
    : "form__button button-hover";

  const handleSubmit = (e) => {
    e.preventDefault();
    register(formValue.password, formValue.email, formValue.name);
    formValue.password = "";
    formValue.email = "";
    formValue.name = "";
  };

  return (
    <main>
      <LoginAndRegister
        title={registerTitle}
        link={AppRoute.Login}
        paragraph={registerParagraph}
        span={registerSpan}
      >
        <LoginAndRegisterForm
          buttonText={registerButton}
          className={buttonClassName}
          disabled={!isValid}
          onSubmit={handleSubmit}
        >
          <div className="form__container">
            <p className="form__title">Имя</p>
            <input
              id="name"
              className={
                !errors.name
                  ? "form__input"
                  : "form__input form__input_type_error"
              }
              name="name"
              type="text"
              value={formValue.name || ""}
              onChange={handleChange}
              minLength="2"
              required
            />
            <span className="form__text-error">{errors.name}</span>
          </div>
          <div className="form__container">
            <p className="form__title">E-mail</p>
            <input
              id="email"
              className={
                !errors.email
                  ? "form__input"
                  : "form__input form__input_type_error"
              }
              name="email"
              type="email"
              value={formValue.email || ""}
              onChange={handleChange}
              minLength="2"
              required
            />
            <span className="form__text-error">{errors.email}</span>
          </div>
          <div className="form__container">
            <p className="form__title">Пароль</p>
            <input
              id="password"
              name="password"
              type="password"
              value={formValue.password || ""}
              className={
                !errors.password
                  ? "form__input"
                  : "form__input form__input_type_error"
              }
              onChange={handleChange}
              minLength="2"
              required
            />
            <span className="form__text-error">{errors.password}</span>
          </div>
        </LoginAndRegisterForm>
      </LoginAndRegister>
    </main>
  );
}

export default Register;
