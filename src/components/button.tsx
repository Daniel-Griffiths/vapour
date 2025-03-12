import styled from "styled-components";
import React, { forwardRef, useCallback } from "react";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

import { IViewProps, View } from "./view";
import { useNavigate } from "react-router-dom";

export interface IButtonProps extends IViewProps {
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = forwardRef<HTMLDivElement, IButtonProps>(
  ({ children, variant = "tertiary", to, ...props }) => {
    const navigate = useNavigate();
    const { ref, focused, focusSelf } = useFocusable({
      onEnterPress: () => to && navigate(to),
    });

    const getVariant = useCallback(() => {
      return focused ? "primary" : variant;
    }, [focused, variant]);

    return (
      <StyledButton
        ref={ref}
        variant={getVariant()}
        onClick={() => to && navigate(to)}
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
          background-color: rgba(255, 255, 255, 0.1);
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
