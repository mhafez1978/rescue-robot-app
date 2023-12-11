// This is being used for loggging in with next auth using credentials
export const adminUsers = [
  {
    id: "1",
    name: process.env.adminName as string,
    email: process.env.adminEmail as string,
    password: process.env.adminPassword as string,
    image: "" as string,
    role: process.env.adminRole as string,
    phone: process.env.AdminPhone as string,
  },
  {
    id: "2",
    name: "demo" as string,
    email: "demo@email.com" as string,
    password: "demo" as string,
    // image:
    //   "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg",
    // q: is there a cdn or api for random images placeholders?

    image:
      "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png" as string,
    role: "user" as string,
    phone: "9788887688" as string,
  },
  {
    id: "3",
    name: "ihab" as string,
    email: "ihab@email.com" as string,
    password: "hafez" as string,
    image: "",
    role: "user" as string,
    phone: "+139209278" as string,
  },
  {
    id: "4",
    name: "jordan" as string,
    email: "jordan@email.com" as string,
    password: "hafez" as string,
    image: "" as string,
    role: "admin" as string,
    phone: "+18008888888" as string,
  },
];
