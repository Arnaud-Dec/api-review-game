import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id?: number;
    content: string;
    rating: number;
    game?: GameDTO;
}