import { useState } from "react";
// import Logo from "../Logo";
import { NavBarContainer, MenuLinks, MenuToggle } from "./NavComponents";

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <NavBarContainer {...props}>
      {/* <Logo w="80px" color="white" showText={true} /> */}

      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </NavBarContainer>
  );
}

export default Navbar;
