import { useState } from "react";
import { Game } from "../components/game";
import { Grid } from "../components/grid";
import { Stack } from "../components/stack";
import { Loader } from "../components/loader";
import { Container } from "../components/container";
import { GameStart } from "../components/game-start";
import { NonIdealState } from "../components/non-ideal-state";
import { LoadingState, useGetLibrary } from "../hooks/useGetLibrary";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";
const { ipcRenderer } = window.require("electron");

export function LibraryPage() {
  const { ref, focusKey } = useFocusable();
  const { games, state } = useGetLibrary();
  const [isStartingGame, setIsStartingGame] = useState<boolean>(false);

  const handleStartGame = (appid: string) => {
    setIsStartingGame(true);
    ipcRenderer.send("run-game", appid);
    setTimeout(() => {
      setIsStartingGame(false);
    }, 5000);
  };

  switch (state) {
    case LoadingState.Loading:
      return (
        <Stack mt="5rem" align="center" justify="center" flex={1}>
          <Loader />
        </Stack>
      );

    case LoadingState.Error:
      return (
        <NonIdealState
          title="No Games Found"
          description="Please set your Steam ID and API key in the settings."
          buttonText="Go to settings"
          onButtonClick={() => {
            window.location.href = "/settings";
          }}
        />
      );

    default:
      return (
        <FocusContext.Provider value={focusKey}>
          <GameStart message="Launching game..." isOpen={isStartingGame} />
          <Container mt="1rem" mb="1rem">
            <Grid ref={ref}>
              {games.map((game) => (
                <Game
                  key={game.appid}
                  appid={String(game.appid)}
                  onClick={handleStartGame}
                />
              ))}
            </Grid>
          </Container>
        </FocusContext.Provider>
      );
  }
}
