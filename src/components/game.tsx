import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled, { css, keyframes } from "styled-components";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

const { ipcRenderer } = window.require("electron");

enum ImageState {
  Primary,
  Fallback,
  Missing,
}

export interface IGameProps {
  appid: string;
}

export function Game({ appid }: IGameProps) {
  const { inView } = useInView();
  const [isManuallyFocused, setIsManuallyFocused] = useState<boolean>(false);
  const [imageState, setImageState] = useState<ImageState>(ImageState.Primary);
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: () => {
      handleOnClick();
    },
    /**
     * Restores auto-scrolling when focused using a keyboard
     */
    onArrowPress: () => {
      setIsManuallyFocused(false);
      return true;
    },
  });

  /**
   * Scroll element into view when focused
   */
  useEffect(() => {
    if (focused && !inView && !isManuallyFocused) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [focused, inView, ref, isManuallyFocused]);

  function handleOnClick(): void {
    ipcRenderer.send("run-game", appid);
  }

  function handleOnError(
    _e: React.SyntheticEvent<HTMLImageElement, Event>
  ): void {
    switch (imageState) {
      case ImageState.Primary:
        return setImageState(ImageState.Fallback);
      case ImageState.Fallback:
        return setImageState(ImageState.Missing);
    }
  }

  /**
   * Disables auto-scrolling when focused using a mouse
   */
  function handleFocusSelf(): void {
    setIsManuallyFocused(true);
    focusSelf();
  }

  function getImageUrl(): string {
    switch (imageState) {
      case ImageState.Primary:
        return `http://cdn.akamai.steamstatic.com/steam/apps/${appid}/library_600x900.jpg`;
      case ImageState.Fallback:
        return `http://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`;
      default:
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/axX6AAA";
    }
  }

  return (
    <StyledBox
      ref={ref}
      focused={focused}
      onClick={handleOnClick}
      onMouseEnter={handleFocusSelf}
    >
      <StyledImage
        loading="lazy"
        src={getImageUrl()}
        onError={handleOnError}
        imageState={imageState}
      />
    </StyledBox>
  );
}

const pulse = keyframes`
  0% {
    outline-color: #fff;
  }
  50% {
    outline-color: rgba(255, 255, 255, 0.5);
  }
  100% {
    outline-color: #fff;
  }
`;

const StyledBox = styled.div<{ focused: boolean }>`
  overflow: hidden;
  position: relative;
  background: #252830;
  transition: 0.3s ease;

  border: 3px solid transparent;
  outline: 3px solid transparent;
  ${({ focused }) =>
    focused &&
    css`
      transform: scale(1.02);
      animation: ${pulse} 2s infinite;
    `}

  &:hover {
    cursor: pointer;
  }
`;

const StyledImage = styled.img<{ imageState: ImageState }>`
  --size: 100%;

  display: block;
  width: var(--size);
  height: var(--size);
  object-fit: contain;

  ${(props) => {
    switch (props.imageState) {
      case ImageState.Primary:
        return css`
          object-fit: cover;
        `;
    }
  }}
`;
