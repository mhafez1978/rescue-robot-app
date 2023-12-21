"use client";

//import React, { useState, useEffect } from "react";
//import { useSession } from "next-auth/react";
//import clsx from "clsx";

// //import { redirect } from "next/navigation";
// //import sequelize from "@/database/sequelize";
// //import User from "@/database/models/User";

// const ProfileUpdateModalForm = ({ userId }: { userId: number }) => {
//   const { data: session } = useSession();
//   //console.log({ data: session });

//   const [newLastName, setNewLastName] = useState("");
//   const [newEmailAddress, setNewEmailAddress] = useState("");
//   const [newPhoneNumber, setNewPhoneNumber] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState("");
//   const [newFullName, setNewFullName] = useState("");

//   const [lockedForm, setLockedform] = useState(true);
//   const [validEmailMessage, setValidEmailMessage] = useState(true);
//   const [phoneErrorMessage, setPhoneErrorMessage] = useState(false);
//   const [userUpdated, setUserUpdated] = useState(false);
//   const [noNewMsg, setNoNewMsg] = useState(false);

//   const [user, setUser] = useState([]);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await fetch(
//         `http://localhost:3000/api/users/find/user/${userId}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       //console.log(data);
//       setUser(data);
//       console.log(user);
//     };
//     fetchUser();
//   }, [user, userId]);

//   useEffect(() => {
//     if (userUpdated === true) {
//       setTimeout(() => {
//         setUserUpdated(!userUpdated);
//       }, 2000);
//     }
//   }, [userUpdated]);

//   useEffect(() => {
//     if (noNewMsg === true) {
//       setTimeout(() => {
//         setNoNewMsg(!noNewMsg);
//       }, 2000);
//     }
//   }, [noNewMsg]);

//   const handleFormUnlock = (e) => {
//     e.preventDefault();
//     setLockedform(!lockedForm);
//     console.log("form unlocked and you can edit");
//   };

//   const handleNewDataChange = (e) => {
//     e.preventDefault();

//     if (session) {
//       if (e.currentTarget.name === "lastname") {
//         setNewLastName(e.currentTarget.value);
//         setNewFullName(session?.user.firstname + " " + newLastName);
//         console.log(newFullName);
//       } else if (e.currentTarget.name === "email") {
//         setNewEmailAddress(e.currentTarget.value);
//         console.log(newEmailAddress);
//       } else if (e.currentTarget.name === "phone") {
//         setNewPhoneNumber(e.target.value);
//         console.log(newPhoneNumber);
//       } else if (e.currentTarget.name === "profile_image") {
//         setNewProfileImage(e.target.value);
//         console.log(newProfileImage);
//       }
//     }
//     if (!session) {
//       return;
//     }
//   };

//   const isValidPhoneNumber = (newPhoneNumber: string) => {
//     // This is a basic pattern and might need to be adjusted based on your specific requirements
//     const pattern = /^\+?\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
//     const results = pattern.test(newPhoneNumber);
//     console.log("Results", results);
//     return results;
//   };

//   function isValidateEmail(newEmailAddress: string) {
//     const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//     return regex.test(newEmailAddress);
//   }

//   const handleFormUpdate = (e) => {
//     e.preventDefault();

//     let userData = {
//       id: userId,
//       lastname: "" as string,
//       email: "" as string,
//       phone: "" as string,
//       image: "" as string,
//     };

//     if (newLastName.length > 3 && newLastName !== user?.lastname) {
//       userData.lastname = newLastName as string;
//       //console.log(userData);
//     }

//     if (newLastName.length > 3 && newLastName === user?.lastname) {
//       userData.lastname = newLastName as string;
//     }

//     if (newLastName.length < 3 && newLastName.length !== 0) {
//       console.log("please enter a valid name ...");
//       return;
//     }

//     if (!isValidateEmail) {
//       console.log("this is not valid email ...");
//       setValidEmailMessage(false);
//       return;
//     }

//     if (newEmailAddress.length > 0) {
//       if (!isValidateEmail(newEmailAddress)) {
//         setValidEmailMessage(false);
//         userData.email = user?.email;
//       }
//       userData.email = newEmailAddress;
//     }

