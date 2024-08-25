import { Webview } from "../components/webview";

export function ChatPage() {
  return (
    <Webview
      src="https://steamcommunity.com/chat"
      injectedCSS="[class^='main_SteamPageHeader_']{ display: none !important;}"
    />
  );
}
