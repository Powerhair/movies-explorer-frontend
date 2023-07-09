import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main({ isLoggedIn, onOpenBurgerPopup }) {
  return (
    <>
      <Header
        className="header header_main"
        isLoggedIn={isLoggedIn}
        onOpenBurgerPopup={onOpenBurgerPopup}
      ></Header>
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer page></Footer>
    </>
  );
}

export default Main;
