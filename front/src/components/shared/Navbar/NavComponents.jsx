import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { FaBars, FaTimes } from "react-icons/fa";
import MenuItems from "./MenuItems";
import ToggleColorModeButton from "../ToggleColorModeButton";
import IconText from "../../ui/IconText";

export const MenuLinks = ({ isOpen }) => (
  <Box
    display={{ base: isOpen ? "block" : "none", md: "block" }}
    flexBasis={{ base: "100%", md: "auto" }}
  >
    <Stack
      spacing={8}
      align="center"
      justify={{ base: "center", sm: "space-evenly", md: "flex-end" }}
      direction={{ base: "column", sm: "row" }}
      py={{ base: 4, md: 0 }}
    >
      <MenuItems />
      <Box>
        <ToggleColorModeButton />
      </Box>
    </Stack>
  </Box>
);

export const MenuToggle = ({ toggle, isOpen }) => (
  <Box display={{ base: "block", md: "none" }} onClick={toggle}>
    {
      isOpen
        ? "1"
        : // <IconText icon={<FaTimes />} boxSize="1.4em" />
          "2"
      // <IconText icon={<FaBars />} boxSize="1.4em" />
    }
  </Box>
);

export const NavBarContainer = ({ children, ...props }) => {
  return (
    <Flex
      as="nav"
      align="center"
      justify={["space-between", "space-between", "space-around"]}
      wrap="wrap"
      w="100%"
      p={2}
      bg="brand.main"
      color="white"
      boxShadow="md"
      {...props}
    >
      {children}
    </Flex>
  );
};
