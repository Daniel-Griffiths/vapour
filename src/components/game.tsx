import { useInView } from "react-intersection-observer";
import { useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { useFocusable } from "@noriginmedia/norigin-spatial-navigation";

enum ImageState {
  Primary,
  Fallback,
  Missing,
}

export interface IGameProps {
  appid: string;
  onClick: (appid: string) => void;
}

export function Game({ appid, onClick }: IGameProps) {
  const { inView } = useInView();
  const [isManuallyFocused, setIsManuallyFocused] = useState<boolean>(false);
  const [imageState, setImageState] = useState<ImageState>(ImageState.Primary);
  const { ref, focused, focusSelf } = useFocusable({
    onEnterPress: () => {
      onClick(appid);
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

  const handleOnError = useCallback((): void => {
    switch (imageState) {
      case ImageState.Primary:
        return setImageState(ImageState.Fallback);
      case ImageState.Fallback:
        return setImageState(ImageState.Missing);
    }
  }, [imageState]);

  /**
   * Disables auto-scrolling when focused using a mouse
   */
  const handleFocusSelf = useCallback((): void => {
    setIsManuallyFocused(true);
    focusSelf();
  }, [focusSelf]);

  const getImageUrl = useCallback((): string => {
    switch (imageState) {
      case ImageState.Primary:
        return `http://cdn.akamai.steamstatic.com/steam/apps/${appid}/library_600x900.jpg`;
      case ImageState.Fallback:
        return `http://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`;
      default:
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/axX6AAA";
    }
  }, [imageState, appid]);

  return (
    <StyledGame
      ref={ref}
      focused={focused}
      onClick={() => onClick(appid)}
      onMouseEnter={handleFocusSelf}
    >
      <StyledGameImage
        loading="lazy"
        src={getImageUrl()}
        onError={handleOnError}
        imageState={imageState}
      />
    </StyledGame>
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

const StyledGame = styled.div<{ focused: boolean }>`
  padding: 3px;
  overflow: hidden;
  position: relative;
  transition: 0.3s ease;

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

const StyledGameImage = styled.img<{ imageState: ImageState }>`
  --size: 100%;

  display: block;
  width: var(--size);
  height: var(--size);
  object-fit: contain;
  background: #252830;

  ${(props) => {
    switch (props.imageState) {
      case ImageState.Primary:
        return css`
          object-fit: cover;
        `;
    }
  }}
`;
