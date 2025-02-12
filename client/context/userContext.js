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
      // const res = await axios.post("http://localhost:8000/api/v1/register", userState);

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
      toast.error(error.response?.data?.message );
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
      toast.error(error.response?.data?.message );
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

  useEffect(()=>{
    const loginStatusGetUser = async()=>{// 1️⃣ Define an async function
      const isLoggedIn = await userLoginStatus();// 2️⃣ Check login status
      if(isLoggedIn){
        await getUser();// 3️⃣ Fetch user details if logged in
      }
        };
        loginStatusGetUser();  // 4️⃣ Call the function inside useEffect
  },[]); // 5️⃣ Empty dependency array means this runs only once (on mount)
 
 
 
  // logout user
  const logoutUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/logout`, {
        withCredentials: true, // send cookies to the server
      });

      toast.success("User logged out successfully");

      // redirect to login page
      router.push("/login");
    } catch (error) {
      console.log("Error logging out user", error);
      toast.error(error.response.data.message);
    }
  };

  // get user details
  const getUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${serverUrl}/api/v1/user`, {
        withCredentials: true, // send cookies to the server
      });

      setUser((prevState) => {
        return {
          ...prevState,
          ...res.data,
        };
      });

      setLoading(false);
    } catch (error) {
      console.log("Error getting user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // update user details
  const updateUser = async (e, data) => {
    e.preventDefault();
    setLoading(true);

    try {
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

      toast.success("User updated successfully");

      setLoading(false);
    } catch (error) {
      console.log("Error updating user details", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  //email verification
  const emailVerification = async()=>{
    setLoading(true);
    try{
        const res = await axios.post(`${serverUrl}/api/v1/verify-email`,{},{
          withCredentials: true,// send cookies to the server
        }
      );
      toast.success("Email verification sent successfully");
      setLoading(false);
    }catch(error){
      console.log("Error sending email verification", error);
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // verify user/email
  const verifyUser = async(token)=>{
    setLoading(true);
    try{
      const res = await axios.post( `${serverUrl}/api/v1/verify-user/${token}`,{},{
        withCredentials: true,
      });
      toast.success("User verified successfully");

      // refresh the user details
      getUser();
      setLoading(false);
      // redirect to the home page
      router.push("/");
    }catch(error){
      console.log("Error verifying user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  // forgot password email
  const forgotPasswordEmail = async(email)=>{
    setLoading(true);
    try{
       const res = await axios.post(`${serverUrl}/api/v1/forgot-password`,{
        email,
       },
      {
        withCredentials:true,
      });
      toast.success("Forgot password email sent successfully");
      setLoading(false);
    }catch(error){
      console.log("Error sending forgot password email", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
  // reset password
  const resetPassword = async(token, password)=>{
    setLoading(true);
    try{
      const res = await axios.post( `${serverUrl}/api/v1/reset-password/${token}`,
        {
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Password reset successfully");
      setLoading(false);
      // redirect to login page
      router.push("/login");
    }catch(error){
      console.log("Error resetting password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // change password
  const changePassword = async (currentPassword, newPassword)=>{
    setLoading(true);
    try{
      const res = await axios.patch(
        `${serverUrl}/api/v1/change-password`,
        { currentPassword, newPassword },
        {
          withCredentials: true, // send cookies to the server
        }
      );
    }catch(error){
      console.log("Error changing password", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // admin routes
  const getAllUsers = async()=>{
    setLoading(true);
    try{
      const res = await axios.get(
        `${serverUrl}/api/v1/admin/users`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );
      setAllUsers(res.data);
      setLoading(false);
    }catch(error){
      console.log("Error getting all users", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };
   // dynamic form handler
   const handleUserInput = (name) => (e) => {
    const value = e.target.value;

    setUserState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // delete user
  const deleteUser = async(id)=>{
    setLoading(true);
    try{
      const res = await axios.delete(
        `${serverUrl}/api/v1/admin/users/${id}`,
        {},
        {
          withCredentials: true, // send cookies to the server
        }
      );
      toast.success("User delted successfully");
      setLoading(false);
      // refresh the user list
      getAllUsers();
    }catch(error){
      console.log("Error deleting user", error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
   };
   useEffect(()=>{
    if(user.role==="admin"){
      getAllUsers();
    }
   },[user.role]);
    return (
        <UserContext.Provider value={{
          registerUser,
          userState,
          handleUserInput,
          loginUser,
          logoutUser,
          userLoginStatus,
          user,
          updateUser,
          emailVerification,
          verifyUser,
          forgotPasswordEmail,
          resetPassword,
          changePassword,
          allUsers,
          deleteUser,
        }}>
            {children}
            </UserContext.Provider>
        
    );
};

export const useUserContext=()=>{
    return useContext(UserContext)
};