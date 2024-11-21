import User from './user';
import {
    AllowNull,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
    BelongsTo,
  } from "sequelize-typescript";
  
  @Table
  export default class Profile extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    firstName!: string;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    lastName!: string;
  
    @AllowNull
    @Column(DataType.STRING)
    phoneNumber?: string;
  
    @AllowNull
    @Column(DataType.STRING)
    address?: string;
  
    @AllowNull(false)
    @ForeignKey(() => User)
    @Column(DataType.UUID)
    userId!: string;
  
    @BelongsTo(() => User)
    user!: User;
  
    @CreatedAt
    @Column(DataType.DATE)
    createdAt!: Date;
  
    @UpdatedAt
    @Column(DataType.DATE)
    updatedAt!: Date;
  }
  