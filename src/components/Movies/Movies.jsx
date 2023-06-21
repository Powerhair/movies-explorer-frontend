import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.scss";
import Preloader from "../Preloader/Preloader";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props) {
  const { onOpenBurgerPopup, isLoading } = props;

  return (
    <>
      <Header
        className="header"
        isLoggedIn
        onOpenBurgerPopup={onOpenBurgerPopup}
      ></Header>
      <main className="movies">
        <SearchForm props={props} pageSavedMovie={false} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList pageSavedMovie={false} props={props} />
        )}
      </main>
      <Footer page></Footer>
    </>
  );
}

export default Movies;
