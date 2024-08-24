import { forwardRef } from "react";
import styled from "styled-components";

export interface IViewProps extends React.HTMLAttributes<HTMLDivElement> {
  mt?: string;
  mb?: string;
  ml?: string;
  mr?: string;

  pt?: string;
  pb?: string;
  pl?: string;
  pr?: string;

  height?: string;
  flex?: string | number;

  children?: React.ReactNode;
}

export const View = forwardRef<HTMLDivElement, IViewProps>((props, ref) => {
  return <StyledView ref={ref} {...props} />;
});

const StyledView = styled.div<IViewProps>`
  margin-top: ${(props) => props.mt};
  margin-left: ${(props) => props.ml};
  margin-right: ${(props) => props.mr};
  margin-bottom: ${(props) => props.mb};

  padding-top: ${(props) => props.pt};
  padding-left: ${(props) => props.pl};
  padding-right: ${(props) => props.pr};
  padding-bottom: ${(props) => props.pb};

  flex: ${(props) => props.flex};
  height: ${(props) => props.height};
`;
