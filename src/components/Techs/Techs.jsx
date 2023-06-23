import "./Techs.scss";
import TitleWithLine from "../TitleWithLine/TitleWithLine";
import { techListItems, techTitle, techDescription } from "../../constants";

function Techs() {
  return (
    <section className="techs">
      <TitleWithLine title={"Технологии"} />
      <h3 className="techs__title">{techTitle}</h3>
      <p className="techs__description">{techDescription}</p>
      {techListItems}
    </section>
  );
}

export default Techs;
