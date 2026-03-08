import { useState } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  path: string,
  name: string,
}
export function NavItem({ path, name }: NavItemProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive || hovered ? 'dottedTitle' : '')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {name}
    </NavLink>
  );
}
