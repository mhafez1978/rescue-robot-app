//import bcrypt from "bcrypt";

import User from "@/database/models/User";
import { Op } from "sequelize";
// import sequelize from "@/database/sequelize";

export async function POST(request: Request) {
  const { username, email, phone, firstname, lastname } = await request.json();

  const user = await User.findAndCountAll({
    where: {
      [Op.or]: [
        { username: username },
        { email: email },
        { phone: phone },
        { firstname: firstname },
        { lastname: lastname },
      ],
    },
  });

  if (!user === null) {
    console.log("Not found!");
    return Response.json({ message: "Not found!" });
  } else {
    console.log("We found a user!");
    console.log(user instanceof User); // true
    console.log({ user });
    return Response.json({ user });
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
