import { GameDTO } from "./game.dto";

export interface ReviewDTO {
    id?: number;
    title: string;
    content: string;
    rating: number;
    game?: GameDTO;
}