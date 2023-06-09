import "./MoviesCard.scss";

function MoviesCard({ film, props, isSaved, savedMovies, pageSavedMovie }) {
  const { nameRU, trailerLink, duration, image } = film;
  const { handleSaveMovie, handleDeleteMovies } = props;

  const hours = Math.trunc(duration / 60);
  const minutes = Math.trunc(duration - hours * 60);

  const imageUrl = pageSavedMovie
    ? image
    : `https://api.nomoreparties.co${image.url}`;
  const buttonClassName = pageSavedMovie
    ? "movies-card__dislike"
    : `movies-card__like ${isSaved && "movies-card__like_active"}`;

  function onButtonClick() {
    if (pageSavedMovie) {
      handleDeleteMovies(film);
    } else if (isSaved) {
      const filterSavedMovies = savedMovies.filter(
        (m) => m.movieId === film.id
      );
      handleDeleteMovies(filterSavedMovies.shift());
    } else {
      handleSaveMovie(film);
    }
  }

  return (
    <li className="movies-card">
      <a
        className="movies-card__trailer-link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          alt="постер фильма"
          src={imageUrl}
        />
      </a>
      <div className="movies-card__container">
        <div>
          <div className="movies-card__info">
            <h4 className="movies-card__title">{nameRU}</h4>
            <button
              className={buttonClassName}
              alt={"кнопка добавить в избранное или удалить"}
              onClick={onButtonClick}
            />
          </div>
          <p className="movies-card__time">
            {" "}
            {hours}ч {minutes}м{" "}
          </p>
        </div>
      </div>
    </li>
  );
}

export default MoviesCard;
