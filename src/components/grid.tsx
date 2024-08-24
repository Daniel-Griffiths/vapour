import styled from "styled-components";
import React, { forwardRef } from "react";

import { Container } from "./container";

export const Grid = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <Container>
        <StyledGrid
          gap={5}
          ref={ref}
          cols="repeat(auto-fit, minmax(200px, 1fr))"
        >
          {children}
        </StyledGrid>
      </Container>
    );
  }
);

const StyledGrid = styled.div<{ gap: number; cols: string }>`
  display: grid;
  gap: ${({ gap }) => gap}px;
  grid-template-columns: ${({ cols }) => cols};
`;
