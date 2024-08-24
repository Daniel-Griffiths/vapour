import React from "react";
import styled from "styled-components";
import { IViewProps, View } from "./view";

export interface IStackProps extends IViewProps {
  gap?: string;
  children: React.ReactNode;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  direction?: React.CSSProperties["flexDirection"];
}

export const Stack = React.forwardRef<HTMLDivElement, IStackProps>(
  ({ children, ...props }, ref) => {
    return (
      <StyledStack ref={ref} {...props}>
        {children}
      </StyledStack>
    );
  }
);

const StyledStack = styled(View)<IStackProps>`
  display: flex;
  gap: ${(props) => props.gap};
  align-items: ${(props) => props.align};
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => props.direction || "column"};
`;
