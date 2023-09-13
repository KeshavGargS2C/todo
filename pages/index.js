import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './index.module.scss';

export default function Login() {
  const router = useRouter()
  const [isLogin, setIsLogin] = useState(true);
  const [emailInfo, setEmailInfo] = useState("");
  const [passwordInfo, setPasswordInfo] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);

  const onLoginHandler = () => {
    if (emailInfo !== "" && passwordInfo !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const testEmail = emailRegex.test(emailInfo);
      if(!testEmail) {
        toast.error("Incorrect email pattern.");
        return;
      }
      toast.success("Login Successful!");
      router.push(`/projects`);
    }
    else if (emailInfo === "" && passwordInfo === "") {
      toast.error("Please enter email and password.");
    }
    else if (emailInfo === "") {
      toast.error("Please enter email.");
    }
    else if (passwordInfo === "") {
      toast.error("Please enter password.");
    }
  }

  return (
    <div className={styles["wrapper-container"]}>
      <ToastContainer />
      <div className={styles["image-container"]}>
        <Image src="/login-left-panel.svg" alt="login image" width={477} height={420} layout="intrinsic" />
      </div>
      <div className={styles["details-container"]}>
        <div className={styles["login-signup-container"]}>
          <span
            className={styles[`${isLogin ? "login-heading-selected" : "login-heading-unselected"}`]}
            onClick={() => { setIsLogin(true); }}
          >
            Log In
          </span>
          <span
            className={styles[`${isLogin ? "login-heading-unselected" : "login-heading-selected"}`]}
            onClick={() => { setIsLogin(false); }}
          >
            Sign Up
          </span>
        </div>
        <div className={styles["form-container"]}>
          <div>
            {isLogin && (
              <div className={styles["instructions-container"]}>
                <span className={styles["continue-heading"]}>
                  To Continue
                </span>
                <span className={styles["continue-subheading"]}>
                  We need your Name & Email
                </span>
              </div>
            )}
            {!isLogin && (
              <>
                <input
                  type="text"
                  className={styles["input-box"]}
                  placeholder='Full Name'
                />
              </>
            )}
          </div>
          <div>
            <input
              type="email"
              className={styles["input-box"]}
              placeholder='Email'
              value={emailInfo}
              onChange={(event) => { setEmailInfo(event?.target?.value) }}
            />
          </div>
          <div className={styles["password-container"]}>
            <input
              type={visiblePassword ? "text" : "password"}
              className={styles["input-box-password"]}
              placeholder='Password'
              value={passwordInfo}
              onChange={(event) => { setPasswordInfo(event?.target?.value) }}
            />
            <span
              className={styles["image-password"]}
              onClick={() => { setVisiblePassword(prev => !prev) }}
            >
              <Image src="/password.svg" alt="login image" width={25} height={25} layout="intrinsic" />
            </span>
          </div>
          <div>
            <button
              className={styles["login-button"]}
              onClick={() => { onLoginHandler() }}
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