//     if (newProfileImage.length > 0 && newProfileImage !== user?.image) {
//       userData.image = newProfileImage;
//       //console.log(userData);
//     }

//     Object.keys(userData).forEach((key) => {
//       if (userData[key] === session?.user[key] || userData[key] === "") {
//         delete userData[key];
//       }
//     });

//     if (Object.keys(userData).length === 0) {
//       console.log("No changes were made.");
//       // Optionally alert the user or handle this case as needed
//       setNoNewMsg(true);
//       return;
//     }

//     const saveUser = async (e) => {
//       e.preventDefault();
//       const id = userId;

//       try {
//         const response = await fetch(`/api/users/update/user/${id}`, {
//           method: "PUT",
//           body: JSON.stringify({
//             newLastName: newLastName,
//             newEmailAddress: newEmailAddress,
//             newPhoneNumber: newPhoneNumber,
//             newProfileImage: newProfileImage,
//           }),
//         });

//         if (!response.ok) {
//           throw new Error("Failed to update user");
//         }

//         const updatedUser = await response.json();

//         console.log("User updated:", updatedUser);

//         setUserUpdated(true);
//       } catch (error) {
//         console.error("Error updating user:", error);
//         // Handle error (e.g., show error message)
//       }
//     };

//     saveUser(e);
//   };

//   if (session) {
//     return (
//       <>
//         {/* Open the modal using document.getElementById('ID').showModal() method */}
//         <button
//           className="btn btn-primary"
//           onClick={() => document.getElementById("my_modal_2").showModal()}
//         >
//           Edit
//         </button>
//         <dialog id="my_modal_2" className="modal">
//           <div className="modal-box">
//             <h3 className="font-bold text-lg">Edit user info here !</h3>
//             <p className="py-4">Press ESC key or click outside to close</p>
//             <form className="flex flex-col gap-2">
//               {lockedForm === true ? (
//                 <>
//                   <label htmlFor="firstname">First Name:</label>
//                   <input
//                     type="text"
//                     name="firstname"
//                     placeholder={user?.firstname}
//                     disabled
//                   />
//                 </>
//               ) : (
//                 <>
//                   <div className="hidden">
//                     <label htmlFor="firstname">First Name:</label>
//                     <input
//                       id="firstname"
//                       type="text"
//                       name="firstname"
//                       placeholder={user?.firstname}
//                       disabled
//                     />
//                   </div>
//                 </>
//               )}

//               {lockedForm === true ? (
//                 <>
//                   <label htmlFor="lastname">
//                     Last Name:{" "}
//                     <span className="text-sm text-orange-700">
//                       Unlock to modify
//                     </span>
//                   </label>
//                   <input
//                     id="lastname"
//                     type="text"
//                     name="lastname"
//                     placeholder={
//                       user?.lastname === "" ? "Not set ..." : user?.lastname
//                     }
//                     disabled
//                   />
//                 </>
//               ) : (
//                 <>
//                   <label htmlFor="lastname">
//                     Last Name:{" "}
//                     <span className="text-sm text-emerald-600">
//                       Can be modified
//                     </span>
//                   </label>
//                   <input
//                     id="lastname"
//                     type="text"
//                     name="lastname"
//                     placeholder={
//                       user?.fullname === "" ? "Not set ..." : user?.fullname
//                     }
//                     className="unlocked"
//                     //onChange={handleNewDataChange}
//                     //value={newLastName}
//                   />
//                 </>
//               )}

//               {lockedForm === true ? (
//                 <>
//                   <label htmlFor="name">Full Name:</label>
//                   <input
//                     id="name"
//                     type="text"
//                     name="name"
//                     placeholder={user?.firstname + " " + user?.lastname}
//                     disabled
//                   />
//                 </>
//               ) : (
//                 <>
//                   <div className="hidden">
//                     <label htmlFor="name">Full Name:</label>
//                     <input
//                       id="name"
//                       type="text"
//                       name="name"
//                       placeholder={user?.firstname + " " + newLastName}
//                       disabled
//                       value={newFullName}
//                     />
//                   </div>
//                 </>
//               )}

