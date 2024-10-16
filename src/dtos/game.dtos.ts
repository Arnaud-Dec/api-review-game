import { ConsoleDTO } from "../dto/console.dto";


// DTO d'entrée pour Game
export interface GameInputDTO {
    id?: number;
    title: string;
    console?: ConsoleDTO;
}

// DTO de sortie pour Game
export interface GameOutputDTO {
    id?: number;
    title: string;   
}