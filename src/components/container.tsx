import React from "react";
import styled from "styled-components";

import { IViewProps, View } from "./view";

export interface IContainerProps extends IViewProps {
  maxWidth?: number;
  children: React.ReactNode;
}

export function Container({
  children,
  maxWidth = 1200,
  ...props
}: IContainerProps) {
  return (
    <StyledContainer maxWidth={maxWidth} {...props}>
      {children}
    </StyledContainer>
  );
}

const StyledContainer = styled(View)<IContainerProps>`
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  width: ${(props) => props.maxWidth}px;
`;
