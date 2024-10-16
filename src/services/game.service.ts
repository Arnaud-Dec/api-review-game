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
    consoleId: number
  ): Promise<Game> {
    const console = await Console.findByPk(consoleId);
    if(!console){
      notFound("Console "+consoleId);
    }else{
      return Game.create({ title, consoleId });
    }
  }

  public async updateGame(
    id: number,
    title?: string,
    consoleId?: number
  ): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if (game) {
      if (title) game.title = title;
      if (consoleId) game.consoleId = consoleId;
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

  // Recherche les reviews par id du jeu

  public async getReviewsByGameId(id: number): Promise<Review[]> {
    return await Review.findAll({
      where: {
        game_id: id
      }
    });
  }
}

export const gameService = new GameService();
