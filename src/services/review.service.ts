import { Review } from "../models/review.model";

export class ReviewService {

    public async getAllReviews(): Promise<Review[]> {
        return await Review.findAll();
    }
}
export const reviewService = new ReviewService();