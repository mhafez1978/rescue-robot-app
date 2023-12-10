import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import GetIP from "@/components/util/GetIP";
import RobotImage from "@/components/RoboHash";

const AdminPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member/profile");
  }
  if (session.user?.role !== "admin") {
    //console.log(session.user?.myuser?.phone)
    return (
      <>
        <div className="w-[100vw] h-[100vh] top-0 bottom-0 flex flex-row gap-x-4">
          <div className="w-[20vw] bg-slate-600 fixed top-0 bottom-0 text-slate-50">
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
                <div className="w-1/2 flex">
                  <div className="flex flex-row justify-center items-center gap-x-2">
                    {session.user?.image && (
                      <div className="w-32 h-32 overflow-hidden">
                        <img
                          src={session.user?.image}
                          alt="user image"
                          className="rounded-full w-20 h-20"
                        />
                      </div>
                    )}
                    <div
                      className="w-32 h-32 overflow-hidden"
                      style={{ border: "1px solid red", borderRadius: "200px" }}
                    >
                      <RobotImage name={session.user?.name} />
                    </div>
                    <h1 className="text-black font-semibold text-4xl">Admin</h1>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="pt-4">
                    <p>
                      Welcome back,{" "}
                      <span className="capitalize text-red-600">
                        {session.user?.name}
                      </span>{" "}
                      <br />
                      Your&apos;re assigned app role is set to:{" "}
                      <span className="capitalize text-red-600">
                        {" "}
                        {session.user?.role}
                      </span>{" "}
                      <br />
                      Your Phone Number is:{" "}
                      <span className="text-red-600">
                        {session.user?.phone}
                      </span>
                    </p>
                    <p>
                      Your current tracked IP Address is: <GetIP />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[80vw] mr-10 mt-12">
              <div className="px-2">
                <h2>Update your profile details here ...</h2>
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
          <div className="w-[20vw] bg-slate-600 text-slate-50">
            <div className="flex flex-col px-8 pt-[20vh] gap-y-2">
              <a href="/member/profile">Profile</a>
              <a href="/member/settings">Settings</a>
              <a href="/admin">Admin</a>
              <hr className="divider" />
              <a href="/api/auth/signout?callbackUrl=/">Logout</a>
            </div>
          </div>
          <div className="w-[80vw] pt-[5vh]">
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
                <h1 className="text-black font-semibold text-4xl">Admin</h1>
              </div>
              <div className="mt-8">
                <p>
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
                </p>
                <p>
                  Your IP Address is: <GetIP />
                </p>
              </div>
              <div>
                <table className="mt-4">
                  <tbody>
                    <tr className=" bg-slate-400 text-slate-800">
                      <th className="px-8 py-4">id</th>
                      <th className="px-8 py-4">Name</th>
                      <th className="px-8 py-4">Email</th>
                      <th className="px-8 py-4">Role</th>
                    </tr>
                    <tr className=" bg-slate-300 text-slate-700">
                      <td className="px-8 py-4">
                        {session.user?.id.toString().slice(0, 10)}
                      </td>
                      <td className="px-8 py-4 capitalize">
                        {session.user?.name}
                      </td>
                      <td className="px-8 py-4">{session.user?.email}</td>
                      <td className="px-8 py-4 capitalize">
                        {session.user?.role}
                      </td>
                    </tr>
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
