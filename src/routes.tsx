import { Route, Routes as RRoutes } from "react-router-dom";

import { ChatPage } from "./pages/chat.tsx";
import { StorePage } from "./pages/store.tsx";
import { LibraryPage } from "./pages/library.tsx";
import { SettingsPage } from "./pages/settings.tsx";

export function Routes() {
  return (
    <RRoutes>
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/store" element={<StorePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<LibraryPage />} />
    </RRoutes>
  );
}
