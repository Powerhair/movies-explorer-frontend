import "./Promo.scss";
import promoImg from "../../images/landing-logo.svg";
import { promoTitle, promoParagraph, practicumLink } from "../../constants";

function Promo() {
  return (
    <section className="promo">
      <img
        className="promo__image"
        src={promoImg}
        alt="изображение глобуса, вместо стран надпись - web"
      />
      <div className="promo__text-container">
        <h1 className="promo__title">{promoTitle}</h1>
        <p className="promo__paragraph">{promoParagraph}</p>
        <a
          href={practicumLink}
          target="_blank"
          rel="noreferrer"
          className="promo__link text-hover"
        >
          <button
            className="promo__button"
            type="button"
            aria-label="Кнопка: узнать больше"
          >
            Узнать больше
          </button>
        </a>
      </div>
    </section>
  );
}

export default Promo;
