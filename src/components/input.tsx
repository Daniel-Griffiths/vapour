import styled from "styled-components";

import { Stack } from "./stack";

export interface IInputProps {
  label?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  description?: string | React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, description, ...props }: IInputProps) {
  return (
    <Stack gap="0.25rem">
      {label && <StyledInputLabel>{label}</StyledInputLabel>}
      {description && (
        <StyledInputDescription>{description}</StyledInputDescription>
      )}
      <StyledInput {...props} />
    </Stack>
  );
}

const StyledInput = styled.input`
  width: 100%;
  color: #fff;
  border: none;
  padding: 1rem;
  outline: none;
  font-size: 1rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 1rem rgba(0, 0, 0, 0.1);
`;

const StyledInputLabel = styled.label`
  display: block;
  margin-bottom: 0.3rem;
`;

const StyledInputDescription = styled.span`
  margin-bottom: 0.3rem;
  color: rgba(255, 255, 255, 0.5);
`;
