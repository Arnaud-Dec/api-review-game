import { Controller, Route, Tags , Get , Post , Body} from "tsoa";
import { ReviewDTO } from "../dto/review.dto";
import { reviewService } from "../services/review.service";
import { Review } from "../models/review.model";
import { notFound } from "../error/NotFoundError";

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

    @Post("/")
    public async createReview(
      @Body() requestBody: ReviewDTO
    ): Promise<ReviewDTO> {
      const { game, rating, content } = requestBody;
      if(!game?.id){
        notFound("Game "+game?.id);
      }else{
        return reviewService.createReview(game!.id!, rating, content);
      }
    }

  }
 