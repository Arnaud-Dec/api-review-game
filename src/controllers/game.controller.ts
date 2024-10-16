import { Body, Controller, Get, Path, Route, Tags ,Post , Patch, Delete } from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import { notFound } from "../error/NotFoundError";
import { ReviewDTO } from "../dto/review.dto";




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

  // Récupere les reviews par id du jeu
  @Get("{id}/reviews")
  public async getReviewsByGameId(@Path() id: number): Promise<ReviewDTO[]> {
    const game = await gameService.getGameById(id);
    if (!game) {
      notFound("ID game");
    }
    return gameService.getReviewsByGameId(id);
  }

  // créer nouveau jeu 
@Post("/")
public async createGame(
  @Body() requestBody: GameDTO
): Promise<GameDTO> {
  const {title, console } = requestBody;
  if(!console?.id){
    notFound("console "+console?.id);
  }else{
    return gameService.createGame(title, console!.id!);
  }
}

@Patch("{id}")
public async updateGame(
  @Path() id: number,
  @Body() requestBody: GameDTO
): Promise<GameDTO | null> {
  const { title, console } = requestBody;
  if(!console?.id){
    notFound("console "+console?.id);
  }else{
    return gameService.updateGame(id, title, console!.id!);
  }
}

@Delete("{id}")
public async deleteGame(@Path() id: number): Promise<void> {
  await gameService.deleteGame(id);
}



 
}
 