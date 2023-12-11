import User from "@/database/models/User";
import sequelize from "@/database/sequelize";

export async function POST(request: Request) {
  try {
    //await User.sync({ force: true });
    await sequelize.sync({ force: true });
    // more models or tables can be synced here as long as you import them on the top
    console.log("The table for the User model was just (re)created!");
    return Response.json({
      message: "The table for the User model was just (re)created!",
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Unable To Sync Tables Right Now ..." });
  }
}

export async function GET(request: Request) {
  return Response.json({ message: "Not yet implemented ..." });
}
export async function PUT(request: Request) {
  return Response.json({ message: "Not yet implemented ..." });
}
export async function DELETE(request: Request) {
  // await User.drop();
  // console.log({ message: "We dropped users table ok ..." });
  // return Response.json({ message: "We dropped users table ok ..." });

  //return Response.json({ message: "problem" });
  return Response.json({ message: "Not yet implemented ..." });
}

// API Route here is :
// API HTTP Method: DELETE
// http://localhost:3000/api/sync/db/drop/all
