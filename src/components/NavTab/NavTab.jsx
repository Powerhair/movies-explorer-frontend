import { NavLink } from "react-router-dom";
import profile from "../../images/profile.svg";
import { AppRoute } from "../../constants";
import "./NavTab.scss";
import { useEffect, useState } from "react";

function NavTab({ isOpen, onClose }) {
  const [styleHeaderNavigation, setStyleHeaderNavigation] = useState("nav-tab");
  const [linkClassName, setLinkClassName] = useState("nav-tab__item-link");
  const [profileLink, setProfileLink] = useState(
    "nav-tab__profile-link text-hover"
  );

  useEffect(() => {
    if (isOpen) {
      setStyleHeaderNavigation("nav-tab nav-tab_active");
      setLinkClassName("nav-tab__item-link nav-tab__item-link_active");
      setProfileLink(
        "nav-tab__profile-link text-hover nav-tab__item-link_active"
      );
    } else {
      setStyleHeaderNavigation("nav-tab");
      setLinkClassName("nav-tab__item-link");
      setProfileLink("nav-tab__profile-link text-hover");
    }
  }, [isOpen]);

  return (
    <div className={styleHeaderNavigation}>
      <ul className="nav-tab__list">
        <li className="nav-tab__item text-hover" onClick={onClose}>
          <NavLink className={linkClassName} to={AppRoute.Main}>
            Главная
          </NavLink>
        </li>
        <li className="nav-tab__item text-hover" onClick={onClose}>
          <NavLink className={linkClassName} to={AppRoute.Movies}>
            Фильмы
          </NavLink>
        </li>
        <li className="nav-tab__item text-hover" onClick={onClose}>
          <NavLink className={linkClassName} to={AppRoute.SavedMovies}>
            Сохраненные фильмы
          </NavLink>
        </li>
      </ul>
      <NavLink to={AppRoute.Profile} className={profileLink}>
        <p className="nav-tab__profile-name">Аккаунт</p>
        <img className="nav-tab__profile-img" src={profile} alt="аватар" />
      </NavLink>
    </div>
  );
}

export default NavTab;
