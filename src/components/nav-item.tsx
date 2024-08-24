import { Link, useLocation } from "react-router-dom";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

import { Button } from "./button";

export interface INavItemProps {
  name: string;
  path: string;
}

export function NavItem({ name, path }: INavItemProps) {
  const { ref } = useFocusable();
  const { pathname } = useLocation();

  return (
    <Link to={path}>
      <Button ref={ref} variant={pathname === path ? "secondary" : undefined}>
        {name}
      </Button>
    </Link>
  );
}
