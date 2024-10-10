import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; 
import { Game } from "./game.model";


export interface ReviewAttributes {
  id?: number;
  game_id: number;
  rating: number;
  content: string; 
}

export class Review
  extends Model<ReviewAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public game_id!: number;
  public rating!: number;
  public content!: string;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "review_text",
    },
  },
  {
    sequelize,
    tableName: "reviews",
  }
);

Review.belongsTo(Game, { foreignKey: "game_id", as: "game" });