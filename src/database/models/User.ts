import { DataTypes } from "sequelize";
import sequelize from "@/database/sequelize";
//import { DataTypeEnum } from "sequelize";

enum UserRole {
  Admin = "admin",
  User = "user",
}

interface User {
  set(arg0: { lastname: string }): unknown;
  id: number;
  firstname: string;
  lastname: string;
  name: string;
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
    firstname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastname: {
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
      unique: false,
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
