import { DataTypes } from "sequelize";
import sequelize from "@/database/sequelize";
//import { DataTypeEnum } from "sequelize";

enum UserRole {
  Admin = "admin",
  User = "user",
}

interface User {
  set(arg0: { lastName: string }): unknown;
  id: number;
  firstName: string;
  lastName: string;
  fullname: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  role: UserRole;
  image: string;
}

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    fullname: {
      type: new DataTypes.STRING(256),
      allowNull: false,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: [UserRole.Admin, UserRole.User],
      allowNull: false,
    },
    image: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    // Model options
    tableName: "users",
    timestamps: true,
  }
);

export default User;
