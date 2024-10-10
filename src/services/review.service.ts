import { Review } from "../models/review.model";
import { Game } from "../models/game.model";
import { notFound } from "../error/NotFoundError";

export class ReviewService {

    public async getAllReviews(): Promise<Review[]> {
        return await Review.findAll({
            include: [
                {
                    model: Game,
                    as: "game",
                },
            ],
        });
    }

    public async getReviewById(id: number): Promise<Review | null> {
        return Review.findByPk(id, {
            include: [
                {
                    model: Game,
                    as: "game",
                },
            ],
        });
    }

    public async createReview(
        game_id: number,
        rating: number,
        content: string
    ): Promise<Review> {
        const game = await Game.findByPk(game_id);
        if (!game) {
            notFound("Game " + game_id);
        }else{
            return Review.create({ game_id, rating, content });
        }
    }
        
    

}
export const reviewService = new ReviewService();