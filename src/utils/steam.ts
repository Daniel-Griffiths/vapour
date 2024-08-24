const BASE_URL = "https://api.steampowered.com/";

interface IGame {
  appid: number;
  name: string;
  img_icon_url: string;
  img_logo_url: string;
  rtime_last_played: number;
  playtime_forever: number;
  has_community_visible_stats: boolean;
}

export class Steam {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  async getUserOwnedGames(id: string): Promise<IGame[]> {
    const endpoint = this._createUrl("IPlayerService/GetOwnedGames/v1/", {
      steamid: id,
      key: this.secret,
      include_appinfo: "true",
      include_played_free_games: "true",
    });

    const { response } = await fetch(endpoint).then((res) => res.json());

    return [...response.games].sort(
      (a: IGame, b: IGame) => b.rtime_last_played - a.rtime_last_played
    );
  }

  private _createUrl<T extends Record<string, string>>(
    path: string,
    args: T
  ): string {
    const params = new URLSearchParams(args);
    return `${BASE_URL}${path}?${params.toString()}`;
  }
}
