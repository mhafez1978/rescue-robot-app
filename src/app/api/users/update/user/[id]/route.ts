import { NextRequest } from "next/server";
import User from "@/database/models/User";
import sequelize from "sequelize";

interface UpdatedUser {
  newLastName: string;
  newEmailAddress: string;
  newPhoneNumber: string;
  newUserImage: string;
}

export async function PUT(req: Request) {
  //console.log(req);
  const userId = req.url.split("/")[7];
  let {
    newLastName,
    newEmailAddress,
    newPhoneNumber,
    newUserImage,
  }: UpdatedUser = await req.json();

  const findUser = await User.findOne({
    where: { id: userId },
  });

  if (!findUser) {
    return Response.json({ msg: "user not found..." });
  }

  if (newLastName === "") {
    newLastName = findUser.lastname;
  }

  if (newEmailAddress === "") {
    newEmailAddress = findUser.email;
  }

  if (newPhoneNumber === "") {
    newPhoneNumber = findUser.phone;
  }

  if (newUserImage === "") {
    newUserImage = findUser.image;
  }

  findUser.lastname = newLastName;
  findUser.fullname = findUser.firstname + " " + newLastName;
  findUser.email = newEmailAddress;
  findUser.phone = newPhoneNumber;
  findUser.image = newUserImage;

  await findUser.save();

  return Response.json(findUser);
}

// api route here is :
// API HTTP Method: PUT
// http://localhost:3000/api/users/update/user/${id}
