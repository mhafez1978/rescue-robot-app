//import bcrypt from "bcrypt";

import User from "@/database/models/User";
// import sequelize from "@/database/sequelize";

export async function POST(request: Request) {
  const { username } = await request.json();
  const user = await User.findOne({ where: { username: username } });
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
  //   try {
  //     // Extract data from the request body
  //     const {
  //       firstname,
  //       lastname,
  //       username,
  //       email,
  //       phone,
  //       password,
  //       role,
  //       image,
  //     } = await request.json();

  //     const saltRounds = 10; // You can adjust the salt rounds as needed
  //     const hashedPassword = await bcrypt.hash(password, saltRounds);

  //     // Create a new user in the database
  //     const newUser = await User.create({
  //       firstName: firstname,
  //       lastName: lastname,
  //       username: username,
  //       fullname: firstname + " " + lastname,
  //       email: email,
  //       phone: phone,
  //       password: hashedPassword, // Ensure this is hashed in production
  //       role: role,
  //       image: image,
  //     });
  //     console.log("user created ok ...");
  //     return Response.json(newUser);
  //   } catch (error) {
  //     console.log(error);
  //     return Response.json({ error: error });
  //   }
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
// http://localhost:3000/api/users/find/user
