import styled from "styled-components";
import React, { forwardRef, useCallback } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

import { IViewProps, View } from "./view";

export interface IButtonProps extends IViewProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = forwardRef<HTMLDivElement, IButtonProps>(
  ({ children, variant = "tertiary", ...props }, ref) => {
    const { focused, focusSelf } = useFocusable();

    const getVariant = useCallback(() => {
      return focused ? "primary" : variant;
    }, [focused, variant]);

    return (
      <StyledButton
        ref={ref}
        variant={getVariant()}
        onMouseEnter={() => focusSelf()}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

const StyledButton = styled(View)<{ variant?: IButtonProps["variant"] }>`
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  border-radius: 3rem;
  transition: 0.2s ease;
  display: inline-block;
  padding: 1rem 1.25rem;
  text-transform: uppercase;

  ${(props) => {
    switch (props.variant) {
      case "primary":
        return `
          color: #000;
          background-color: #fff;
          box-shadow: 0.3rem 0.3rem 0.9rem rgba(0, 0, 0, 0.3);
        `;
      case "secondary":
        return `
          color: #fff;
          background-color:#6c757d;
          box-shadow: none;
        `;
      case "tertiary":
        return `
          color: #fff;
          box-shadow: none;
        `;
    }
  }}
`;
