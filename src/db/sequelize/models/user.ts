import { AllowNull, Column, CreatedAt, DataType, IsEmail, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table
export default class User extends Model {
  
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
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