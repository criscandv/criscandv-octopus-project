import { extendTheme } from "@chakra-ui/react";

// Brand Colors
const colors = {
  brand: {
    main: "#8c03fc",
    secondary: "#840705",
  },
};

// Font Families
const fonts = {
  brand: "'Roboto', sans-serif",
  body: "'Roboto', sans-serif",
};

// Color Mode
const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  colors,
  fonts,
  config,
});

export default theme;
