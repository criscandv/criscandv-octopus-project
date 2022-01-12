import OctLink from "../../ui/OctLink";

const menuItems = [
  { title: "Inicio", to: "/" },
  { title: "Chat", to: "/chat" },
  { title: "To Do Mongo", to: "/" },
  // { title: "Criscandv", to: "https://criscandv.com/", isExternal: true },
];

function MenuItems({ children, isLast, to = "/", ...rest }) {
  return (
    <>
      {menuItems.map((item, idx) => (
        <OctLink key={idx} to={item.to}>
          {item.title}
        </OctLink>
      ))}
    </>
  );
}

export default MenuItems;
