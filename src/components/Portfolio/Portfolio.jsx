import "./Portfolio.scss";
import PortfolioProject from "../PortfolioProject/PortfolioProject";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <PortfolioProject></PortfolioProject>
      </ul>
    </section>
  );
}

export default Portfolio;
