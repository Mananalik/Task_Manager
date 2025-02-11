import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import toast from "react-hot-toast";

const UserContext = React.createContext();

// set axios to include credentials with every request
axios.defaults.withCredentials = true;

export const UserContextProvider = ({ children }) => {
  const serverUrl = "http://localhost:8000";

  const router = useRouter();

  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [userState, setUserState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // register user
  const registerUser = async (e) => {
    e.preventDefault();
    if (
      !userState.email.includes("@") ||
      !userState.password ||
      userState.password.length < 6
    ) {
      toast.error("Please enter a valid email and password (min 6 characters)");
      return;
    }

    try {
      const res = await axios.post(`${serverUrl}/api/v1/register`, userState);
      console.log("User registered successfully", res.data);
      toast.success("User registered successfully");

      // clear the form
      setUserState({
        name: "",
        email: "",
        password: "",
      });

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error registering user", error);
      toast.error(error.response.data.message);
    }
  };

  // login the user
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/login`,
        {
          email: userState.email,
          password: userState.password,
        },
        {
          withCredentials: true, // send cookies to the server
        }
      );

      toast.success("User logged in successfully");

      // clear the form
      setUserState({
        email: "",
        password: "",
      });

      // refresh the user details
      await getUser(); // fetch before redirecting

      // push user to the dashboard page
      router.push("/");
    } catch (error) {
      console.log("Error logging in user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user Looged in Status
  const userLoginStatus = async () => {
    let loggedIn = false;
    try {
      const res = await axios.get(`${serverUrl}/api/v1/login-status`, {
        withCredentials: true, // send cookies to the server
      });

      // coerce the string to boolean
      loggedIn = !!res.data;
      setLoading(false);

      if (!loggedIn) {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error getting user login status", error);
    }

    return loggedIn;
  };

  // logout user
   const logoutUser = async()=>{
    try{
        const res = await axios.get(`${serverUrl}/api/v1/logout`,{
             withCredentials: true,// send cookies to the sever
        });
        toast.success("User logged out sucessfully");

        // redirect to login page
        router.push("/login");
    }catch(error){
        console.log("Error logging out user",error);
        toast.error(error.response.data.message);
    }
   };
   // get user details
   const getUser = async()=>{
    setLoading(true);
    try{
        const res = await axios.get(`${serverUrl}/api/v1/user`,{
            withCredentials:true, // send cookies to the user
        });
        setUser((prevState)=>{
            return {
                ...prevState, // Copy old values: name, email, role
                ...res.data, // Overwrite the changed values
            };
        });
        setLoading(false);
    }catch(error){
        console.log("Error getting user details", error);
        setLoading(false);
        toast.error(error.response.data.message);  
    }
   };

   // update the user details
   const updateUser = async(e,data)=>{
    e.preventDefault();
    setLoading(true);
    try{
        const res = await axios.patch(`${serverUrl}/api/v1/user`, data, {
            withCredentials: true, // send cookies to the server
          });
        // update the user state
      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });
    toast.success('User updated successfully');
    setLoading(false);
    }catch(error){
        console.log("Error updating user details", error);
        setLoading(false);
        toast.error(error.response.data.message);
    }
   };
   // email verification

    return (
        <UserContext.Provider value={{
            registerUser,
            userState,
        }}>
            {children}
            </UserContext.Provider>
        
    );
};

export const useUserContext=()=>{
    return useContext(UserContext)
};