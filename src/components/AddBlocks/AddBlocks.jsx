import MenuBurger from "../MenuBurger/MenuBurger";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function AddBlocks({
  isOpenInfoTooltip,
  isRegisterResponse,
  closeAllPopups,
  isOpenBurgerPopup,
}) {
  return (
    <>
      <InfoTooltip
        isOpen={isOpenInfoTooltip}
        registerResponse={isRegisterResponse}
        onClose={closeAllPopups}
      />
      <MenuBurger isOpen={isOpenBurgerPopup} onClose={closeAllPopups} />
    </>
  );
}

export default AddBlocks;
