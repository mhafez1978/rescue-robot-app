import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import GetIP from "@/components/util/GetIP";
import RobotImage from "@/components/RoboHash";
import BackBtn from "@/components/BackBtn";
import ProfileUpdateModalForm from "@/components/ProfileUpdateModalForm";
import AddNewUserModalForm from "@/components/AddNewUserModalForm";
import CheckBox from "@/components/util/CheckBox";

const AdminPage = async () => {
  const session = await getServerSession(options);

  let checked = false;
  const data = await fetch("http://localhost:3000/api/users/list/all", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // const handleChecked = (e: any) => {
  //   e.preventDefault();
  //   checked = !checked;
  //   console.log(checked);
  // };

  const users = await data.json();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member/profile");
  }
  if (session.user?.role !== "admin") {
    //console.log(session.user?.myuser?.phone)

    return (
      <>
        <div className="w-[100vw] h-[100vh] top-0 bottom-0 flex flex-row gap-x-4">
          <div className="w-[20vw] h-[100vh] bg-slate-600 fixed top-0 bottom-0 text-slate-50">
            <div className="flex flex-col px-8 pt-[20vh] gap-y-2">
              <a href="/member/profile">Profile</a>
              <a href="/member/settings">Settings</a>
              <hr className="divider" />
              <a href="/api/auth/signout?callbackUrl=/">Logout</a>
            </div>
          </div>
          <div className="w-[80vw] ml-[21vw] pt-[5vh]">
            <div className="flex flex-col justify-center items-start">
              <div className="w-full flex flex-row justify-between">
                <div className="w-1/2 flex flex-col">
                  <h1>Oops, sorry.</h1>
                  <h2 className="text-red-600 font-semibold text-2xl">
                    <em>Admin Access Is Not Allowed</em>
                  </h2>
                </div>
              </div>
            </div>
            <div className="w-[80vw] mr-10 mt-12">
              <div className="px-2">
                <div className="w-1/2">
                  <div className="">
                    <h3>
                      Hello,{" "}
                      <span className="capitalize text-emerald-600">
                        {session.user?.name}
                      </span>{" "}
                    </h3>

                    <p className="w-[70%]">
                      <br />
                      You&apos;re assigned access role is set to:{" "}
                      <span className="capitalize text-red-600">
                        {" "}
                        Standard {session.user?.role}
                      </span>{" "}
                      if you think this is a mistake, please contact tech
                      support : +1 978 888 7688.
                      <br />
                      <br />
                      <span className="text-red-600">
                        Error: ADMIN_ACCESS_401_UNAUTHORIZED.
                      </span>
                    </p>
                    <p className="mt-4">
                      Your current tracked IP Address is: <GetIP />
                    </p>
                    <BackBtn />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-[100vw] h-[100vh] top-0 bottom-0 flex flex-row gap-x-4">
          <div className="w-[20vw] h-[100vh] fixed top-0 bottom-0 bg-slate-600 text-slate-50">
            <div className="flex flex-col px-8 pt-[20vh] gap-y-2">
              <a href="/member/profile">Profile</a>
              <a href="/member/settings">Settings</a>
              <a href="/admin">Admin</a>
              <hr className="divider" />
              <a href="/api/auth/signout?callbackUrl=/">Logout</a>
            </div>
          </div>
          <div className="w-[80vw] min-h-[100vh] absolute left-[24vw] pt-[5vh]">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row justify-center items-center gap-x-2">
                {session.user?.image.length === 0 && (
                  <div
                    className="w-32 h-32 overflow-hidden"
                    style={{ border: "1px solid red", borderRadius: "200px" }}
                  >
                    <RobotImage name={session.user?.name} />
                  </div>
                )}
                {session.user?.image.length > 0 && (
                  <div
                    className="w-32 h-32 overflow-hidden"
                    style={{ border: "1px solid red", borderRadius: "200px" }}
                  >
                    <img
                      src={session.user?.image}
                      alt="user image"
                      className="rounded-full w-32 h-32"
                    />
                  </div>
                )}
                <h1 className="text-black font-semibold text-4xl">
                  Admin Page
                </h1>
              </div>
              <div className="mt-8 w-[68vw] flex flex-row">
                <div className="h-[20vh] flex flex-col w-1/2 text-left">
                  <p className="py-6">
                    Welcome back,{" "}
                    <span className="text-red-500 capitalize">
                      {session.user?.name}
                    </span>{" "}
                    <br />
                    Your&apos;re logged in as{" "}
                    <span className="text-red-500 capitalize">
                      {session.user?.role}
                    </span>{" "}
                    <br />
                    Your Phone Number is:{" "}
                    <span className="text-red-500">{session.user?.phone}</span>
                    <br />
                    Your IP Address is: <GetIP />
                  </p>
                </div>
                <div className="h-[20vh] flex flex-col w-1/2 justify-center">
                  <p className="flex flex-row justify-end gap-4">
                    <AddNewUserModalForm />
                    <button
                      // onClick={(e) => handleChecked(e)}
                      className="btn btn-danger"
                    >
                      Remove User
                    </button>
                  </p>
                </div>
              </div>
              <div>
                <table className="w-[60vw] mx-auto leading-normal mt-4">
                  <thead>
                    <tr className="bg-slate-700 text-white ">
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        ID
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        First Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        Last Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        Full Name
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        Username
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        Phone
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold">
                        Role
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold"></th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs capitalize font-semibold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user: any, index: number) => (
                      <tr
                        key={user.id}
                        className={`bg-white border-b border-gray-200 hover:bg-gray-50 ${
                          index % 2 === 0 ? "bg-slate-100" : ""
                        }`}
                      >
                        <td className="px-5 py-3 text-xs capitalize">
                          {user.id}
                        </td>
                        <td className="px-5 py-3 text-xs capitalize">
                          {user.firstname}
                        </td>
                        <td className="px-5 py-3 text-xs capitalize">
                          {user.lastname}
                        </td>
                        <td className="px-5 py-3 text-xs capitalize">
                          {user.fullname}
                        </td>
                        <td className="px-5 py-3 text-xs">{user.username}</td>
                        <td className="px-5 py-3 text-xs">{user.email}</td>
                        <td className="px-5 py-3 text-xs">{user.phone}</td>
                        <td className="px-5 py-3 text-xs capitalize">
                          {user.role}
                        </td>
                        <td className="px-5 py-3 text-xs">
                          <ProfileUpdateModalForm userId={user.id} />
                        </td>
                        <td className="px-5 py-3 text-xs">
                          <CheckBox userId={user?.id} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AdminPage;
