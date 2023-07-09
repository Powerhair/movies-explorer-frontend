import "./AboutMe.scss";
import TitleWithLine from "../TitleWithLine/TitleWithLine";
import {
  meStatus,
  meInformation,
  meDescription,
  gitLinkRepo,
} from "../../constants";
import me from "../../images/me.png";

function AboutMe() {
  return (
    <section className="about">
      <TitleWithLine title={meStatus} />
      <div className="about__container">
        <img className="about__img" src={me} alt="фото профиля" />
        <div className="about__info">
          <h3 className="about__title">Павел</h3>
          <p className="about__decription">{meDescription}</p>
          <p className="about__information">{meInformation}</p>
          <a
            className="about__link text-hover"
            href={gitLinkRepo}
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
