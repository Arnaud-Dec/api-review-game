import { Review } from "../models/review.model";
import { Game } from "../models/game.model";

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

}
export const reviewService = new ReviewService();