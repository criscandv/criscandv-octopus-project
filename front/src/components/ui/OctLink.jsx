import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function OctLink({ children, to = "/", ...props }) {
  return (
    <Link as={ReactLink} to={to} {...props}>
      {children}
    </Link>
  );
}

export default OctLink;
