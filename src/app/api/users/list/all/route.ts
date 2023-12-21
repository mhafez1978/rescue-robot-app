//import bcrypt from "bcrypt";

import User from "@/database/models/User";

// import sequelize from "@/database/sequelize";

export async function POST(request: Request) {
  const user = await User.findAndCountAll();

  if (!user === null) {
    console.log("Not found!");
    return Response.json({ message: "Not found!" });
  } else {
    console.log("We found a user!");
    console.log({ user });
    return Response.json(user.rows);
  }
}

export async function GET(request: Request) {
  console.log("not yet implemented");
  return Response.json({ message: "not yet implemented" });
}

export async function PUT(request: Request) {
  console.log("not yet implemented");
  return Response.json({ message: "not yet implemented" });
}
export async function DELETE(request: Request) {
  console.log("not yet implemented");
  return Response.json({ message: "not yet implemented" });
}

// api route here is :
// API HTTP Method: POST
// http://localhost:3000/api/users/find/all/users
