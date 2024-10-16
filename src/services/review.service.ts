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
        const review = await Review.findByPk(id);
        if (!review) {
            notFound("Review " + id);
        }else{
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

    public async createReview(
        gameId: number,
        rating: number,
        content: string
    ): Promise<Review> {
        const game = await Game.findByPk(gameId);
        if (!game) {
            notFound("Game " + gameId);
        }else{
            return Review.create({ gameId, rating, content });
        }
    }

    public async updateReview(
        id: number,
        gameId: number,
        rating: number,
        content: string
    ): Promise<Review | null> {
        const review = await Review.findByPk(id);
        const game = await Game.findByPk(gameId);
        if (!review) {
            notFound("Review " + id);
        }
        if (!game) {
            notFound("Game " + gameId);
        }
            if (gameId) review.gameId = gameId;
            if (rating) review.rating = rating;
            if (content) review.content = content;
            await review.save();
            return review;
    }

    public async deleteReview(id: number): Promise<void> {
        const review = await Review.findByPk(id);
        if (!review) {
            notFound("Review with id : " + id);
        }
        review.destroy();
    }
        
    

}
export const reviewService = new ReviewService();