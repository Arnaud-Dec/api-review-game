import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";


export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async getGameById(id: number): Promise<GameDTO | null> {
    return Game.findByPk(id,{
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }

  public async createGame(
    title: string,
    console_id: number
  ): Promise<Game> {
    const console = await Console.findByPk(console_id);
    if(!console){
      notFound("Console "+console_id);
    }else{
      return Game.create({ title, console_id });
    }
  }
}

export const gameService = new GameService();
