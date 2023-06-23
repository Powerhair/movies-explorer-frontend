import NavTab from "../NavTab/NavTab";
import "./MenuBurger.scss";
import esc from "../../images/esc.svg";
import { useEffect } from "react";

function MenuBurger({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isOpen]);

  const stylePopup = `burger-popup ${isOpen ? "burger-popup_active" : ""}`;

  return (
    <section className={stylePopup}>
      <div
        className={
          isOpen
            ? "burger-popup__container_active burger-popup__container"
            : "burger-popup__container"
        }
      >
        <button className="burger-popup__button" onClick={onClose}>
          <img src={esc} alt="кнопка закрытия меню" />
        </button>
        <NavTab isOpen={isOpen} onClose={onClose} />
      </div>
    </section>
  );
}

export default MenuBurger;
