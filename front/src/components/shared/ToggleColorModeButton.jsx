import { FormControl, FormLabel, Switch, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import IconText from "../ui/IconText";

function ToggleColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  const darkMode = colorMode === "dark";

  return (
    <FormControl display="flex" alignItems="center">
      <Switch
        id="toggle-color-mode"
        onChange={toggleColorMode}
        isChecked={darkMode}
      />
      <FormLabel htmlFor="toggle-color-mode" mb="0" ml="2">
        {darkMode ? (
          <IconText icon={<FaMoon />} />
        ) : (
          <IconText icon={<FaSun />} />
        )}
      </FormLabel>
    </FormControl>
  );
}

export default ToggleColorModeButton;
