import styled from "styled-components";
import { useRef, useEffect, useState, LegacyRef } from "react";

import { Loader } from "./loader";

export type IWebviewRef = HTMLWebViewElement & {
  insertCSS: (css: string) => void;
};

export interface IWebviewProps {
  src: string;
  injectedCSS?: string;
}

export const Webview = ({ src, injectedCSS }: IWebviewProps) => {
  const webviewRef = useRef<IWebviewRef>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * Show loading spinner when webview is initially loading
   */
  useEffect(() => {
    const webview = webviewRef.current;

    if (!webview) return;

    const handleLoadStop = () => {
      setIsLoading(false);
    };

    webview.addEventListener("did-stop-loading", handleLoadStop);

    return () => {
      webview.removeEventListener("did-stop-loading", handleLoadStop);
    };
  }, []);

  /**
   * Inject CSS into webview
   */
  useEffect(() => {
    const webview = webviewRef.current;
    if (!webview || !injectedCSS) return;

    const handleDomReady = () => {
      webview.insertCSS(injectedCSS);
    };
    webview.addEventListener("dom-ready", handleDomReady);

    return () => {
      webview.removeEventListener("dom-ready", handleDomReady);
    };
  }, [injectedCSS]);

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
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;
