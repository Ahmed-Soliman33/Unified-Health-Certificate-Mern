import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";

function NavLink({ headerTitle, mobile }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState({});

  // فتح القائمة
  const handleClick = () => {
    setOpenMenu(() => !openMenu);
  };

  return (
    <>
      {mobile ? (
        <div className="flex flex-col lg:hidden">
          <button
            onClick={handleClick}
            className="flex lg:flex-col justify-center items-center text-[16px] font-bold cursor-pointer hover:text-[#5A8B27] w-auto h-auto"
          >
            {headerTitle.title}
            <ArrowDropDownIcon />
          </button>
          <DropdownMenu
            mobile={mobile}
            sections={headerTitle.dropDownLinks}
            openMenu={openMenu}
            handleClose={handleClick}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </div>
      ) : (
        <>
          <button
            onClick={handleClick}
            className="flex md:flex-col justify-center items-center text-[16px] font-bold cursor-pointer hover:text-[#5A8B27] w-auto h-auto"
          >
            {headerTitle.title}
            <ArrowDropDownIcon />
          </button>
          <DropdownMenu
            mobile={mobile}
            sections={headerTitle.dropDownLinks}
            openMenu={openMenu}
            handleClose={handleClick}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        </>
      )}
    </>
  );
}

export default NavLink;
