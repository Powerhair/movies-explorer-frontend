import "./PortfolioProject.scss";
import arrow from "../../images/links.svg";
import { link } from "../../constants";

function PortfolioProject(projectLink, projectName) {
  return (
    <>
      {" "}
      <li className="portfolio-project">
        <a
          className="portfolio-project__link text-hover"
          href={link.linkHowtoLearn}
          target="_blank"
          rel="noreferrer"
        >
          <h3 className="portfolio-project__link-name">Статичный сайт</h3>
          <img
            className="portfolio-project__link-img"
            src={arrow}
            alt="стрелки-ссылки"
          />
        </a>
      </li>
      <li className="portfolio-project">
        <a
          className="portfolio-project__link text-hover"
          href={link.linkRussianTravel}
          target="_blank"
          rel="noreferrer"
        >
          <h3 className="portfolio-project__link-name">Адаптивный сайт</h3>
          <img
            className="portfolio-project__link-img"
            src={arrow}
            alt="стрелки-ссылки"
          />
        </a>
      </li>
      <li className="portfolio-project">
        <a
          className="portfolio-project__link text-hover"
          href={link.linkMesto}
          target="_blank"
          rel="noreferrer"
        >
          <h3 className="portfolio-project__link-name">
            Одностраничное приложение
          </h3>
          <img
            className="portfolio-project__link-img"
            src={arrow}
            alt="стрелки-ссылки"
          />
        </a>
      </li>
    </>
  );
}

export default PortfolioProject;
