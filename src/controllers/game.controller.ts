import { Body, Controller, Get, Path, Route, Tags } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }
  // Récpére les jeux par id 

  @Get("{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null> {
    const game = await gameService.getGameById(id);
    return game;
  }
 
}
