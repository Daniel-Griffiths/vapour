import styled from "styled-components";

import { Stack } from "./stack";
import { Button } from "./button";

export interface INonIdealStateProps {
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function NonIdealState(props: INonIdealStateProps) {
  const { title, description, buttonText, onButtonClick } = props;

  return (
    <StyledContainer gap="1rem" align="center" justify="center" flex={1}>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      {buttonText && (
        <Button variant="secondary" onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled(Stack)`
  margin: 0 auto;
  max-width: 25rem;
  text-align: center;
`;

const StyledTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const StyledDescription = styled.div`
  color: rgba(255, 255, 255, 0.5);
`;
