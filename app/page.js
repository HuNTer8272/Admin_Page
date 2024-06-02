"use client";
import React, { useEffect, useState } from "react";
import { PiPassword } from "react-icons/pi";
import { MdEmail } from "react-icons/md";
import greenGradient from "../image/greenGradient.jpg";
import Image from "next/image";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, store } from "@/database/Firebase";
import Cookies from "js-cookie";
import { AlertDestructive } from "@/components/ui/ErrorAlert";

export default function Home() {
  const [isError,setIsError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    //   const user = userCredential.user;
    //   const userCred = userCredential.user;

    //   if (userCred) {
    //     const userRef = store.collection('user').doc(userCred.uid);

    //     const userData = {
    //       id: userCred.uid,
    //       email: user.email,
    //       role:'admin'
    //     };

    //     await userRef.set(userData);

    //     console.log('User information stored successfully');
    //   } else {
    //     console.error('User credential not found.');
    //   }
    // } catch (error) {
    //   console.error(`An error occurred: ${error.message}`);
    // }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      const docRef = store.collection("user").doc(user.uid);
      const docSnapshot = await docRef.get();
      if (!docSnapshot.exists) return;
      const data = docSnapshot.data();
      if (data.role === "admin") {
        Cookies.set("loggedin", true);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error(error.message);
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if(isError){
      setTimeout(() => {
        setIsError(false)
      }, 3000)
    }
  },[isError])



  return (
    <>
      <div className="relative flex items-center justify-center h-screen bg-gray-200 dark:bg-zinc-950 ">
        {/* main div */}
        <div className="bg-white dark:bg-zinc-900 w-[45rem] h-[22rem] flex rounded-md shadow-lg overflow-hidden">
          {/* image div */}
          <div className="w-1/2 bg-yellow-200">
            <Image
              className="w-full h-full bg-cover"
              src={greenGradient}
              alt=""
            />
          </div>
          {/* login div */}
          <div className="flex flex-col items-center w-1/2 p-3 ">
            <h1 className="mt-5 text-[1.2rem] font-semibold dark:text-gray-50 mb-10">
              Login
            </h1>
            <div className="">
              <form>
                {/* email */}
                <div className="relative ">
                  <MdEmail className="absolute text-[#a89d9b] -translate-y-1/2 top-1/2 left-3" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    type="email"
                    autoComplete="off"
                    placeholder="Enter email"
                    required
                    className="flex justify-center p-1 pl-10 mb-5 rounded-full outline-none dark:placeholder-gray-50 text-gray-50 dark:bg-zinc-700 text-[0.9rem] focus-within:bg-zinc-600 "
                  />
                </div>
                {/* password */}
                <div className="relative ">
                  <PiPassword className="absolute text-[#a89d9b] -translate-y-1/2 top-1/2 left-3" />
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    type="password"
                    autoComplete="off"
                    placeholder="Enter Password"
                    required
                    className="p-1 pl-10 rounded-full outline-none dark:placeholder-gray-50 text-gray-50 dark:bg-zinc-700 focus-within:bg-zinc-600  text-[0.9rem]"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-[#0afa9b] outline-none   w-32 rounded-full p-1 mx-12 font-semibold mt-8"
                >
                  Submit
                </button>

                {/* <p className=" text-zinc-700 dark:text-gray-50 text-[0.9rem] text-center font-semibold  mt-3">haven't registered yet? <span><a to={'/'}>Sign Up</a></span></p> */}
              </form>
            </div>
          </div>
        </div>
        <AlertDestructive className={`${isError?"block":"hidden"} absolute bottom-0 w-[25rem] left-0`}>
            {errorMessage}
        </AlertDestructive>
      </div>
    </>
  );
}
