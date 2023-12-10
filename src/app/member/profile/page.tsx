import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
//import GetIP from "@/components/GetIP";
import RobotImage from "@/components/RoboHash";

const MemberProfile = async () => {
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
                    <h1 className="text-black font-semibold text-4xl">
                      Profile
                    </h1>
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
                    <p>{/* Your current tracked IP Address is: <GetIP /> */}</p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-8 text-start">
                <h3 className="text-md text-sky-600">
                  <em>Please complete your profile details below</em>
                </h3>
                <div className="mt-4">
                  <h4 className="mb-4">Contact Info</h4>
                  <form
                    className="mr-4 border-1 border-black"
                    style={{ border: "1px solid black" }}
                  >
                    <div className="flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="name" className="mr-1">
                        Name
                      </label>
                      <input type="text" placeholder="Enter Your Name" />
                    </div>
                    <div className="flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        placeholder="Enter your phone number (mobile)"
                      />
                    </div>
                    <div className="row flex flex-row gap-x-4 gap-y-2 mb-2">
                      <label htmlFor="email">Email</label>
                      <input type="email" placeholder="Enter your email" />
                    </div>
                    <div className="w-full flex flex-col gap-x-4 gap-y-2 mb-2">
                      <label htmlFor="addressLine1">Address Line 1</label>
                      <input
                        className="w-[17vw]"
                        type="text"
                        placeholder="123 smith street"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-x-4 gap-y-2 mb-2">
                      <label htmlFor="addressLine2">Address Line 2</label>
                      <input
                        className="w-[17vw]"
                        type="text"
                        placeholder="Apt 1"
                      />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="city" className="mr-4">
                        City
                      </label>
                      <input type="text" placeholder="City" />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="State" className="mr-2">
                        State
                      </label>
                      <input type="text" placeholder="State" />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="zipCode" className="-mr-4">
                        Zip code
                      </label>
                      <input type="text" placeholder="Zip Code" />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <button className="btn btn-primary">Save</button>
                    </div>
                  </form>
                </div>
                <div className="mt-4">
                  <h4 className="mb-4">Emergency Contact Info</h4>
                  <form
                    className="mr-4 border-1 border-black"
                    style={{ border: "1px solid black" }}
                  >
                    <div className="flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="emergencyName">
                        Emergency Contact Name
                      </label>
                      <input type="text" placeholder="Emergency Contact Name" />
                    </div>
                    <div className="flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="emergencyPhone">
                        Emergency Contact Phone
                      </label>
                      <input
                        type="text"
                        placeholder="Enter your phone number (mobile)"
                      />
                    </div>
                    <div className="row flex flex-row gap-x-4 gap-y-2 mb-2">
                      <label htmlFor="emergencyEmail">
                        Emergency Contact Email
                      </label>
                      <input type="email" placeholder="Enter your email" />
                    </div>
                    <div className="w-full flex flex-col gap-x-4 gap-y-2 mb-2">
                      <label htmlFor="emergencyAddressLine1">
                        Emergency Address Line 1
                      </label>
                      <input
                        className="w-[17vw]"
                        type="text"
                        placeholder="123 smith street"
                      />
                    </div>
                    <div className="w-full flex flex-col gap-x-4 gap-y-2 mb-2">
                      <label htmlFor="emergencyAddressLine2">
                        Emergency Address Line 2
                      </label>
                      <input
                        className="w-[17vw]"
                        type="text"
                        placeholder="Apt 1"
                      />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="emergencyCity" className="mr-4">
                        Emergency Address City
                      </label>
                      <input type="text" placeholder="City" />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="emergencyState" className="mr-2">
                        Emergency Address State
                      </label>
                      <input type="text" placeholder="State" />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <label htmlFor="emergencyZipCode" className="-mr-4">
                        Emergency Address Zip code
                      </label>
                      <input type="text" placeholder="Zip Code" />
                    </div>
                    <div className="row flex flex-row gap-x-2 gap-y-2 mb-2">
                      <button className="btn btn-primary">Save</button>
                    </div>
                  </form>
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
                <h1 className="text-black font-semibold text-4xl">Profile</h1>
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
                  {/* {console.log(session.user?.phone)} */}
                  {/* {console.log(session.user.phone)} */}
                </p>
                <p>{/* Your IP Address is: <GetIP /> */}</p>
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

export default MemberProfile;
