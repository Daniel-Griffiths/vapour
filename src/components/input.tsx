import styled from "styled-components";
import { useEffect } from "react";

import { Stack } from "./stack";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

export interface IInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  description?: string | React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, description, ...props }: IInputProps) {
  const { ref, focused, focusSelf } = useFocusable();

  useEffect(() => {
    if (focused && ref.current) {
      ref.current.focus();
    }
  }, [focused]);

  return (
    <Stack gap="0.25rem">
      {label && <StyledInputLabel>{label}</StyledInputLabel>}
      {description && (
        <StyledInputDescription>{description}</StyledInputDescription>
      )}
      <StyledInput
        ref={ref}
        focused={focused}
        onMouseEnter={focusSelf}
        {...props}
      />
    </Stack>
  );
}

const StyledInput = styled.input<{ focused: boolean }>`
  width: 100%;
  color: #fff;
  border: none;
  padding: 1rem;
  outline: none;
  font-size: 1rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 1rem rgba(0, 0, 0, 0.1);

  ${({ focused }) =>
    focused &&
    `
    box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
  `}
`;

const StyledInputLabel = styled.label`
  display: block;
  margin-bottom: 0.3rem;
`;

const StyledInputDescription = styled.span`
  margin-bottom: 0.3rem;
  color: rgba(255, 255, 255, 0.5);
`;
