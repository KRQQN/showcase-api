import { AllowNull, Column, CreatedAt, DataType, Default, IsEmail, Model, NotNull, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";

@Table({timestamps: true, tableName: 'wordleHighscores'})
export default class WordleHighscore extends Model {
  
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.INTEGER)
  time!: number;

  @Column(DataType.STRING)
  word!: string;
}