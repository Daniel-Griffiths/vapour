import { Loader } from "./loader";
import styled from "styled-components";
import { useRef, useEffect, useState, LegacyRef } from "react";

export type IWebviewRef = LegacyRef<HTMLWebViewElement> & {
  injectJavaScript: (script: string) => void;
};

export interface IWebviewProps {
  src: string;
}

export const Webview = ({ src }: IWebviewProps) => {
  const webviewRef = useRef<HTMLWebViewElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const webview = webviewRef.current;

    if (webview) {
      const handleLoadStop = () => {
        setIsLoading(false);
      };

      webview.addEventListener("did-stop-loading", handleLoadStop);

      return () => {
        webview.removeEventListener("did-stop-loading", handleLoadStop);
      };
    }
  }, []);

  return (
    <StyledWebview>
      {isLoading && <Loader />}
      <webview
        src={src}
        ref={webviewRef as LegacyRef<HTMLWebViewElement>}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          display: isLoading ? "none" : "flex",
        }}
      />
    </StyledWebview>
  );
};

const StyledWebview = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  background: #1f2126;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
