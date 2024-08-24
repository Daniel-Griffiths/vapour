import { useEffect, useState } from "react";

import { Input } from "../components/input";
import { Stack } from "../components/stack";
import { Container } from "../components/container";
import { Storage, StorageKey } from "../utils/storage";

const { shell } = window.require("electron");

export function SettingsPage() {
  const [steamId, setSteamId] = useState<string>("");
  const [steamSecret, setSteamSecret] = useState<string>("");

  useEffect(() => {
    (async () => {
      setSteamId(await Storage.get(StorageKey.steamId));
      setSteamSecret(await Storage.get(StorageKey.steamSecret));
    })();
  }, []);

  return (
    <Container mt="2rem" maxWidth={620}>
      <Stack gap="1rem">
        <Input
          label="Steam ID"
          value={steamId}
          onChange={async (e) => {
            setSteamId(e.target.value);
            await Storage.set(StorageKey.steamId, e.target.value);
          }}
          description={
            <Stack direction="row" gap="0.25rem">
              <span>You can find your Steam ID (steamID64) here:</span>
              <a
                onClick={() =>
                  shell.openExternal("https://www.steamidfinder.com/")
                }
              >
                https://www.steamidfinder.com/
              </a>
            </Stack>
          }
        />
        <Input
          label="Steam API Key"
          value={steamSecret}
          onChange={async (e) => {
            setSteamSecret(e.target.value);
            await Storage.set(StorageKey.steamSecret, e.target.value);
          }}
          description={
            <Stack direction="row" gap="0.25rem">
              <span>You can get your Steam API key here:</span>
              <a
                onClick={() =>
                  shell.openExternal("https://steamcommunity.com/dev/apikey")
                }
              >
                https://steamcommunity.com/dev/apikey
              </a>
            </Stack>
          }
        />
      </Stack>
    </Container>
  );
}
