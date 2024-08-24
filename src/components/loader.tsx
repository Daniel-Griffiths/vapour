import styled from "styled-components";

import image from "../assets/img/loader.png";

export function Loader() {
  return <StyledLoader src={image} alt="Loading..." />;
}

const StyledLoader = styled.img`
  --size: 7rem;

  width: var(--size);
  height: var(--size);
`;
