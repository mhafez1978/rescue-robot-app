import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import GetIP from "@/components/util/GetIP";
import RobotImage from "@/components/RoboHash";
import User from "@/database/models/User";
import ProfileUpdateForm from "@/components/util/ProfileUpdateForm";

const MemberProfile = async () => {
  const session = await getServerSession(options);
  let memberObj;
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member/profile");
  }

  if (session.user?.role !== "admin") {
    const myUser = await User.findOne({
      where: {
        id: session.user?.id,
      },
    });

    if (myUser) {
      // console.log("##############myUser########");
      // console.log(myUser.id);
      memberObj = myUser;
      console.log(memberObj.dataValues.firstName);
    }
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
              <div className="h-[10vh] w-full flex flex-row justify-between">
                <div className="w-1/2 flex">
                  <div className="flex flex-row justify-center items-center gap-x-2">
                    {session.user?.image.length > 0 && (
                      <div className="w-32 h-32 overflow-hidden">
                        <img
                          src={memberObj.dataValues.image}
                          alt="user image"
                          className="rounded-full w-32 h-32 object-cover"
                        />
                      </div>
                    )}

                    {session.user?.image.length === 0 && (
                      <div
                        className="w-32 h-32 overflow-hidden"
                        style={{
                          border: "1px solid red",
                          borderRadius: "200px",
                        }}
                      >
                        <RobotImage name={session.user?.name} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <h1 className="text-black font-semibold text-4xl">
                        Profile
                      </h1>
                      <div className="pt-2 pl-1">
                        {" "}
                        <h2>
                          Welcome,{" "}
                          <span className="text-emerald-600 capitalize">
                            {memberObj.dataValues.firstName}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="w-[80vw] mr-10 mt-12 flex flex-row pb-8">
              {/* <div className="w-[40vw] flex flex-col">
                <UpdateUserProfile />
              </div> */}
              <div className="w-[80vw] flex flex-col">
                <h2 className="text-2xl pl-8">
                  <em>Display profile details here:</em>
                </h2>

                <div className="pt-4 pl-8">
                  <p>
                    Your&apos;re assigned app role is set to:{" "}
                    <span className="capitalize text-emerald-600">
                      {" "}
                      {memberObj.dataValues.role}
                    </span>{" "}
                    <br />
                    Your Phone Number is:{" "}
                    <span className="text-emerald-600">
                      {session.user?.phone}
                    </span>
                    <br />
                    <span>
                      Profile Image Set: &nbsp;
                      {session.user?.image.length > 0 ? (
                        <span className="text-emerald-600">Yes</span>
                      ) : (
                        <span className="text-red-600">No</span>
                      )}
                    </span>
                  </p>
                  <p>
                    Your current tracked IP Address is: <GetIP />
                  </p>
                </div>
              </div>
            </div>
            <ProfileUpdateForm memberObj={memberObj} />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="w-[100vw] h-[100vh] top-0 bottom-0 flex flex-row gap-x-4">
          <div className="w-[20vw] bg-slate-600 fixed top-0 bottom-0 text-slate-50">
            <div className="flex flex-col px-8 pt-[20vh] gap-y-2">
              <a href="/member/profile">Profile</a>
              <a href="/member/settings">Settings</a>
              <a href="/admin">Admin</a>
              <hr className="divider" />
              <a href="/api/auth/signout?callbackUrl=/">Logout</a>
            </div>
          </div>
          <div className="w-[80vw] ml-[21vw] pt-[5vh]">
            <div className="flex flex-col justify-center items-start">
              <div className="h-[10vh] w-full flex flex-row justify-between">
                <div className="w-1/2 flex">
                  <div className="flex flex-row justify-center items-center gap-x-2">
                    {session.user?.image.length > 0 && (
                      <div className="ml-4 w-32 h-32 overflow-hidden">
                        <img
                          src={session.user?.image}
                          alt="Polo"
                          className="rounded-full w-32 h-32 object-cover"
                        />
                      </div>
                    )}

                    {session.user?.image.length === 0 && (
                      <div
                        className="w-32 h-32 overflow-hidden"
                        style={{
                          border: "1px solid red",
                          borderRadius: "200px",
                        }}
                      >
                        <RobotImage name={session.user?.name} />
                      </div>
                    )}
                    <div className="flex flex-col">
                      <h1 className="text-black font-semibold text-4xl">
                        Profile
                      </h1>
                      <div className="pt-2 pl-1">
                        {" "}
                        <h2>
                          Welcome,{" "}
                          <span className="text-emerald-600 capitalize">
                            {session.user?.firstname}
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2">
                  <span></span>
                </div>
              </div>
            </div>
            <div className="w-[80vw] mr-10 mt-12 flex flex-row pb-8">
              {/* <div className="w-[40vw] flex flex-col">
                <UpdateUserProfile />
              </div> */}
              <div className="w-[80vw] flex flex-col">
                <div className="pt-4 pl-8">
                  <h5 className="text-lg font-black">
                    <em>Your session details:</em>
                  </h5>
                  <ul className="list-disc pl-8">
                    <li>
                      Your&apos;re assigned app role is set to:{" "}
                      <span className="capitalize text-emerald-600">
                        {" "}
                        {session.user?.role}
                      </span>{" "}
                    </li>
                    <li>
                      Your Phone Number is:{" "}
                      <span className="text-emerald-600">
                        {session.user?.phone}
                      </span>
                    </li>
                    <li>
                      <span>
                        Profile Image Set: &nbsp;
                        {session.user?.image.length > 0 ? (
                          <span className="text-emerald-600">Yes</span>
                        ) : (
                          <span className="text-red-600">No</span>
                        )}
                      </span>
                    </li>
                    <li>
                      Your current tracked IP Address is: <GetIP />
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* <div className="w-[80vw] flex flex-col px-8">
              <div className="w-[60vw]">
                <h3 className="text-black font-semibold text-lg">
                  Update your profile details
                </h3>
                <br />
                <form className="flex flex-col gap-2">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder={session.user?.firstname}
                    disabled
                  />
                  <label htmlFor="firstname">
                    Last Name:{" "}
                    <span className="text-sm text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder={session.user?.lastname}
                  />
                  <label htmlFor="name">Full Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={
                      session.user?.firstname + " " + session.user?.lastname
                    }
                    disabled
                  />
                  <label htmlFor="name">Username:</label>
                  <input
                    type="text"
                    name="username"
                    placeholder={session.user?.username}
                    disabled
                  />
                  <label htmlFor="name">
                    Email:{" "}
                    <span className="text-sm text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder={session.user?.email}
                  />
                  <label htmlFor="name">
                    Phone:{" "}
                    <span className="text-xs text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder={session.user?.phone}
                  />
                  <label htmlFor="name">
                    Profile Image URL:{" "}
                    <span className="text-sm text-orange-700">
                      Unlock to modify
                    </span>
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder={
                      session.user?.image.length === 0
                        ? "Not set ..."
                        : session.user?.image
                    }
                  />
                  <div className="mt-2 mb-2">
                    in progress or updated successully
                  </div>
                  <div className="flex flex-row justify-between mt-4 mb-12">
                    <button className="btn btn-primary rounded-md">
                      Update
                    </button>
                    <button className="btn btn-danger rounded-md">
                      Unlock
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
            <ProfileUpdateForm />
            {/* <UpdateUserProfile /> */}
          </div>
        </div>
      </>
    );
  }
};

export default MemberProfile;
