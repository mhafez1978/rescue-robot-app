import bcrypt from "bcrypt";

import User from "@/database/models/User";
import sequelize from "@/database/sequelize";

export async function GET(request: Request) {
  console.log("not yet implemented");
  return Response.json({ message: "not yet implemented" });
}

export async function POST(request: Request) {
  try {
    // Extract data from the request body
    const {
      firstname,
      lastname,
      username,
      email,
      phone,
      password,
      role,
      image,
    } = await request.json();

    const saltRounds = 10; // You can adjust the salt rounds as needed
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    const newUser = await User.create({
      firstName: firstname,
      lastName: lastname,
      username: username,
      fullname: firstname + " " + lastname,
      email: email,
      phone: phone,
      password: hashedPassword, // Ensure this is hashed in production
      role: role,
      image: image,
    });
    console.log("user created ok ...");
    return Response.json(newUser);
  } catch (error) {
    console.log(error);
    return Response.json({ error: error });
  }
}

export async function PUT(request: Request) {
  console.log("not yet implemented");
  return Response.json({ message: "not yet implemented" });
}
export async function DELETE(request: Request) {
  console.log("not yet implemented");
  return Response.json({ message: "not yet implemented" });
}