//               {lockedForm === true ? (
//                 <>
//                   {" "}
//                   <label htmlFor="username">Username:</label>
//                   <input
//                     id="username"
//                     type="text"
//                     name="username"
//                     placeholder={user?.username}
//                     disabled
//                   />
//                 </>
//               ) : (
//                 <>
//                   <div className="hidden">
//                     <label htmlFor="username">Username:</label>
//                     <input
//                       id="username"
//                       type="text"
//                       name="username"
//                       placeholder={user?.username}
//                       disabled
//                     />
//                   </div>
//                 </>
//               )}

//               {lockedForm === true ? (
//                 <>
//                   <label htmlFor="email">
//                     Email:{" "}
//                     <span className="text-sm text-orange-700">
//                       Unlock to modify
//                     </span>
//                   </label>
//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     placeholder={
//                       user?.email === "" ? "Email Not set ..." : user?.email
//                     }
//                     disabled
//                   />
//                 </>
//               ) : (
//                 <>
//                   {validEmailMessage && (
//                     <>
//                       <label
//                         htmlFor="email"
//                         className="flex flex-row gap-4 items-center"
//                       >
//                         Email:{" "}
//                         <span className="text-sm text-emerald-600">
//                           Can be modified
//                         </span>
//                       </label>
//                     </>
//                   )}
//                   {!validEmailMessage && (
//                     <>
//                       <label
//                         htmlFor="email"
//                         className="flex flex-row gap-4 items-center"
//                       >
//                         Email:{" "}
//                         <span className="text-sm text-red-600">
//                           This is not a valid email ...
//                         </span>
//                       </label>
//                     </>
//                   )}

//                   <input
//                     id="email"
//                     type="text"
//                     name="email"
//                     placeholder={
//                       user?.email === "" ? "Email Not set ..." : user?.email
//                     }
//                     className="unlocked"
//                     //onChange={handleNewDataChange}
//                     //value={newEmailAddress}
//                   />
//                 </>
//               )}

//               {lockedForm === true ? (
//                 <>
//                   <label htmlFor="phone">
//                     Phone:{" "}
//                     <span className="text-sm text-orange-700">
//                       Unlock to modify
//                     </span>
//                   </label>
//                   <input
//                     id="phone"
//                     type="text"
//                     name="phone"
//                     placeholder={user?.phone}
//                     disabled
//                   />
//                 </>
//               ) : (
//                 <>
//                   {!phoneErrorMessage && (
//                     <>
//                       <label
//                         htmlFor="phone"
//                         className="flex flex-row gap-4 items-center"
//                       >
//                         Phone:{" "}
//                         <span className="text-sm text-emerald-600">
//                           Can be modified
//                         </span>
//                       </label>
//                     </>
//                   )}
//                   {phoneErrorMessage && (
//                     <>
//                       <label
//                         htmlFor="phone"
//                         className="flex flex-row items-center"
//                       >
//                         Phone:{" "}
//                         <span className="text-sm text-red-600">
//                           Invalid Number
//                         </span>
//                       </label>
//                     </>
//                   )}

//                   <input
//                     id="phone"
//                     type="text"
//                     name="phone"
//                     placeholder={user?.phone}
//                     className="unlocked"
//                     //value={newPhoneNumber}
//                     //onChange={handleNewDataChange}
//                   />
//                 </>
//               )}

