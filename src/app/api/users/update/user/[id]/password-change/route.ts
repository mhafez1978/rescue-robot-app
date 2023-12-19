import bcrypt from "bcrypt";
import { NextRequest } from "next/server";
import User from "@/database/models/User";

interface PasswordChange {
  oldUserPassword: string;
  newUserPassword: string;
  newUserPasswordConfirmation: string;
}

export async function PUT(req: Request) {
  const userId = req.url.split("/")[7];

  let {
    oldUserPassword,
    newUserPassword,
    newUserPasswordConfirmation,
  }: PasswordChange = await req.json();

  const findUser = await User.findOne({
    where: { id: userId },
  });

  if (!findUser) {
    return Response.json({ msg: "user not found..." });
  }

  if (newUserPassword !== newUserPasswordConfirmation) {
    return Response.json({
      msg: "New password and password confirmation do not match...",
    });
  }

  // Check the password
  const passwordMatch = await bcrypt.compare(
    oldUserPassword,
    findUser.password // Access the password property directly
  );

  if (!passwordMatch) {
    console.log("passwords do not match");
    return Response.json({ msg: "old password is not correct.." });
  }

  console.log(
    "old password match match , you can proceed and chnage your password ..."
  );

  // Hash the password
  const saltRounds = 10; // You can adjust the salt rounds as needed
  const hashedPassword = await bcrypt.hash(newUserPassword, saltRounds);

  findUser.password = hashedPassword;

  await findUser.save();

  return Response.json({ msg: "password changed successfully..." });
}
