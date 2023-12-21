import User from "@/database/models/User";
import sequelize from "@/database/sequelize";

export async function POST(request: Request) {
  return Response.json({ message: "Not yet implemented ..." });
}

export async function GET(request: Request) {
  return Response.json({ message: "Not yet implemented ..." });
}
export async function PUT(request: Request) {
  return Response.json({ message: "Not yet implemented ..." });
}
export async function DELETE(request: Request) {
  try {
    await User.drop();
    console.log("All tables dropped!");
    return Response.json({ message: "We dropped all tables ok ...!" });
  } catch (error) {
    return Response.json({ message: "Sorry we could not drop all tables ..." });
  }
}

// api route here is :
// API HTTP Method: POST
// http://localhost:3000/api/sync/db/drop/all
