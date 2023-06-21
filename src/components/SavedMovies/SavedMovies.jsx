import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.scss";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function SavedMovies(props) {
  const { onOpenBurgerPopup, isLoading } = props;

  return (
    <>
      <Header
        className="header"
        isLoggedIn
        onOpenBurgerPopup={onOpenBurgerPopup}
      ></Header>
      <main className="saved-movies">
        <SearchForm props={props} pageSavedMovie={true} />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList props={props} pageSavedMovie={true} />
        )}
      </main>
      <Footer page></Footer>
    </>
  );
}

export default SavedMovies;
