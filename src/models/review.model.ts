import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database"; 
import { Game } from "./game.model";


export interface ReviewAttributes {
  id?: number;
  gameId: number;
  rating: number;
  content: string; 
}

export class Review
  extends Model<ReviewAttributes>
  implements ReviewAttributes
{
  public id!: number;
  public gameId!: number;
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
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "game_id",
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