//               {lockedForm === true ? (
//                 <>
//                   <label htmlFor="profile_image">
//                     Profile Image URL:{" "}
//                     <span className="text-sm text-orange-700">
//                       Unlock to modify
//                     </span>
//                   </label>
//                   <input
//                     id="profile_image"
//                     type="text"
//                     name="profile_image"
//                     placeholder={
//                       user?.image === "" ? "Not set ..." : user?.image
//                     }
//                     disabled
//                   />
//                 </>
//               ) : (
//                 <>
//                   <label htmlFor="profile_image">
//                     Profile Image URL:{" "}
//                     <span className="text-sm text-emerald-600">
//                       Can be modified
//                     </span>
//                   </label>
//                   <input
//                     id="profile_image"
//                     type="text"
//                     name="profile_image"
//                     placeholder={
//                       user?.image === "" ? "Not set ..." : user?.image
//                     }
//                     className="unlocked"
//                     //value={newProfileImage}
//                     //onChange={handleNewDataChange}
//                   />
//                 </>
//               )}
//               <div className="flex flex-row justify-between mt-4 mb-12">
//                 {lockedForm === true ? (
//                   <>
//                     <button
//                       className={`btn btn-grey rounded-md`}
//                       //onClick={handleFormUnlock}
//                     >
//                       Unlock
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       className={`btn btn-secondary rounded-md`}
//                       //onClick={handleFormUnlock}
//                     >
//                       Lock
//                     </button>
//                     {userUpdated ? (
//                       <button className="btn text-center align-middle rounded h-[64px] text-sm">
//                         Updates Applied ..
//                       </button>
//                     ) : (
//                       <span className="text-sm hidden"></span>
//                     )}
//                     {noNewMsg ? (
//                       <button className="btn text-center align-middle rounded h-[64px] text-xs">
//                         No changes were made ..
//                       </button>
//                     ) : (
//                       <span className="text-sm hidden"></span>
//                     )}
//                     <button
//                       className={`btn btn-primary rounded-md`}
//                       //onClick={handleFormUpdate}
//                     >
//                       Save
//                     </button>
//                   </>
//                 )}
//               </div>
//             </form>
//           </div>
//           <form method="dialog" className="modal-backdrop">
//             <button>close</button>
//           </form>
//         </dialog>
//       </>
//     );
//   }
// };

// export default ProfileUpdateModalForm;

//"use client";

// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";

// const ProfileUpdateModalForm = ({ userId }) => {
//   const { data: session } = useSession();
//   const [user, setUser] = useState(null);
//   const [isFormLocked, setIsFormLocked] = useState(true);

