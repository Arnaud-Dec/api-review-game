import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database"; // Connection à la base de données
import { Console } from "./console.model";

export interface GameAttributes {
  id?: number;
  title: string;
  consoleId: number;
  console?: Console;
}

export class Game extends Model<GameAttributes> implements GameAttributes {
  public id!: number;
  public title!: string;
  public consoleId!: number;
  public console!: Console;
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    consoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "console_id",
    },
  },
  {
    sequelize,
    tableName: "games",
  }
);

Game.belongsTo(Console, { foreignKey: "console_id", as: "console" });


