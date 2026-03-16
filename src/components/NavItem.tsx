import { NavLink } from "react-router-dom";

type NavItemProps = {
  path: string,
  name: string,
}
export function NavItem({ path, name }: NavItemProps) {

  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? 'navSelected' : '')}
    >
      {name}
    </NavLink>
  );
}
