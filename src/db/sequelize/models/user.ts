import { Column, CreatedAt, DataType, IsEmail, Model, NotNull, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table
export default class User extends Model {
  
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @NotNull
  @Column
  name!: string;

  @NotNull
  @IsEmail
  @Column
  email!: string;

  @NotNull
  @Column
  passwordHash!: string;

  @Column
  isAdmin!: boolean;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}