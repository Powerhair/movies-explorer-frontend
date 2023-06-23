import { AppRoute } from "../../constants";
import LoginAndRegister from "../LoginAndRegister/LoginAndRegister";
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import ValidationForm from "../../hooks/ValidationForm";
import {
  loginTitle,
  loginParagraph,
  loginButton,
  loginSpan,
} from "../../constants";
import "../Register/Register.scss";

function Login({ login }) {
  const { handleChange, errors, formValue, isValid } = ValidationForm();

  function handelSubmit(e) {
    e.preventDefault();
    login(formValue.password, formValue.email);
    formValue.password = "";
    formValue.email = "";
  }

  const buttonClassName = `login__button form__button ${
    !isValid ? "form__button_disabled" : "button-hover"
  }`;

  return (
    <main>
      <LoginAndRegister
        title={loginTitle}
        link={AppRoute.Register}
        paragraph={loginParagraph}
        span={loginSpan}
      >
        <LoginAndRegisterForm
          buttonText={loginButton}
          onSubmit={handelSubmit}
          className={buttonClassName}
          disabled={!isValid}
        >
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

export default Login;
