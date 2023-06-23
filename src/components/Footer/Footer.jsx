import "./Footer.scss";
import { footerTitle, gitLink, practicumLink } from "../../constants";

function Footer({ page }) {
  return (
    page && (
      <footer className="footer">
        <p className="footer__title">{footerTitle}</p>
        <div className="footer__container">
          <p className="footer__year">© 2023</p>
          <ul className="footer__list">
            <li className="footer__item text-hover">
              <a
                className="footer__link"
                href={practicumLink}
                target="_blank"
                rel="noreferrer"
              >
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__item text-hover">
              <a
                className="footer__link"
                href={gitLink}
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </footer>
    )
  );
}

export default Footer;
