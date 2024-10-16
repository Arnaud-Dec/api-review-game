import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";
import { Review } from "../models/review.model";


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

  public async updateGame(
    id: number,
    title?: string,
    console_id?: number
  ): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if (game) {
      if (title) game.title = title;
      if (console_id) game.console_id = console_id;
      await game.save();
      return game;
    }
    return null;
  }


  public async deleteGame(id: number): Promise<void> {
    const game = await Game.findByPk(id);
    const reviews = await Review.findAll({
      where: {
        game_id: id
      }
    });
    if (!game) {
      notFound("Game with id : " + id);
    }
    if (reviews.length > 0) {
      const error = new Error("You can't delete a game with reviews");
      (error as any).status = 403;
      throw error;
    }
    game.destroy();
  }
}

export const gameService = new GameService();
