import sequelize from "@/database/sequelize";
import User from "@/database/models/User";

export const initDb = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.log(error);
  }
};
initDb();
