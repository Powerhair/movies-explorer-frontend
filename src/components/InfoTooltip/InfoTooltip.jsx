import register_ok from "../../images/register_ok.svg";
import register_arror from "../../images/register_error.svg";
import "./InfoTooltip.scss";

function InfoTooltip({ onClose, isOpen, registerResponse }) {
  return (
    <section className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close-icon"
          aria-label="закрыть"
          type="button"
          onClick={onClose}
        />
        <img
          src={registerResponse.status ? register_ok : register_arror}
          className="popup__image"
          alt="регистрация успешна"
        ></img>
        <h2 className="popup__title">{registerResponse.text}</h2>
      </div>
    </section>
  );
}
export default InfoTooltip;
