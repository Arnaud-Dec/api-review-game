import { Controller, Route, Tags , Get} from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";
import { Review } from "../models/review.model";

@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
      return reviewService.getAllReviews();
    }

    @Get("{id}")
    public async getReviewById(id: number): Promise<ReviewDTO | null> {
      const review = await reviewService.getReviewById(id);
      return review;
    }

  }
 