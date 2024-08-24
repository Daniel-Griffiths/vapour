import { useEffect } from "react";
import styled from "styled-components";
import {
  useFocusable,
  FocusContext,
} from "@noriginmedia/norigin-spatial-navigation";

import { Stack } from "./stack";
import { INavItemProps, NavItem } from "./nav-item";

const PAGES: INavItemProps[] = [
  {
    name: "Library",
    path: "/library",
  },
  {
    name: "Store",
    path: "/store",
  },
  {
    name: "Chat",
    path: "/chat",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

export interface INavProps {}

export function Nav(_: INavProps) {
  const { ref, focusKey, focusSelf } = useFocusable();

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <StyledNav>
        <Stack
          ref={ref}
          gap="0.5rem"
          align="center"
          direction="row"
          justify="center"
        >
          {PAGES.map((page) => (
            <NavItem key={page.path} name={page.name} path={page.path} />
          ))}
        </Stack>
      </StyledNav>
    </FocusContext.Provider>
  );
}

const StyledNav = styled.div`
  top: 0;
  z-index: 10;
  position: sticky;
  padding: 0.5rem 0;
  backdrop-filter: blur(10px);
  background-color: rgba(0, 0, 0, 0.25);
`;
