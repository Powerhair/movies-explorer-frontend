import "./AboutProject.scss";
import TitleWithLine from "../TitleWithLine/TitleWithLine";
function AboutProject() {
  return (
    <section className="project">
      <TitleWithLine title={"О проекте"} />
      <ul className="project__container">
        <li className="project__text">
          <h4 className="project__title">Дипломный проект включал 5 этапов</h4>
          <p className="project__description">
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </li>
        <li className="project__text">
          <h4 className="project__title">
            На выполнение диплома ушло 5 недель
          </h4>
          <p className="project__description">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <div className="project__time">
        <div className="project__time-backend">
          <p className="project__time-title project__time-title_backend">
            1&nbsp;неделя
          </p>
          <p className="project__time-description">Back-end</p>
        </div>
        <div className="project__time-frontend">
          <p className="project__time-title project__time-title_frontend">
            4&nbsp;недели
          </p>
          <p className="project__time-description">Front-end</p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
