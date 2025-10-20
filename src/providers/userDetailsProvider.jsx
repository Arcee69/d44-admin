import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
// import { message } from "antd";
import TokenService from "../services/token";
import { appUrls } from "../services/urls";
import { api } from "../services/api";

const UserContext = createContext({});

function UserDetailsProvider({ children }) {
  const navigate = useNavigate();

  

  const login = async (data, from) => { //actions, , setLoading
    try {
      // setLoading(true)
      const res = await api.post(appUrls?.LOGIN_URL, data);
      // console.log(res, "kolo")
      if (res?.status === 201) {
        const { token, ...newObject } = res?.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userObj", JSON.stringify(newObject));
        // setLoading(false)
        // actions.setSubmitting(false);
        toast("Logged In Successfully", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
      })
        navigate(from, { replace: true });
      }
    } catch (error) {
      // console.log(error, "error")
      toast("Invalid Email or Password", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
    });
    setLoading(false)
      // actions.setSubmitting(false);
      // message.error(error?.data?.description, 10);
    }
  };


  const handleForgetPassword = async (data, actions, next) => {
    try {
      const res = await api.put(appUrls.FORGETPASSWORD_URL, data);
      if (res?.data?.code === "200") {
        message.success("Otp Sent to you Email", 10);
        actions.setSubmitting(false);
        next("OTP");
      }
    } catch (error) {
      actions.setSubmitting(false);
      message.error(error?.data?.description, 10);
    }
  };

  const handleValidateOtp = async (
    data,
    actions,
    next,
    setForgetPasswordUserDetails
  ) => {
    try {
      const res = await api.put(appUrls.VALIDATEOTP_URL, data);
      if (res?.data?.code === "200") {
        setForgetPasswordUserDetails(res?.data?.data);
        message.success("Otp verification complete", 10);
        actions.setSubmitting(false);
        next("CREATE_PASSWORD");
      }
    } catch (error) {
      actions.setSubmitting(false);
      message.error(error?.data?.description, 10);
    }
  };

  const handleChangePassowrd = async (data, actions) => {
    try {
      const res = await api.post(appUrls?.RESET_PASSWORD_URL, data);
      if (res?.data?.code === "200") {
        actions.setSubmitting(false);
        toast("Password Changed Successfully", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
      })
        navigate(from, { replace: true });
      }
    } catch (error) {
      actions.setSubmitting(false);
      message.error(error?.data?.description, 10);
    }
  };

  const logout = async () => {
    await api.post(appUrls.LOGOUT_URL);
    TokenService.removeUser();
    message.success("Logout Successful", 5);
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      login,
      handleForgetPassword,
      handleValidateOtp,
      handleChangePassowrd,
      logout,
    }),
    []
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a User Provider");
  }

  return context;
}

export { useUser, UserDetailsProvider };
