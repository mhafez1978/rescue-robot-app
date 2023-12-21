import User from "@/database/models/User";

export async function GET(request: Request) {
  const userId = request.url.split("/")[7];

  const user = await User.findOne({
    where: { id: userId },
  });

  if (!user) {
    console.log("Not found!");
    return Response.json({ message: "User not found ..." });
  } else {
    //console.log("User found ...");
    //console.log({ user });
    return Response.json(user);
  }
}

export async function POST(request: Request) {
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
