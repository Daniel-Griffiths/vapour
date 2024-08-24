import styled from "styled-components";
import { debounce, isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

import { Game } from "../components/game";
import { Grid } from "../components/grid";
import { Stack } from "../components/stack";
import { Input } from "../components/input";
import { Loader } from "../components/loader";
import { Container } from "../components/container";
import { GameStart } from "../components/game-start";
import { NonIdealState } from "../components/non-ideal-state";
import { LoadingState, useGetLibrary } from "../hooks/useGetLibrary";

const { ipcRenderer } = window.require("electron");

export function LibraryPage() {
  const navigate = useNavigate();
  const { ref, focusKey } = useFocusable();
  const { games, state } = useGetLibrary();
  const [search, setSearch] = useState<string>("");
  const [isStartingGame, setIsStartingGame] = useState<boolean>(false);

  const handleStartGame = useCallback((appid: string): void => {
    setIsStartingGame(true);
    ipcRenderer.send("run-game", appid);
    setTimeout(() => {
      setIsStartingGame(false);
    }, 5000);
  }, []);

  const handleOnSearch = useCallback(
    debounce((query: string): void => {
      setSearch(query);
    }, 300),
    [setSearch]
  );

  const filteredGames = useMemo(
    () =>
      games.filter((game) =>
        game.name.toLowerCase().includes(search.toLowerCase())
      ),
    [games, search]
  );

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
            navigate("/settings");
          }}
        />
      );

    default:
      return (
        <FocusContext.Provider value={focusKey}>
          <Container mb="1rem">
            <StyledNavInput
              placeholder="Search for games..."
              onChange={(event) => handleOnSearch(event.target.value)}
            />
            {isEmpty(filteredGames) ? (
              <NonIdealState
                title="No Games Found"
                description="Try searching for a game or check your search query."
              />
            ) : (
              <Grid ref={ref}>
                {filteredGames.map((game) => (
                  <Game
                    key={game.appid}
                    appid={String(game.appid)}
                    onClick={handleStartGame}
                  />
                ))}
              </Grid>
            )}
          </Container>
          <GameStart message="Launching game..." isOpen={isStartingGame} />
        </FocusContext.Provider>
      );
  }
}

const StyledNavInput = styled(Input)`
  margin: 1rem;
  width: calc(100% - 2rem);
`;
