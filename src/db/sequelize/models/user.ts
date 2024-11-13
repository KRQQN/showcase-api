import { AllowNull, Column, CreatedAt, DataType, Default, IsEmail, Model, NotNull, PrimaryKey, Table, Unique, UpdatedAt } from "sequelize-typescript";

@Table
export default class User extends Model {
  
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  passwordHash!: string;

  @Column(DataType.BOOLEAN)
  isAdmin!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}