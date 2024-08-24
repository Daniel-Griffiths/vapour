import styled from "styled-components";

import { Loader } from "./loader";

export interface IGameStartProps {
  message: string;
  isOpen: boolean;
}

export function GameStart({ message, isOpen }: IGameStartProps) {
  return (
    <StyledGameStart isOpen={isOpen}>
      <Loader />
      <div>{message}</div>
    </StyledGameStart>
  );
}

const StyledGameStart = styled.div<{
  isOpen: boolean;
}>`
  top: 0;
  left: 0;
  gap: 1rem;
  opacity: 0;
  width: 100%;
  color: #fff;
  height: 100%;
  z-index: 1000;
  display: flex;
  position: fixed;
  font-size: 2rem;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  transition: opacity 0.3s;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.75);

  ${({ isOpen }) => isOpen && "opacity: 1; pointer-events: all;"}
`;
