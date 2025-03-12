import { useLocation } from "react-router-dom";

import { Button } from "./button";

export interface INavItemProps {
  name: string;
  path: string;
}

export function NavItem({ name, path }: INavItemProps) {
  const { pathname } = useLocation();

  return (
    <Button variant={pathname === path ? "secondary" : undefined} to={path}>
      {name}
    </Button>
  );
}
