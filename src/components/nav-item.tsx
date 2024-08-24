import { Button } from "./button";
import { Link, useLocation } from "react-router-dom";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

export interface INavItemProps {
  name: string;
  path: string;
}

export function NavItem({ name, path }: INavItemProps) {
  const { pathname } = useLocation();

  const { ref } = useFocusable();

  return (
    <Link to={path}>
      <Button ref={ref} variant={pathname === path ? "secondary" : undefined}>
        {name}
      </Button>
    </Link>
  );
}
