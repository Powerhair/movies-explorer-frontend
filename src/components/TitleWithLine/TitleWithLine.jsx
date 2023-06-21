import "./TitleWithLine.scss";

function TitleWithLine({ title }) {
  return (
    <div>
      <h2 className="title-with-line__title">{title}</h2>
      <div className="title-with-line__line"></div>
    </div>
  );
}

export default TitleWithLine;