//   // State for form fields
//   const [newLastName, setNewLastName] = useState("");
//   const [newEmailAddress, setNewEmailAddress] = useState("");
//   const [newPhoneNumber, setNewPhoneNumber] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`/api/users/find/user/${userId}`);
//         const userData = await response.json();
//         setUser(userData);
//         // Initialize form fields with fetched data
//         setNewLastName(userData.lastname || "");
//         setNewEmailAddress(userData.email || "");
//         setNewPhoneNumber(userData.phone || "");
//         setNewProfileImage(userData.image || "");
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     if (userId) {
//       fetchUser();
//     }
//   }, [userId]);

//   const handleFormUnlock = () => {
//     setIsFormLocked(!isFormLocked);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case "lastname":
//         setNewLastName(value);
//         break;
//       case "email":
//         setNewEmailAddress(value);
//         break;
//       case "phone":
//         setNewPhoneNumber(value);
//         break;
//       case "profile_image":
//         setNewProfileImage(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Submit logic here...
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <button
//         className="btn btn-primary"
//         onClick={() => document.getElementById(`modal_${userId}`).showModal()}
//       >
//         Edit
//       </button>

//       <dialog id={`modal_${userId}`} className="modal">
//         <form onSubmit={handleFormSubmit} className="modal-box">
//           <h3 className="font-bold text-lg">Edit User Info</h3>
//           <input
//             type="text"
//             name="lastname"
//             placeholder={`Last Name: ${user.lastname || "Not set"}`}
//             value={newLastName}
//             onChange={handleInputChange}
//             disabled={isFormLocked}
//           />
//           {/* Repeat for other inputs (email, phone, etc.) */}
//           <div className="modal-actions">
//             <button type="button" onClick={handleFormUnlock}>
//               {isFormLocked ? "Unlock" : "Lock"}
//             </button>
//             <button type="submit" disabled={isFormLocked}>
//               Save Changes
//             </button>
//           </div>
//         </form>
//         <button
//           onClick={() => document.getElementById(`modal_${userId}`).close()}
//         >
//           Close
//         </button>
//       </dialog>
//     </>
//   );
// };

// export default ProfileUpdateModalForm;

// import React, { useState, useEffect } from "react";
// import { useSession } from "next-auth/react";

// const ProfileUpdateModalForm = ({ userId }) => {
//   const { data: session } = useSession();
//   const [user, setUser] = useState(null);
//   const [isFormLocked, setIsFormLocked] = useState(true);

//   // State for form fields
//   const [newLastName, setNewLastName] = useState("");
//   const [newEmailAddress, setNewEmailAddress] = useState("");
//   const [newPhoneNumber, setNewPhoneNumber] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`/api/users/find/user/${userId}`);
//         const userData = await response.json();
//         setUser(userData);
//         // Initialize form fields with fetched data
//         setNewLastName(userData.lastname || "");
//         setNewEmailAddress(userData.email || "");
//         setNewPhoneNumber(userData.phone || "");
//         setNewProfileImage(userData.image || "");
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//       }
//     };

//     if (userId) {
//       fetchUser();
//     }
//   }, [userId]);

//   const handleFormUnlock = () => {
//     setIsFormLocked(!isFormLocked);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case "lastname":
//         setNewLastName(value);
//         break;
//       case "email":
//         setNewEmailAddress(value);
//         break;
//       case "phone":
//         setNewPhoneNumber(value);
//         break;
//       case "profile_image":
//         setNewProfileImage(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Submit logic here...
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <button
//         className="btn btn-primary"
//         onClick={() => document.getElementById(`modal_${userId}`).showModal()}
//       >
//         Edit
//       </button>

//       <dialog id={`modal_${userId}`} className="modal">
//         <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 p-5">
//           <h3 className="font-bold text-lg mb-4">Edit User Info</h3>

//           <label htmlFor="lastname" className="block">
//             firstname:
//           </label>
//           <input
//             className="border p-2 rounded"
//             type="text"
//             name="lastname"
//             placeholder={`Last Name: ${user.firstname || "Not set"}`}
//             value={newLastName}
//             onChange={handleInputChange}
//             disabled={isFormLocked}
//           />

//           {/* Repeat for other inputs (email, phone, etc.) with similar styling */}

//           <div className="flex justify-between mt-4">
//             <button
//               type="button"
//               onClick={handleFormUnlock}
//               className={`btn ${
//                 isFormLocked ? "btn-secondary" : "btn-grey"
//               } rounded-md`}
//             >
//               {isFormLocked ? "Unlock" : "Lock"}
//             </button>
//             <button
//               type="submit"
//               disabled={isFormLocked}
//               className="btn btn-primary rounded-md"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//         <button
//           onClick={() => document.getElementById(`modal_${userId}`).close()}
//           className="btn btn-red rounded-md"
//         >
//           Close
//         </button>
//       </dialog>
//     </>
//   );
// };

// export default ProfileUpdateModalForm;

//import React, { useState, useEffect } from "react";
//import { useSession } from "next-auth/react";

// const ProfileUpdateModalForm = ({ userId }) => {
//   const { data: session } = useSession();
//   const [user, setUser] = useState(null);
//   const [isFormLocked, setIsFormLocked] = useState(true);

//   // State for form fields
//   const [newLastName, setNewLastName] = useState("");
//   const [newEmailAddress, setNewEmailAddress] = useState("");
//   const [newPhoneNumber, setNewPhoneNumber] = useState("");
//   const [newProfileImage, setNewProfileImage] = useState("");

//   useEffect(() => {
//     const fetchUser = async () => {
//       const response = await fetch(`/api/users/find/user/${userId}`);
//       const userData = await response.json();
//       setUser(userData);
//       // Initialize form fields with fetched data
//       setNewLastName(userData.lastname || "");
//       setNewEmailAddress(userData.email || "");
//       setNewPhoneNumber(userData.phone || "");
//       setNewProfileImage(userData.image || "");
//     };

//     fetchUser();
//   }, [userId]);

//   const handleFormUnlock = (e) => {
//     e.preventDefault();
//     setIsFormLocked(!isFormLocked);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     switch (name) {
//       case "lastname":
//         setNewLastName(value);
//         break;
//       case "email":
//         setNewEmailAddress(value);
//         break;
//       case "phone":
//         setNewPhoneNumber(value);
//         break;
//       case "profile_image":
//         setNewProfileImage(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Submit logic here...
//   };

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       <button
//         className="btn btn-primary"
//         onClick={() => document.getElementById(`modal_${userId}`).showModal()}
//       >
//         Edit
//       </button>

//       <dialog id={`modal_${userId}`} className="modal">
//         <div className="modal-box">
//           <h3 className="font-bold text-lg">Edit user info here !</h3>
//           <p className="py-4">Press ESC key or click outside to close</p>
//           <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
//             {/* First Name */}
//             <div className={clsx({ hidden: !isFormLocked })}>
//               <label htmlFor="firstname">First Name:</label>
//               <input
//                 type="text"
//                 name="firstname"
//                 placeholder={user.firstname}
//                 disabled
//               />
//             </div>

//             {/* Last Name */}
//             <label htmlFor="lastname">Last Name:</label>
//             <input
//               id="lastname"
//               type="text"
//               name="lastname"
//               placeholder={user.lastname || "Not set ..."}
//               disabled={isFormLocked}
//               value={newLastName}
//               onChange={handleInputChange}
//               className={clsx("unlocked", { hidden: isFormLocked })}
//             />

//             {/* Email */}
//             {/* Similar structure for Email, Phone, and Profile Image */}

//             <div className="flex flex-row justify-between mt-4 mb-12">
//               <button
//                 className={`btn ${
//                   isFormLocked ? "btn-grey" : "btn-secondary"
//                 } rounded-md`}
//                 onClick={handleFormUnlock}
//               >
//                 {isFormLocked ? "Unlock" : "Lock"}
//               </button>
//               <button
//                 type="submit"
//                 disabled={isFormLocked}
//                 className="btn btn-primary rounded-md"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//         <form method="dialog" className="modal-backdrop">
//           <button>close</button>
//         </form>
//       </dialog>
//     </>
//   );
// };

// export default ProfileUpdateModalForm;

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const ProfileUpdateModalForm = ({ userId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const [isFormLocked, setIsFormLocked] = useState(true);

  const [validEmailMessage, setValidEmailMessage] = useState(true);
  const [phoneErrorMessage, setPhoneErrorMessage] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [noNewMsg, setNoNewMsg] = useState(false);

  // State for form fields
  const [newLastName, setNewLastName] = useState("");
  const [newEmailAddress, setNewEmailAddress] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newProfileImage, setNewProfileImage] = useState("");
  const [newFullName, setNewFullName] = useState("");

  const [lockedForm, setLockedform] = useState(true);
  //const [validEmailMessage, setValidEmailMessage] = useState(true);
  //const [phoneErrorMessage, setPhoneErrorMessage] = useState(false);
  //const [userUpdated, setUserUpdated] = useState(false);
  //const [noNewMsg, setNoNewMsg] = useState(false);

  //const [user, setUser] = useState([]);

  useEffect(() => {
    if (userUpdated === true) {
      setTimeout(() => {
        setUserUpdated(!userUpdated);
      }, 2000);
    }
  }, [userUpdated]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`/api/users/find/user/${userId}`);
      const userData = await response.json();
      setUser(userData);
      // Initialize form fields with fetched data
      setNewLastName(userData.lastname || "");
      setNewEmailAddress(userData.email || "");
      setNewPhoneNumber(userData.phone || "");
      setNewProfileImage(userData.image || "");
    };

    fetchUser();
  }, [userId]);

  const isValidPhoneNumber = (newPhoneNumber: string) => {
    // This is a basic pattern and might need to be adjusted based on your specific requirements
    const pattern = /^\+?\d{1,3}[-\s]?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/;
    const results = pattern.test(newPhoneNumber);
    console.log("Results", results);
    return results;
  };

  function isValidateEmail(newEmailAddress: string) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(newEmailAddress);
  }

  const handleFormUnlock = (e) => {
    e.preventDefault();
    setIsFormLocked(!isFormLocked);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "lastname":
        setNewLastName(value);
        break;
      case "email":
        setNewEmailAddress(value);
        break;
      case "phone":
        setNewPhoneNumber(value);
        break;
      case "profile_image":
        setNewProfileImage(value);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let userData = {
      id: userId,
      lastname: "" as string,
      email: "" as string,
      phone: "" as string,
      image: "" as string,
    };

    if (newLastName.length > 3 && newLastName !== user?.lastname) {
      userData.lastname = newLastName as string;
      //console.log(userData);
    }

    if (newLastName.length > 3 && newLastName === user?.lastname) {
      userData.lastname = newLastName as string;
    }

    if (newLastName.length < 3 && newLastName.length !== 0) {
      console.log("please enter a valid name ...");
      return;
    }

    if (!isValidateEmail) {
      console.log("this is not valid email ...");
      setValidEmailMessage(false);
      return;
    }

    if (newEmailAddress.length > 0) {
      if (!isValidateEmail(newEmailAddress)) {
        setValidEmailMessage(false);
        userData.email = user?.email;
      }
      userData.email = newEmailAddress;
    }

    if (newProfileImage.length > 0 && newProfileImage !== user?.image) {
      userData.image = newProfileImage;
      //console.log(userData);
    }

    Object.keys(userData).forEach((key) => {
      if (userData[key] === session?.user[key] || userData[key] === "") {
        delete userData[key];
      }
    });

    if (Object.keys(userData).length === 0) {
      console.log("No changes were made.");
      // Optionally alert the user or handle this case as needed
      setNoNewMsg(true);
      return;
    }

    const saveUser = async (e) => {
      e.preventDefault();
      const id = userId;

      try {
        const response = await fetch(`/api/users/update/user/${id}`, {
          method: "PUT",
          body: JSON.stringify({
            newLastName: newLastName,
            newEmailAddress: newEmailAddress,
            newPhoneNumber: newPhoneNumber,
            newProfileImage: newProfileImage,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to update user");
        }

        const updatedUser = await response.json();

        console.log("User updated:", updatedUser);

        setUserUpdated(true);
      } catch (error) {
        console.error("Error updating user:", error);
        // Handle error (e.g., show error message)
      }
    };

    saveUser(e);
    router.refresh();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById(`modal_${userId}`).showModal()}
      >
        Edit
      </button>

      <dialog id={`modal_${userId}`} className="modal">
        <div className="modal-box">
          <button
            onClick={() => document.getElementById(`modal_${userId}`).close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Edit user info here !</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
          <form className="flex flex-col gap-2">
            {isFormLocked === true ? (
              <>
                <label htmlFor="firstname">First Name:</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder={user?.firstname}
                  disabled
                />
              </>
            ) : (
              <>
                <div className="hidden">
                  <label htmlFor="firstname">First Name:</label>
                  <input
                    id="firstname"
                    type="text"
                    name="firstname"
                    placeholder={user?.firstname}
                    disabled
                  />
                </div>
              </>
            )}

            {isFormLocked === true ? (
              <>
                <label htmlFor="lastname">
                  Last Name:{" "}
                  <span className="text-sm text-orange-700">
                    Unlock to modify
                  </span>
                </label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder={
                    user?.lastname === "" ? "Not set ..." : user?.lastname
                  }
                  disabled
                />
              </>
            ) : (
              <>
                <label htmlFor="lastname">
                  Last Name:{" "}
                  <span className="text-sm text-emerald-600">
                    Can be modified
                  </span>
                </label>
                <input
                  id="lastname"
                  type="text"
                  name="lastname"
                  placeholder={
                    user?.fullname === "" ? "Not set ..." : user?.fullname
                  }
                  className="unlocked"
                  onChange={handleInputChange}
                  value={newLastName}
                />
              </>
            )}

            {isFormLocked === true ? (
              <>
                <label htmlFor="name">Full Name:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder={user?.firstname + " " + user?.lastname}
                  disabled
                />
              </>
            ) : (
              <>
                <div className="hidden">
                  <label htmlFor="name">Full Name:</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder={user?.firstname + " " + newLastName}
                    disabled
                    value={newFullName}
                  />
                </div>
              </>
            )}

            {isFormLocked === true ? (
              <>
                {" "}
                <label htmlFor="username">Username:</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder={user?.username}
                  disabled
                />
              </>
            ) : (
              <>
                <div className="hidden">
                  <label htmlFor="username">Username:</label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder={user?.username}
                    disabled
                  />
                </div>
              </>
            )}

            {isFormLocked === true ? (
              <>
                <label htmlFor="email">
                  Email:{" "}
                  <span className="text-sm text-orange-700">
                    Unlock to modify
                  </span>
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder={
                    user?.email === "" ? "Email Not set ..." : user?.email
                  }
                  disabled
                />
              </>
            ) : (
              <>
                {validEmailMessage && (
                  <>
                    <label
                      htmlFor="email"
                      className="flex flex-row gap-4 items-center"
                    >
                      Email:{" "}
                      <span className="text-sm text-emerald-600">
                        Can be modified
                      </span>
                    </label>
                  </>
                )}
                {!validEmailMessage && (
                  <>
                    <label
                      htmlFor="email"
                      className="flex flex-row gap-4 items-center"
                    >
                      Email:{" "}
                      <span className="text-sm text-red-600">
                        This is not a valid email ...
                      </span>
                    </label>
                  </>
                )}

                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder={
                    user?.email === "" ? "Email Not set ..." : user?.email
                  }
                  className="unlocked"
                  onChange={handleInputChange}
                  value={newEmailAddress}
                />
              </>
            )}

            {isFormLocked === true ? (
              <>
                <label htmlFor="phone">
                  Phone:{" "}
                  <span className="text-sm text-orange-700">
                    Unlock to modify
                  </span>
                </label>
                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder={user?.phone}
                  disabled
                />
              </>
            ) : (
              <>
                {!phoneErrorMessage && (
                  <>
                    <label
                      htmlFor="phone"
                      className="flex flex-row gap-4 items-center"
                    >
                      Phone:{" "}
                      <span className="text-sm text-emerald-600">
                        Can be modified
                      </span>
                    </label>
                  </>
                )}
                {phoneErrorMessage && (
                  <>
                    <label
                      htmlFor="phone"
                      className="flex flex-row items-center"
                    >
                      Phone:{" "}
                      <span className="text-sm text-red-600">
                        Invalid Number
                      </span>
                    </label>
                  </>
                )}

                <input
                  id="phone"
                  type="text"
                  name="phone"
                  placeholder={user?.phone}
                  className="unlocked"
                  value={newPhoneNumber}
                  onChange={handleInputChange}
                />
              </>
            )}

            {isFormLocked === true ? (
              <>
                <label htmlFor="profile_image">
                  Profile Image URL:{" "}
                  <span className="text-sm text-orange-700">
                    Unlock to modify
                  </span>
                </label>
                <input
                  id="profile_image"
                  type="text"
                  name="profile_image"
                  placeholder={user?.image === "" ? "Not set ..." : user?.image}
                  disabled
                />
              </>
            ) : (
              <>
                <label htmlFor="profile_image">
                  Profile Image URL:{" "}
                  <span className="text-sm text-emerald-600">
                    Can be modified
                  </span>
                </label>
                <input
                  id="profile_image"
                  type="text"
                  name="profile_image"
                  placeholder={user?.image === "" ? "Not set ..." : user?.image}
                  className="unlocked"
                  value={newProfileImage}
                  onChange={handleInputChange}
                />
              </>
            )}
            <div className="flex flex-row justify-between mt-4 mb-12">
              {isFormLocked === true ? (
                <>
                  <button
                    className={`btn btn-grey rounded-md`}
                    onClick={handleFormUnlock}
                  >
                    Unlock
                  </button>
                  <button
                    className={`btn btn-danger rounded-md`}
                    onClick={() => {
                      document.getElementById(`modal_${userId}`).close();
                    }}
                  >
                    Close
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={`btn btn-secondary rounded-md`}
                    onClick={handleFormUnlock}
                  >
                    Lock
                  </button>
                  {userUpdated ? (
                    <button className="w-[100px] text-center align-middle rounded h-[64px] text-sm">
                      Updates Applied ..
                    </button>
                  ) : (
                    <span className="text-sm hidden"></span>
                  )}
                  {noNewMsg ? (
                    <button className="w-[100px] text-center align-middle rounded h-[64px] text-xs">
                      No changes were made ..
                    </button>
                  ) : (
                    <span className="text-sm hidden"></span>
                  )}
                  <button
                    className={`btn btn-primary rounded-md`}
                    onClick={handleFormSubmit}
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ProfileUpdateModalForm;
