import { Text } from "@chakra-ui/react";

function IconText({ icon, text, ...props }) {
  return (
    <Text display="inline-flex" alignItems="center" {...props}>
      {icon}
      {text && (
        <Text as="span" ml="2">
          {text}
        </Text>
      )}
    </Text>
  );
}

export default IconText;
