import { getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

const SettingsPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/member/settings");
  }
  if (session.user?.role !== "admin") {
    return (
      <>
        <div className="w-[100vw] h-[100vh] top-0 bottom-0 flex flex-row gap-x-4">
          <div className="w-[20vw] bg-slate-600 text-slate-50">
            <div className="flex flex-col px-8 pt-[20vh] gap-y-2">
              <a href="/member/profile">Profile</a>
              <a href="/member/settings">Settings</a>
              <hr className="divider" />
              <a href="/api/auth/signout?callbackUrl=/">Logout</a>
            </div>
          </div>
          <div className="w-[80vw] pt-[5vh]">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row justify-center items-center gap-x-2">
                <img
                  src={session.user?.image}
                  alt="user image"
                  className="rounded-full w-20 h-20"
                />
                <h1 className="text-black font-semibold text-4xl">Settings</h1>
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
  } else {
    return (
      <>
        <div className="w-[100vw] h-[100vh] flex flex-row">
          <div className="w-[20vw] h-[100vh] bg-slate-100 text-slate-950 z-10">
            <div className="flex flex-col px-8 pt-[20vh] gap-y-2">
              <a href="/member/profile">Profile</a>
              <a href="/member/settings">Settings</a>
              <a href="/admin">Admin</a>
              <hr className="divider" />
              <a href="/api/auth/signout?callbackUrl=/">Logout</a>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="w-[80vw] min-h-[10vh] flex flex-row">
              <div className="w-[80vw]">
                <div className="flex flex-col">
                  <div className="flex flex-row justify-start items-center gap-4 py-4">
                    <img
                      src={session.user?.image}
                      alt="user image"
                      className="rounded-full w-20 h-20"
                    />
                    <h1 className="text-black font-semibold text-4xl">
                      Settings
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[80vw] h-[90vh] flex flex-row justify-start items-start gap-4">
              <div className="w-1/3">
                <form className="w-full flex flex-col items-start mt-8 text-md">
                  <label htmlFor="userCountry" className="">
                    Country Code. Example US: 1
                  </label>
                  <input name="userCountry" placeholder="1" className="mb-2" />
                  <label htmlFor="userPhone" className="">
                    Phone
                  </label>
                  <input
                    name="userPhone"
                    placeholder="xxx-xxx-xxxx"
                    className="mb-2"
                  />
                  <label htmlFor="userEmail" className="">
                    Email
                  </label>
                  <input name="userEmail" placeholder="user@email.com" />
                  <label htmlFor="userPredefinedMessage1" className="mt-4">
                    Message 01
                  </label>
                  <textarea
                    name="userPredefinedMessage1"
                    placeholder="type your message here..."
                    style={{ border: "1px solid black", height: "15vh" }}
                  />
                  <div className="flex flex-row justify-end items-center mt-6">
                    <button className="btn btn-primary rounded-md">
                      Update
                    </button>
                  </div>
                </form>
              </div>
              <div className="w-2/3">
                <form className="w-full flex flex-col items-start mt-8 text-md">
                  <label htmlFor="userCountry" className="">
                    Country Code. Example US: 1
                  </label>
                  <input name="userCountry" placeholder="1" className="mb-2" />
                  <label htmlFor="userPhone" className="">
                    Phone
                  </label>
                  <input
                    name="userPhone"
                    placeholder="xxx-xxx-xxxx"
                    className="mb-2"
                  />
                  <label htmlFor="userEmail" className="">
                    Email
                  </label>
                  <input name="userEmail" placeholder="user@email.com" />
                  <label htmlFor="userPredefinedMessage1" className="mt-4">
                    Message 01
                  </label>
                  <textarea
                    name="userPredefinedMessage1"
                    placeholder="type your message here..."
                    style={{ border: "1px solid black", height: "15vh" }}
                  />
                  <div className="flex flex-row justify-end items-center mt-6">
                    <button className="btn btn-primary rounded-md">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SettingsPage;
