import { Game } from "../components/game";
import { Grid } from "../components/grid";
import { Stack } from "../components/stack";
import { Loader } from "../components/loader";
import { Container } from "../components/container";
import { NonIdealState } from "../components/non-ideal-state";
import { LoadingState, useGetLibrary } from "../hooks/useGetLibrary";
import {
  FocusContext,
  useFocusable,
} from "@noriginmedia/norigin-spatial-navigation";

export function LibraryPage() {
  const { ref, focusKey } = useFocusable();
  const { games, state } = useGetLibrary();

  switch (state) {
    case LoadingState.Loading:
      return (
        <Stack mt="5rem" align="center" justify="center">
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
          <Container mt="1rem" mb="1rem">
            <Grid ref={ref}>
              {games.map((game) => (
                <Game key={game.appid} appid={String(game.appid)} />
              ))}
            </Grid>
          </Container>
        </FocusContext.Provider>
      );
  }
}
