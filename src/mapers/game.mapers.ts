import { GameInputDTO, GameOutputDTO } from '../dtos/game.dtos';
import { Game } from '../models/game.model';
import { ConsoleDTO } from '../dto/console.dto';

export class GameMapper {

    static toModel(gameInputDTO: GameInputDTO): Game {
        const game = new Game();
        if (gameInputDTO.id !== undefined) {
            game.id = gameInputDTO.id;
        }
        game.title = gameInputDTO.title;
        if (gameInputDTO.console !== undefined && gameInputDTO.console.id !== undefined) {
            game.console = {id: gameInputDTO.console.id, name: gameInputDTO.console.name, manufacturer: gameInputDTO.console.manufacturer};
        }
        return game;
    }

    static toOutputDTO(game: Game): GameOutputDTO {
        const gameOutputDTO: GameOutputDTO = {
            id: game.id,
            title: game.title
        };
        return gameOutputDTO;
    }
}

// pas fini de coder il faut que je fasse un autre mapeur pour la console 