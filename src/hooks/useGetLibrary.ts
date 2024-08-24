import { Steam } from "../utils/steam";
import { useEffect, useState } from "react";
import { Storage, StorageKey } from "../utils/storage";

const { ipcRenderer } = window.require("electron");

export enum LoadingState {
  Loading = "loading",
  Loaded = "loaded",
  Error = "error",
}

export function useGetLibrary() {
  const [state, setState] = useState<LoadingState>(LoadingState.Loading);
  const [games, setGames] = useState<
    Awaited<ReturnType<(typeof Steam)["prototype"]["getUserOwnedGames"]>>
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const id = await Storage.get(StorageKey.steamId);
        const secret = await Storage.get(StorageKey.steamSecret);

        const games = await ipcRenderer.invoke("get-library", {
          id,
          secret,
        });

        setGames(games);
        setState(LoadingState.Loaded);
      } catch (error) {
        setState(LoadingState.Error);
      }
    })();
  }, []);

  return { games, state };
}
